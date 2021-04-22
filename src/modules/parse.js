import global from './global.js';
import tools from './tools.js';
import _ from 'lodash';

// Parsing Objects
import fieldCodesParse from "../data/fieldCodesParse.js"
import meshTranslationsParse from "../data/meshTranslationsParse.js"

// Escape all regular expression chars except for pipe
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
* Parse a given string into a lexical object tree
* This tree can then be recompiled via each engines compile()
* @param {string} query The query string to compile. This can be multiline
* @param {Object} [options] Optional options to use when parsing
* @param {boolean} [options.groupLines=false] Wrap lines inside their own groups (only applies if multiple lines are present)
* @param {boolean} [options.groupLinesAlways=true] Group lines even if there is only one apparent line (i.e. enclose single line queries within brackets)
* @param {boolean} [options.transposeLines=true] Insert all line references where needed (e.g. `1 - 3/OR`)
* @param {boolean} [options.removeNumbering=true] Remove any number prefixes from lines - this is a classic copy/paste error from certain online search engines (e.g. `1. Term` -> `term`)
* @param {boolean} [options.preserveNewlines=true] Preserve newlines in the output as 'raw' tree nodes
* @return {array} Array representing the parsed tree nodes
*/
export const parse = (query, options) => {
    var settings = _.defaults(options, {
        groupLines: false,
        groupLinesAlways: false,
        removeNumbering: false,
        preserveNewlines: true,
        transposeLines: true,
    });

    global.variables.no_field_tag = []; // Empty array of offsets each time the query is parsed

    var q = query + ''; // Clone query
    var tree = {nodes: []}; // Tree is the full parsed tree
    var branchStack = [tree]; // Stack for where we are within the tree (will get pushed when a new group is encountered)
    var branch = tree; // Branch is the parent of leaf (branch always equals last element of branchStack)
    var lastGroup; // Optional reference to the previously created group (used to pin things)
    var leaf = branch.nodes; // Leaf is the currently active leaf node (usually branch.nodes)
    var afterWhitespace = true; // Set to true when the current character is following whitespace, a newline or the very start of the query
    var lineRefs = {}; // Object lookup for line references (usually something like `1. Foo`), only populated if `transposeLines` is true

    // Operate in line-by-line mode? {{{
    if (settings.transposeLines || settings.groupLines || settings.removeNumbering) {
        var lines = q.split('\n');

        // Remove numbering {{{
        if (settings.removeNumbering) {
            var match;
            lines = lines.map(line => {
                if (match = /^\s*\d+\.?\s(.*)$/.exec(line)) {
                    return match[1];
                } else {
                    return line;
                }
            });
        }
        // }}}

        // Group line content {{{
        if (settings.groupLines && (settings.groupLinesAlways || lines.length > 1)) {
            // Wrap lines provided they are not blank and are not just 'and', 'or', 'not' by themselves or a comment
            lines = lines.map(line => _.trim(line) && !/^\s*(and|or|not)\s*$/i.test(line) && !/^\s*#/.test(line) ? '(' + line + ')' : line);
        }
        // }}}

        q = lines.join('\n'); // Join up lines again
    }
    // }}}

    // Utility functions {{{
    /**
    * Trim previous leaf content if it has any text
    * The leaf will be removed completely if it is now blank
    */
    function trimLastLeaf() {
        if (leaf && _.includes(['phrase', 'raw'], leaf.type) && / $/.test(leaf.content)) {
            leaf.content = leaf.content.substr(0, leaf.content.length - 1);
            if (!leaf.content) branch.nodes.pop();
        }
    };
    /**
    * End the previous line branch and create a new one
    * this function is run every time a new raw node is inserted
    */
    function newLine(currentNumber) {
        lastGroup = branch;
        branch = branchStack.pop();
        leaf = branch.nodes;
        var newGroup = {type: 'line', number: currentNumber, isNumbered: false, nodes: []};
        branch.nodes.push(newGroup);
        branchStack.push(branch);
        branch = newGroup;
        leaf = branch.nodes;
    };
    // }}}

    // Create a group for the first line
    var newGroup = {type: 'line', number: 1, isNumbered: false, nodes: []};
    branch.nodes.push(newGroup);
    branchStack.push(branch);
    branch = newGroup;
    leaf = branch.nodes;
    var lineNumber = 1;

    // Variable to store whether there is user entered line numbering
    var userLineNumber = false;
    // Variable to store byte offset of string at current point
    var offset = 0;

    // Create string of field codes seperated by pipe operator
    var fieldCodes = escapeRegExp(Object.keys(fieldCodesParse).join("|"));
    var meshTranslations = escapeRegExp(Object.keys(meshTranslationsParse).join("|"));

    while (q.length) {
        var cropString = true; // Whether to remove one charcater from the beginning of the string (set to false if the lexical match handles this behaviour itself)
        var match;

        if (/^\(/.test(q)) {
            var newGroup = {type: 'group', nodes: []};
            branch.nodes.push(newGroup);
            branchStack.push(branch);
            branch = newGroup;
            leaf = branch.nodes;
        } else if (/^\)/.test(q)) {
            lastGroup = branch;
            if(branchStack.length > 0) {
                branch = branchStack.pop();
            } else {
                // TODO: Code for popover message
                // branch.msg = "Extra closing bracket removed after term"
            }
            leaf = branch.nodes;
        } else if (match = /^([0-9]+)\s*[‐\-]\s*([0-9]+)(?:\/(AND|OR|NOT))/i.exec(q)) { // 1-7/OR
            branch.nodes.push({
                type: 'ref', 
                ref: _.range(match[1], (match[2]+1)/10), 
                cond: match[3].toUpperCase(),
                nodes: []
            });
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (match = /^(AND|OR|NOT)(?:\/([0-9]+)\s*[‐\-]\s*([0-9]+))/i.exec(q)) { // OR/1-7
            branch.nodes.push({
                type: 'ref', 
                ref: _.range(match[2], (match[3]+1)/10), 
                cond: match[1].toUpperCase(),
                nodes: []
            });
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (match = /^([0-9]+) +(AND|OR|NOT)\s+/i.exec(q)) { // 1 AND ...
            branch.nodes.push({
                type: 'ref', 
                ref: [match[1]],
                cond: '',
                nodes: []
            }); 
            offset += match[1].length;
            q = q.substr(match[1].length); // NOTE we only move by the digits, not the whole expression - so we can still handle the AND/OR correctly
            cropString = false;
        } else if (match = /^((AND|OR|NOT) +([0-9]+))($(?![\r\n])|\s+)/i.exec(q)) { // AND 2...
            trimLastLeaf();
            switch(match[2].toLowerCase()) {
                case "and":
                    branch.nodes.push({type: 'joinAnd'});
                    break;
                case "or":
                    branch.nodes.push({type: 'joinOr'});
                    break;
                case "not":
                    branch.nodes.push({type: 'joinNot'});
                    break;
            }
            leaf = undefined;
            cropString = false;

            branch.nodes.push({
                type: 'ref', 
                ref: [match[3]],
                cond: '',
                nodes: []
            }); 
            offset += match[1].length; 
            q = q.substr(match[1].length); 
        } else if (match = /^([0-9]+\.?)\s+/i.exec(q)) { // 1 or 1. (Line number)
            lineNumber = parseInt(match[1], 10)
            branch.number = lineNumber
            branch.isNumbered = true
            userLineNumber = true
            offset += match[0].length-1;
            q = q.substr(match[0].length-1);
        } 
        else if (afterWhitespace && (match = /^and\b/i.exec(q))) {
            trimLastLeaf();
            branch.nodes.push({type: 'joinAnd'});
            leaf = undefined;
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (afterWhitespace && (match = /^or\b/i.exec(q))) {
            trimLastLeaf();
            branch.nodes.push({type: 'joinOr'});
            leaf = undefined;
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (afterWhitespace && (match = /^not\b/i.exec(q))) {
            trimLastLeaf();
            branch.nodes.push({type: 'joinNot'});
            leaf = undefined;
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (afterWhitespace && (match = /^(near\/|near|adj|n)(\d+)\b/i.exec(q))) {
            trimLastLeaf();
            if (match[2]) branch.nodes.push({type: 'joinNear', proximity: _.toNumber(match[2])});
            else branch.nodes.push({type: 'joinNear', proximity: 1});
            leaf = undefined;
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (afterWhitespace && (match = /^(next\/|next|adj|w|w\/|pre\/|p\/)(\d+)?\b/i.exec(q))) {
            trimLastLeaf();
            if (match[2]) branch.nodes.push({type: 'joinNext', proximity: _.toNumber(match[2])});
            else branch.nodes.push({type: 'joinNext', proximity: 1});
            leaf = undefined;
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } 
        // MESHTRANSLATIONS {{{
        else if (afterWhitespace && (match = new RegExp(`^(${meshTranslations})`, "i").exec(q))) {
            branch.nodes.push({
                type: 'meshTranslation',
                field: meshTranslationsParse[match[1].toLowerCase()]
            });
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        }
        /// }}}
        // MESH {{{
        else if (match = /^\[(mesh terms|mesh|mh)(:NoExp|:no exp)?\]/i.exec(q)) { // Mesh term - PubMed syntax
            leaf.type = 'mesh';
            leaf.field = match[2] ? 'Mesh search (Not exploded)' : 'Mesh search (exploded)';
            if (/^["“”].*["“”]$/.test(leaf.content)) leaf.content = leaf.content.substr(1, leaf.content.length - 2); // Remove wrapping '"' characters
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (match = /^\[(majr|mesh major topic)(:NoExp|:no exp)?\]/i.exec(q)) { // Major Mesh term - PubMed syntax
            leaf.type = 'mesh';
            leaf.field = match[2] ? 'MeSH Major Topic search (Not exploded)' : 'MeSH Major Topic search (exploded)';
            if (/^["“”].*["“”]$/.test(leaf.content)) leaf.content = leaf.content.substr(1, leaf.content.length - 2); // Remove wrapping '"' characters
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (match = /^\[(mesh subheading|sh)\]/i.exec(q)) { // Mesh subheading search - PubMed syntax
            leaf.type = 'mesh';
            leaf.field = 'MeSH subheading search';
            if (/^["“”].*["“”]$/.test(leaf.content)) leaf.content = leaf.content.substr(1, leaf.content.length - 2); // Remove wrapping '"' characters
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (match = /^\.(fs)\./i.exec(q)) { // Mesh subheading search - Ovid syntax
            leaf.type = 'mesh';
            leaf.field = 'MeSH subheading search';
            if (/^["“”].*["“”]$/.test(leaf.content)) leaf.content = leaf.content.substr(1, leaf.content.length - 2); // Remove wrapping '"' characters
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if ((match = /^(exp "([^*]*?)"\/)\s*/i.exec(q)) || (match = /^(exp ([^*]*?)\/)\s*/i.exec(q))) { // Mesh term - Ovid syntax (exploded)
            branch.nodes.push({
                type: 'mesh',
                field: 'Mesh search (exploded)',
                content: match[2]
            });
            offset += match[1].length;
            q = q.substr(match[1].length);
            cropString = false;
            afterWhitespace = true;
        } else if ((match = /^(exp \*"([^*]*?)"\/)\s*/i.exec(q)) || (match = /^(exp \*([^*]*?)\/)\s*/i.exec(q))) { // Major Mesh term - Ovid syntax
            branch.nodes.push({
                type: 'mesh',
                field: 'MeSH Major Topic search (exploded)',
                content: match[2]
            });
            offset += match[1].length;
            q = q.substr(match[1].length);
            cropString = false;
            afterWhitespace = true;
        } else if (/^\//.test(q) && leaf && leaf.type && leaf.type == 'phrase') { // Mesh term - Ovid syntax (non-exploded)
            leaf.type = 'mesh'
            // Major Mesh
            if(leaf.content[0] == "*") {
                leaf.content = leaf.content.substr(1)
                leaf.field = 'MeSH Major Topic search (Not exploded)'
            }
            else leaf.field = 'Mesh search (Not exploded)';
        } 
        // }}}
        else if (match = /^<(.*?)>/.exec(q)) {
            branch.nodes.push({type: 'template', content: match[1].toLowerCase()});
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } else if (match = /^(\n)+/.exec(q)) {
            if (settings.preserveNewlines) {
                var number_newline = match[0].length
                branch.nodes.push({type: 'raw', content: '\n'.repeat(number_newline)});
                leaf = undefined;
            }
            lineNumber += match[0].length;
            if (branchStack.length > 0 && branchStack[branchStack.length-1].nodes.every(node => node.type !== "group")) { // If we are currently inside a group don't add a newline group
                newLine(lineNumber);
            }
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
            afterWhitespace = true;
        } else if (match = /^(\r)+/.exec(q)) {
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
            afterWhitespace = true;
        }
        // Match field codes {{{
        else if (match = new RegExp(`^(${fieldCodes})`, "i").exec(q)) { // Field specifier - PubMed syntax
            // Figure out the leaf to use (usually the last one) or the previously used group
            var useLeaf;
            if (_.isObject(leaf) && leaf.type == 'phrase') {
                useLeaf = leaf;
            } else if (_.isArray(leaf) && lastGroup) {
                useLeaf = lastGroup;
            }

            useLeaf.field = fieldCodesParse[match[1].toLowerCase()]

            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        } 
        // }}}
        /// Comment {{{
        else if (match = /^#([^\)\n]+)/.exec(q)) {
            trimLastLeaf();
            branch.nodes.push({type: 'comment', content: match[1]});
            leaf = undefined;
            offset += match[0].length;
            q = q.substr(match[0].length);
            cropString = false;
        }
        // }}}
        else {
            var nextChar = q.substr(0, 1);
            if ((_.isUndefined(leaf) || _.isArray(leaf)) && nextChar != ' ') { // Leaf pointing to array entity - probably not created fallback leaf to append to
                if (/^["“”]$/.test(nextChar) && (match = /^["“”](.*?)["“”]/.exec(q))) { // First character is a speachmark - slurp until we see the next one
                    leaf = {type: 'phrase', content: match[1], offset: offset};
                    branch.nodes.push(leaf);
                    offset += match[0].length;
                    q = q.substr(match[0].length);
                    cropString = false;
                } else if (match = /^[^\s:/[.)]+/.exec(q)) { // Slurp the phrase until the space or any character which indicates the end of a phrase
                    leaf = {type: 'phrase', content: match[0], offset: offset};
                    branch.nodes.push(leaf);
                    offset += match[0].length;
                    q = q.substr(match[0].length);
                    cropString = false;
                } else { // All other first chars - just dump into a buffer and let it fill slowly
                    leaf = {type: 'phrase', content: nextChar, offset: offset};
                    branch.nodes.push(leaf);
                }
            } else if (_.isObject(leaf) && leaf.type == 'phrase') {
                leaf.content += nextChar;
            }

            afterWhitespace = nextChar == ' '; // Is the nextChar whitespace? Then set the flag
        }

        if (cropString) {
            offset += 1; // Increment offset by 1
            q = q.substr(1); // Crop 1 character
        }
    }

    if (settings.transposeLines) {
        tools.visit(tree.nodes, ['ref'], (node, path) => {
            var reference;
            var line;
            // Find the matching line
            for (reference in node.ref) {
                var found = false;
                for (line in tree.nodes) {
                    // If custom numbering is used only use nodes that are numbered by the user
                    if (userLineNumber) {
                        if (tree.nodes[line].number == node.ref[reference] && tree.nodes[line].isNumbered) {
                            // Copy the nodes from that line into the reference nodes
                            node.nodes.push(Array.from(tree.nodes[line].nodes));
                            // Pop the raw node
                            node.nodes[reference].pop();
                            found = true;
                        }
                    } else {
                        if (tree.nodes[line].number == node.ref[reference]) {
                            // Copy the nodes from that line into the reference nodes
                            node.nodes.push(Array.from(tree.nodes[line].nodes));
                            // Pop the raw node
                            node.nodes[reference].pop();
                            found = true;
                        }
                    }	
                }
                // Line not found, push error message
                if (!found) {
                    node.nodes.push(
                    [{
                        type: "phrase", 
                        content: tools.createTooltip(
                            "Line " + node.ref[reference] + " not found", 
                            "Polyglot could not find specified line in the search query", 
                            "red-underline"
                        )
                    }]);
                }
            }
        });
    }

    return tree.nodes;
}