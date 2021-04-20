import tools from '../tools.js'
import global from '../global.js'
import _ from 'lodash';
import engineObject from "../../data/engineObject.js"

export default {
    id: 'generic',
    title: 'generic',
    aliases: ['generic', 'g'],

    /**
    * Compile a tree structure to PubMed output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
    compile: (tree, options, engine) => {
        var settings = _.defaults(options, {
            replaceWildcards: true,
        });

        // Apply wildcard replacements
        // if (settings.replaceWildcards) tools.replaceContent(tree, ['phrase'], [
        //     {subject: /\?/g, value: '?'},
        //     {subject: /\$/g, value: '*'},
        //     {subject: /#/g, value: tools.createTooltip("*", "No Single Wildcard for Pubmed", "highlight")},
        // ]);

        var compileWalker = tree =>
            tree
                .map((branch, branchIndex) => {
                    var buffer = '';
                    switch (branch.type) {
                        case 'line':
                            buffer += compileWalker(branch.nodes);
                            break;
                        case 'group':
                            if (branch.field) {
                                // If the group has a filter decorate all its children with that field
                                // This mutates the tree for the other engine compile functions
                                branch.nodes = tools.visit(branch.nodes, ['phrase'], b => b.field = branch.field);
                                branch.nodes = tools.visit(branch.nodes, ['group'], b => b.field = branch.field);
                            } 
                            buffer += '(' + compileWalker(branch.nodes) + ')';					
                            break;
                            case 'ref':
                                if (settings.transposeLines) {
                                    // Expand each line to show full query
                                    var node;
                                    
                                    for (node in branch.nodes) {
                                        if (node == 0) {
                                            // First line is printed as is wrapped in brackets
                                            buffer += '(' + compileWalker(branch.nodes[node]) + ')';
                                        } else {
                                            // Remaining lines are appended with the condition
                                            buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
                                        }	
                                    }
                                } else {
                                    // Only print each line number in format defined by engine 
                                    // If branch.ref is array then user specified OR/1-4
                                    if(Array.isArray(branch.ref)) {
                                        for (node in branch.ref) {
                                            if (node == 0) {
                                                buffer += "#" + branch.ref[node]
                                            } else {
                                                buffer += ' ' + branch.cond + ' #' + branch.ref[node]
                                            }
                                        }
                                    } else {
                                        buffer += "#" + branch.ref
                                    }
                                }
                                break;
                        case 'phrase':
                            if (branch.field) {
                                let termArray = engineObject[engine][branch.field];
                                if (termArray) {
                                    buffer += termArray.map(el => {
                                        if (el && el.toLowerCase() !== "term") {
                                            return settings.highlighting ? `<font color="LightSeaGreen">${el}</font>` : el;
                                        } else if (el && el.toLowerCase() === "term") {
                                            return tools.quotePhrase(branch, 'pubmed', settings.highlighting);
                                        } else {
                                            return el;
                                        }
                                    }).join("");
                                } else {
                                    buffer += tools.quotePhrase(branch, 'pubmed', settings.highlighting);
                                }
                            } else {
                                // If no field tag exists create popover with ability to replace field tag
                                if (global.variables.no_field_tag.indexOf(branch.offset + branch.content.length) === -1) {
                                    global.variables.no_field_tag.push(branch.offset + branch.content.length);
                                }
                                if (settings.highlighting) {
                                    buffer += tools.createPopover(tools.quotePhrase(branch, 'pubmed', settings.highlighting), branch.offset + branch.content.length);
                                } else {
                                    buffer += tools.quotePhrase(branch, 'pubmed', settings.highlighting);
                                }
                            }
                            break;
                        case 'joinNear':
                        case 'joinNext':
                        case 'joinAnd':
                            buffer += 'AND';
                            break;
                        case 'joinOr':
                            buffer += 'OR';
                            break;
                        case 'joinNot':
                            buffer += 'NOT';
                            break;
                        case 'mesh':
                            if (settings.highlighting) {
                                buffer += tools.createTooltip('<font color="blue">' + tools.quotePhrase(branch, 'pubmed') + '[Mesh' + (branch.recurse ? '' : ':NoExp') + ']</font>', 
                                                                        "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually")
                            } else {
                                buffer += tools.quotePhrase(branch, 'pubmed') + '[Mesh' + (branch.recurse ? '' : ':NoExp') + ']';
                            }
                            break;
                        case 'meshMajor':
                            if (settings.highlighting) {
                                buffer += tools.createTooltip('<font color="blue">' + tools.quotePhrase(branch, 'pubmed') + '[Majr' + (branch.recurse ? '' : ':NoExp') + ']</font>', 
                                                                        "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually")
                            } else {
                                buffer += tools.quotePhrase(branch, 'pubmed') + '[Majr' + (branch.recurse ? '' : ':NoExp') + ']';
                            }
                            break;
                        case 'raw':
                            buffer += branch.content;
                            break;
                        case 'template':
                            buffer += tools.resolveTemplate(branch.content, 'pubmed');
                            break;
                        case 'comment':
                            // Do nothing
                            break;
                        default:
                            throw new Error('Unsupported object tree type: ' + branch.type);
                    }

                    return buffer
                        // Add spacing provided... its not a raw buffer or the last entity within the structure
                        + (
                            branch.type == 'raw' || // Its not a raw node
                            branch.type == 'line' || // Its not a line node
                            branchIndex == tree.length-1 || // Its not the last item in the sequence
                            (branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
                            ? '' : ' '
                        );
                })
                .join('');
        return compileWalker(tree);
    },
    open: query => ({
        method: 'GET',
        action: 'https://www.ncbi.nlm.nih.gov/pubmed',
        fields: {
            term: query,
        },
    }),
    openTerms: 'any search box',
}