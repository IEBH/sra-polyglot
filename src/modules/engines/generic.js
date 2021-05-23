import tools from '../tools.js'
import global from '../global.js'
import _ from 'lodash';

// Translation Objects
import fieldCodesObject from "../../data/fieldCodesObject.js"
import meshObject from "../../data/meshObject.js"
import meshTranslationsObject from "../../data/meshTranslationsObject.js"

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
            testing: false
        });

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
                                if (engine === "Ovid MEDLINE" || engine === "Scopus (advanced search)" || engine === "Embase (Elsevier)") {
                                    // Put field code outside brackets
                                    if (branch.field.match(/mesh/i)) {
                                        var translateObject = meshObject[engine] ? meshObject[engine][branch.field] : null;
                                        const termArray = translateObject.terms;
                                        const comment = translateObject.comment;
                                        var content = termArray.map(el => {
                                            if (el && el.toLowerCase() !== "test") {
                                                return settings.highlighting ? `<font color="blue">${el}</font>` : el;
                                            } else if (el && el.toLowerCase() === "test") {
                                                return tools.quotePhrase(branch, engine, settings);
                                            } else { // Empty string
                                                return el;
                                            }
                                        }).join("");
                                        // Fix to move '+' back one space when quoting
                                        if (engine === "CINAHL (Ebsco)") {
                                            content = content.replace(/"\+/, '+"');
                                        }
                                        buffer += (comment && settings.highlighting)
                                            ? tools.createTooltip(content, comment)
                                            : content;
                                    } else {
                                        var translateObject = fieldCodesObject[engine] ? fieldCodesObject[engine][branch.field] : null;
                                        if (translateObject) {
                                            const termArray = translateObject.terms;
                                            const comment = translateObject.comment;
                                            const content = termArray.map(el => {
                                                if (el && el.toLowerCase() !== "test") {
                                                    return settings.highlighting ? `<font color="LightSeaGreen">${el}</font>` : el;
                                                } else if (el && el.toLowerCase() === "test") {
                                                    return engine === "Scopus (advanced search)"
                                                        ? compileWalker(branch.nodes)
                                                        : '(' + compileWalker(branch.nodes) + ')';
                                                } else { // Empty string
                                                    return el;
                                                }
                                            }).join("");
                                            buffer += (comment && settings.highlighting)
                                                ? tools.createTooltip(content, comment)
                                                : content;
                                        }
                                    }
                                } else {
                                    // Expand field code inside brackets for other engines
                                    // If the group has a filter decorate all its children with that field
                                    // This mutates the tree for the other engine compile functions
                                    const isMesh = branch.field.match(/mesh/i);
                                    branch.nodes = tools.visit(branch.nodes, ['phrase'], b => {
                                        if (isMesh) {
                                            b.type = 'mesh';
                                        }
                                        b.field = branch.field
                                    });
                                    branch.nodes = tools.visit(branch.nodes, ['group'], b => b.field = branch.field);
                                    buffer += '(' + compileWalker(branch.nodes) + ')';					

                                }
                            } else {
                                buffer += '(' + compileWalker(branch.nodes) + ')';
                            }					
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
                                                buffer += tools.printNumber(engine, branch.ref[node]);
                                            } else {
                                                buffer += ' ' + branch.cond + ' ' + tools.printNumber(engine, branch.ref[node]);
                                            }
                                        }
                                    } else {
                                        buffer += tools.printNumber(engine, branch.ref);
                                    }
                                }
                                break;
                        case 'phrase':
                            if (branch.field) {
                                var translateObject = fieldCodesObject[engine] ? fieldCodesObject[engine][branch.field] : null;
                                if (translateObject) {
                                    const termArray = translateObject.terms;
                                    const comment = translateObject.comment;
                                    const content = termArray.map(el => {
                                        if (el && el.toLowerCase() !== "test") {
                                            return settings.highlighting ? `<font color="LightSeaGreen">${el}</font>` : el;
                                        } else if (el && el.toLowerCase() === "test") {
                                            return tools.quotePhrase(branch, engine, settings);
                                        } else { // Empty string
                                            return el;
                                        }
                                    }).join("");
                                    buffer += (comment && settings.highlighting)
                                        ? tools.createTooltip(content, comment)
                                        : content;
                                } else {
                                    buffer += tools.createTooltip(
                                        '<font color="#ff6161">' + tools.quotePhrase(branch, engine, { ...settings, highlighting: false }) + '</font>',
                                        "No field tag found for engine"
                                    )
                                }
                            } else {
                                // If no field tag exists create popover with ability to replace field tag
                                if (global.variables.no_field_tag.indexOf(branch.offset + branch.content.length) === -1) {
                                    global.variables.no_field_tag.push(branch.offset + branch.content.length);
                                }
                                if (settings.highlighting) {
                                    buffer += tools.createPopover(tools.quotePhrase(branch, engine, settings), branch.offset + branch.content.length);
                                } else {
                                    buffer += tools.quotePhrase(branch, engine, settings);
                                }
                            }
                            break;
                        case 'mesh':
                            var translateObject = meshObject[engine] ? meshObject[engine][branch.field] : null;
                            if (translateObject) {
                                const termArray = translateObject.terms;
                                const comment = translateObject.comment;
                                var content = termArray.map(el => {
                                    if (el && el.toLowerCase() !== "test") {
                                        return settings.highlighting ? `<font color="blue">${el}</font>` : el;
                                    } else if (el && el.toLowerCase() === "test") {
                                        return tools.quotePhrase(branch, engine, settings);
                                    } else { // Empty string
                                        return el;
                                    }
                                }).join("");
                                // Fix to move '+' back one space when quoting
                                if (engine === "CINAHL (Ebsco)") {
                                    content = content.replace(/"\+/, '+"');
                                }
                                buffer += (comment && settings.highlighting)
                                    ? tools.createTooltip(content, comment)
                                    : content;
                            } else {
                                buffer += tools.createTooltip(
                                    '<font color="#ff6161">' + tools.quotePhrase(branch, engine, { ...settings, highlighting: false }) + '</font>',
                                    "No mesh tag found for engine"
                                )
                            }
                            break;
                        case 'meshTranslation':
                            var translateObject = meshTranslationsObject[engine] ? meshTranslationsObject[engine][branch.field] : null;
                            if (translateObject) {
                                const termArray = translateObject.terms;
                                const comment = translateObject.comment;
                                const content = termArray.map(el => {
                                    if (el && el.toLowerCase() !== "test") {
                                        return settings.highlighting ? `<font color="purple">${el}</font>` : el;
                                    } else { // Empty string
                                        return el;
                                    }
                                }).join("");
                                buffer += (comment && settings.highlighting)
                                    ? tools.createTooltip(content, comment)
                                    : content;
                            } else {
                                buffer += tools.createTooltip(
                                    '<font color="#ff6161">' + tools.quotePhrase(branch, engine, { ...settings, highlighting: false }) + '</font>',
                                    "No mesh tag found for engine"
                                )
                            }
                            break;
                        case 'joinNear':
                            switch(engine) {
                                case 'PubMed full':
                                case 'PubMed abbreviation':
                                    buffer += 'AND';
                                    break;
                                case 'Ovid MEDLINE':
                                case 'PsycInfo (Ovid)':
                                    buffer += `ADJ${branch.proximity}`;
                                    break;
                                case 'Cochrane Library':
                                case 'Embase (Elsevier)':
                                case 'Web of Science':
                                case 'WoS Advanced':
                                case 'ProQuest Health and Medical':
                                    buffer += `NEAR/${branch.proximity}`;
                                    break;
                                case 'CINAHL (Ebsco)':
                                    buffer += `N${branch.proximity}`;
                                    break;
                                case 'Scopus (basic search)':
                                case 'Scopus (advanced search)':
                                    buffer += `W/${branch.proximity}`;
                                    break;
                                case 'SPORTDiscus':
                                    buffer += `N/${branch.proximity}`;
                                    break;
                            }
                            break;
                        case 'joinNext':
                            switch(engine) {
                                case 'PubMed full':
                                case 'PubMed abbreviation':
                                    buffer += 'AND';
                                    break;
                                case 'Ovid MEDLINE':
                                case 'PsycInfo (Ovid)':
                                    buffer += 'ADJ';
                                    break;
                                case 'Cochrane Library':
                                    buffer += 'NEXT';
                                    break;
                                case 'Embase (Elsevier)':
                                    buffer += 'NEXT/1';
                                    break;
                                case 'Web of Science':
                                case 'WoS Advanced':
                                    buffer += 'NEAR/0';
                                    break;
                                case 'CINAHL (Ebsco)':
                                    buffer += 'W1';
                                    break;
                                case 'Scopus (basic search)':
                                case 'Scopus (advanced search)':
                                case 'SPORTDiscus':
                                    buffer += 'W/1';
                                    break;
                                case 'ProQuest Health and Medical':
                                    buffer += 'PRE/0'
                            }
                            break;
                        case 'joinAnd':
                            buffer += 'AND';
                            break;
                        case 'joinOr':
                            buffer += 'OR';
                            break;
                        case 'joinNot':
                            buffer += 'NOT';
                            break;
                        case 'raw':
                            buffer += branch.content;
                            break;
                        case 'template':
                            buffer += tools.resolveTemplate(branch.content, engine);
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