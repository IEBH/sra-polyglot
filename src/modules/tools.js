import global from './global.js'
import _ from 'lodash';

/**
* Collection of utility functions to apply common behaviour to a compiled tree
* @var {Object}
*/
const tools = {
    /**
    * Visit the given node types within a deeply nested tree and run a function
    * This function may mutate the input tree depending on the actions of the callbacks
    * NOTE: If the return value of the callback is `"DEL"` the node is deleted
    * @param {array} tree The tree sturcture to operate on
    * @param {null|array} types Node filter to apply to (if falsy all are used)
    * @param {function} callback The callback to call with each node. Called as (node, path)
    * @return {array} The input tree
    */
   visit: (tree, types, callback) => {
        var removals = []; // Stack of removal paths we are performing when done

        var treeWalker = (tree, path) => {
            tree.forEach((branch, branchKey) => {
                var nodePath = path.concat(branchKey);

                // Fire callback if it matches
                if (!types || _.includes(types, branch.type)) {
                    var result = callback(branch, nodePath);
                    if (result === 'DEL') removals.push(nodePath);
                }

                // Walk down nodes if its a group
                if (branch.type == 'group' || branch.type == 'line') treeWalker(branch.nodes, nodePath.concat(['nodes']));
            });
        };

        treeWalker(tree, []);

        // Crop all items marked as removals
        removals
            .reverse() // Walk in reverse order so we don't screw up arrays
            .forEach(path => {
                var nodeName = path.pop();
                var parent = path.length ? _.get(tree, path) : tree;
                delete parent[nodeName];
            });

        return tree;
    },

    /**
    * Apply a series of text replacements to every matching node object within a tree
    * This function mutates tree
    * @param {array} tree The tree sturcture to operate on
    * @param {null|array} types Type filter to apply. If falsy all are used
    * @param {array} replacements Array of replacements to apply. Each must be of the form `{subject: STRING|REGEXP, value: STRING|FUNCTION}`
    * @return {array} The input tree element with the replacements applied
    */
    replaceContent: function(tree, types, replacements) {
        this.visit(tree, types, branch => {
            if (!branch.content) return;
            replacements.forEach(replacement => {
                branch.content = branch.content.replace(replacement.subject, replacement.value);
            });
        });
        return tree;
    },

    // Escape all regular expression chars except for pipe
    escapeRegExp: (string) => {
        return string.replace(/[.*+?^${}()[\]\\]/g, '\\$&'); // $& means the whole matched string
    },

    // Replace multiple terms at once
    multiReplace: (text, replaceObj) => {
        var template = tools.escapeRegExp(Object.keys(replaceObj).join("|"));
        if (template.length > 0) {
            var regex = new RegExp(template, "g");
            return text.replace(regex, match => replaceObj[match]);
        } else {
            return text;
        }
    },


    /**
    * Retrieve the contents of a template by its ID
    * NOTE: If the specific engine definition is not found 'default' is used (and it will be pre-parsed via .translate())
    * @param {string} template The template to resolve
    * @param {string} engine The current engine (used to get the correct sub-templating string)
    * @return {string} The resolved template
    */
    resolveTemplate: (template, engine) => {
        if (!global.templates[template]) return 'UNKNOWN-TEMPLATE:' + template;
        if (global.templates[template].engines[engine]) return global.templates[template].engines[engine];
        if (global.templates[template].engines.default) return polyglot.translate(global.templates[template].engines.default, engine);
        if (!global.templates[template].engines[engine]) return `Template: ${template} not found for engine: ${engine}`;
        return '';
    },
    
    /**
     * Structure the wild cards correctly for cochrane to ensure no wildcards appear inside quotation marks
     * @param {string} text The text to parse
     * @param {Boolean} highlighting Whether to assign custom fonts
     * @return {string} The parsed string seperated by NEAR/2
     */
    wildCardCochrane: (text, highlighting) => {
        const wildcards = ["?", "$", "*"]
        let words = text.split(" ");
        let lastMatch = -1;
        let foundMatch = false;
        for (let i = 0; i < words.length; i++) {
            if (wildcards.some(wildcard => words[i].includes(wildcard))) {
                foundMatch = true;
                // Add quotation marks to previous word/s if the previous word was not a match
                if (i - 1 > lastMatch) {
                    words[lastMatch + 1] = highlighting 
                        ? '<font color="DarkBlue">"' + words[lastMatch + 1]
                        : '"' + words[lastMatch + 1];
                    words[i - 1] = highlighting
                        ? words[i - 1] + '"</font>'
                        : words[i - 1] + '"';
                }
                lastMatch = i;
                // Check that there is a word before and it is not a wildcard word
                if (i > 0 && !wildcards.some(wildcard => words[i - 1].includes(wildcard))) {                    
                    words[i] = highlighting
                        ? '<font color="purple">NEAR/2</font> ' + words[i]
                        : 'NEAR/2 ' + words[i];
                }
                // Check that there is a word after
                if (i < words.length -1) {
                    words[i] = highlighting
                        ? words[i] + ' <font color="purple">NEAR/2</font>'
                        : words[i] + " NEAR/2";
                }
            }
        }
        // Add quotation marks to word/s after the final match
        if (lastMatch + 1 < words.length) {
            words[lastMatch + 1] = highlighting
                ? '<font color="DarkBlue">"' + words[lastMatch + 1]
                : '"' + words[lastMatch + 1];
            words[words.length - 1] = highlighting
                ? words[words.length -1] + '"</font>'
                : words[words.length -1] + '"';
        }
        return (foundMatch ? `(${words.join(" ")})` : words.join(" "));
    },

    /**
     * Print number in format defined by engine
     * @param {string} engine Engine to use
     * @param {string} ref Branch ref (e.g. 1)
     * @return {string} Formatted number
     */
    printNumber(engine, ref) {
        // Get line number format for engine
        var number = ref;
        switch(engine) {
            case 'PubMed full':
            case 'PubMed abbreviation':
            case 'Cochrane Library':
            case 'Embase (Elsevier)':
            case 'Web of Science':
            case 'WoS Advanced':
            case 'Scopus (basic search)':
            case 'Scopus (advanced search)':
                number = "#" + ref;
                break;
            case 'Ovid MEDLINE':
            case 'PsycInfo (Ovid)':
            case 'ProQuest Health and Medical':
                number = ref;
                break;
            case 'CINAHL (Ebsco)':
            case 'SPORTDiscus':
                number = "S" + ref;
                break;
            default:
        }
        return number;
    },

    /**
    * Determine if a phrase needs to be enclosed within speachmarks and return the result
    * @param {Object} branch Phrase branch to examine
    * @param {string} engine Optional engine ID to examine for other enclose methods
    * @param {boolean} highlighting Optional bool to determine if html color styling is added
    * @return {string} The phrase enclosed as needed
    */
    quotePhrase: (branch, engine, settings) => {
        var text = _.trimEnd(branch.content);
        var space = /\s/.test(text)

        // Apply wildcard replacements
        if (settings.replaceWildcards) {
            var replaceObj = {};
            switch (engine) {
                case 'PubMed full':
                case 'PubMed abbreviation':
                    replaceObj = {
                        '$': settings.highlighting
                            ? tools.createTooltip("*", "As PubMed does not support single character truncation a wildcard is used here", "highlight")
                            : '*',
                        '?': settings.highlighting
                            ? tools.createTooltip("*", "As PubMed does not 0 or 1 character truncation a wildcard is used here", "highlight")
                            : '*'
                    }
                    break;
                case 'Ovid MEDLINE':
                    break; // Nothing needed
                case 'Cochrane Library':
                    if (space) {
                        text = tools.wildCardCochrane(text, settings.highlighting);
                    }
                    replaceObj = {
                        '$': settings.highlighting
                            ? tools.createTooltip("?", "As Cochrane does not support single character truncation, the 0 or 1 character truncation is used here.", "highlight")
                            : '?'
                    }
                    return tools.multiReplace(text, replaceObj); // Return here to prevent duplicate quotes
                case 'Embase (Elsevier)':
                case 'Web of Science':
                case 'WoS Advanced':
                    replaceObj = {
                        '$': '?',
                        '?': '$' 
                    }
                    break;
                case 'CINAHL (Ebsco)':
                    replaceObj = {
                        '$': '?',
                        '?': '#'
                    }
                    break;
                case 'Scopus (basic search)':
                case 'Scopus (advanced search)':
                    // space = true; //Always include quotes with scopus to make phrase a "loose phrase"
                    replaceObj = {
                        '$': '?',
                        '?': settings.highlighting 
                            ? tools.createTooltip("*", "0 or 1 character truncation is not available. The multiple character wildcard symbol has been substituted.", "highlight")
                            : '*'
                    }
                    break;
                case 'PsycInfo (Ovid)':
                    replaceObj = {
                        '$': '#'
                    }
                    break;
                case 'ProQuest Health and Medical':
                    replaceObj = {
                        '$': '?'
                    }
                    break;
                case 'SPORTDiscus':
                    replaceObj = {
                        '$': '#?',
                        '?': '#'
                    }
                    break;
                case 'Informit Health Collection':
                    replaceObj = {
                        '$': '?',
                        '?': '*1'
                    }
                    break;
            }
            text = tools.multiReplace(text, replaceObj);
        }

        return (
            space
                ? settings.highlighting
                    ? '<font color="DarkBlue">"' + text  + '"</font>'
                    : '"' + text + '"'
                : text
        );
    },


    /**
    * Convert the '$or' / '$and' nodes within a tree into a nested structure
    * This function will also flatten identical branches (i.e. run-on multiple $and / $or into one array)
    * @param {Object} tree The object tree to recombine
    * @returns {Object} The recombined tree
    */
    renestConditions: tree => {
        if (!_.isArray(tree)) return tree; // Not an array - skip

        // Transform arrays of the form: [X1, $or/$and, X2] => {$or/$and: [X1, X2]}
        return tree.reduce((res, branch, index, arr) => {
            var firstKey = _(branch).keys().first();
            if (firstKey == '$or' || firstKey == '$and') { // Is a combinator
                var expression = {};
                expression[firstKey] = [
                    res.pop(), // Right side is the last thing we added to the buffer
                    arr.splice(index+1, 1)[0], // Left side is the next thing we're going to look at in the array
                ];
                res.push(expression);
            } else { // Unknown - just push to array and carry on processing
                res.push(branch);
            }

            return res;
        }, []);
    },


    /**
    * Combine multiple run-on $and / $or conditional branches into one branch
    * This function is a companion function to renestConditions and should be called directly afterwards if needed
    * @param {Object} tree The tree to traverse
    * @param {Object} [options] Additional options to accept
    * @param {number} [options.depth=10] The maximum depth to traverse before giving up, set to 0 to infinitely recurse
    * @return {Object} The collapsed tree
    * @example
    * {left, joinAnd, right} => {joinAnd: [left, right]}
    * @example
    * {foo, joinOr, bar, joinOr, baz} => {joinOr: [foo, bar, baz]}
    */
    combineConditions: (tree, options) => {
        var settings = _.defaults(options, {
            depth: 10,
        });

        var collapses = [];
        var traverseTree = (branch, path = []) => { // Recurse into each tree node and make a bottom-up list of nodes we need to collapse
            _.forEach(branch, (v, k) => { // Use _.map if its an array and _.mapValues if we're examining an object
                if (_.isObject(v)) {
                    var firstKey = _(branch).keys().first();
                    if (path.length > 1 && (firstKey == '$or' || firstKey == '$and')) { // Mark for cleanup later (when we can do a bottom-up traversal)
                        var lastKey = _.findLast(collapses, i => i.key == '$and' || i.key == '$or'); // Collapse only identical keys
                        if (!lastKey || lastKey.key == firstKey) {
                            collapses.push({key: firstKey, path: path});
                        }
                    }
                    if (settings.depth && path.length > settings.depth) return; // Stop recursing after depth has been reached
                    traverseTree(v, path.concat([k]));
                }
            });
        };
        traverseTree(tree);

        collapses.forEach(collapse => {
            var parent = _.get(tree, collapse.path.slice(0, -1));
            var child = _.get(tree, collapse.path.concat([collapse.key]));
            if (!child || !parent || !parent.length) return;
            var child2 = parent[1];

            if (child2) child.push(child2);

            // Wrap $or conditions (that have an '$and' parent) in an object {{{
            var lastParent = _(collapse.path).slice(0, -1).findLast(_.isString);
            if (lastParent && lastParent == '$and' && collapse.key == '$or') child = {$or: child};
            // }}}

            _.set(tree, collapse.path.slice(0, -1), child);
        });

        return tree;
    },

    /**
    * Create a tooltip with a specified message
    * @param {string} content Content to append tooltip to
    * @param {string} message Message to contain inside tooltip
    * @param {string} css CSS class to use
    */
    createTooltip(content, message, css) {
        css = typeof css !== 'undefined' ? css : "black-underline";
        return `<span class="`+ css + '" v-tooltip="`' + message + '`">'
                + content 
                + '</span>'
    },

    /**
    * Create a popover with options to replace empty field tags with specified field tag
    * @param {string} content Content to append popover to
    */
    createPopover(content, offset) {
        return '<v-popover offset="8" placement="right">'
                + '<span class="blue-underline">' + content + '</span>'
                + '<template slot="popover">'
                + '<h3 class="popover-header">Add Field Tag</h3>'
                + '<input class="tooltip-content" v-model="customField" placeholder="Field tag" />'
                + '<div class="replace-all">'
                + '<input type="checkbox" id="checkbox" v-model="replaceAll">'
                + '<label for="checkbox">Replace All</label>'
                + '</div>'
                + '<div class="replace-buttons">'
                + '<button v-on:click="replaceFields(customField, replaceAll, ' + offset + ')" type="button" class="btn btn-primary">Replace</button>'
                + '<button v-close-popover type="button" class="btn btn-dark">Close</button>'
                + '</div>'
                + '</template>'
                + '</v-popover>';
    },
}

export default tools;