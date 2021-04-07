"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _global = _interopRequireDefault(require("./global.js"));

var _tools = _interopRequireDefault(require("./tools.js"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Collection of utility functions to apply common behaviour to a compiled tree
* @var {Object}
*/
var _default = {
  /**
  * Visit the given node types within a deeply nested tree and run a function
  * This function may mutate the input tree depending on the actions of the callbacks
  * NOTE: If the return value of the callback is `"DEL"` the node is deleted
  * @param {array} tree The tree sturcture to operate on
  * @param {null|array} types Node filter to apply to (if falsy all are used)
  * @param {function} callback The callback to call with each node. Called as (node, path)
  * @return {array} The input tree
  */
  visit: function visit(tree, types, callback) {
    var removals = []; // Stack of removal paths we are performing when done

    var treeWalker = function treeWalker(tree, path) {
      tree.forEach(function (branch, branchKey) {
        var nodePath = path.concat(branchKey); // Fire callback if it matches

        if (!types || _lodash.default.includes(types, branch.type)) {
          var result = callback(branch, nodePath);
          if (result === 'DEL') removals.push(nodePath);
        } // Walk down nodes if its a group


        if (branch.type == 'group' || branch.type == 'line') treeWalker(branch.nodes, nodePath.concat(['nodes']));
      });
    };

    treeWalker(tree, []); // Crop all items marked as removals

    removals.reverse() // Walk in reverse order so we don't screw up arrays
    .forEach(function (path) {
      var nodeName = path.pop();
      var parent = path.length ? _lodash.default.get(tree, path) : tree;
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
  replaceContent: function replaceContent(tree, types, replacements) {
    this.visit(tree, types, function (branch) {
      if (!branch.content) return;
      replacements.forEach(function (replacement) {
        branch.content = branch.content.replace(replacement.subject, replacement.value);
      });
    });
    return tree;
  },
  multiReplace: function multiReplace(text, replacements) {
    replacements.forEach(function (replacement) {
      text = text.replace(replacement.subject, replacement.value);
    });
    return text;
  },

  /**
  * Retrieve the contents of a template by its ID
  * NOTE: If the specific engine definition is not found 'default' is used (and it will be pre-parsed via .translate())
  * @param {string} template The template to resolve
  * @param {string} engine The current engine (used to get the correct sub-templating string)
  * @return {string} The resolved template
  */
  resolveTemplate: function resolveTemplate(template, engine) {
    if (!_global.default.templates[template]) return 'UNKNOWN-TEMPLATE:' + template;
    if (_global.default.templates[template].engines[engine]) return _global.default.templates[template].engines[engine];
    if (_global.default.templates[template].engines.default) return polyglot.translate(_global.default.templates[template].engines.default, engine);
    return '';
  },

  /**
   * Structure the wild cards correctly for cochrane to ensure no wildcards appear inside quotation marks
   * @param {string} text The text to parse
   * @param {Boolean} highlighting Whether to assign custom fonts
   * @return {string} The parsed string seperated by NEAR/2
   */
  wildCardCochrane: function wildCardCochrane(text, highlighting) {
    var wildcards = ["?", "$", "*"];
    var words = text.split(" ");
    var lastMatch = -1;
    var foundMatch = false;

    var _loop = function _loop(i) {
      if (wildcards.some(function (wildcard) {
        return words[i].includes(wildcard);
      })) {
        foundMatch = true; // Add quotation marks to previous word/s if the previous word was not a match

        if (i - 1 > lastMatch) {
          words[lastMatch + 1] = highlighting ? '<font color="DarkBlue">"' + words[lastMatch + 1] : '"' + words[lastMatch + 1];
          words[i - 1] = highlighting ? words[i - 1] + '"</font>' : words[i - 1] + '"';
        }

        lastMatch = i; // Check that there is a word before and it is not a wildcard word

        if (i > 0 && !wildcards.some(function (wildcard) {
          return words[i - 1].includes(wildcard);
        })) {
          words[i] = highlighting ? '<font color="purple">NEAR/2</font> ' + words[i] : 'NEAR/2 ' + words[i];
        } // Check that there is a word after


        if (i < words.length - 1) {
          words[i] = highlighting ? words[i] + ' <font color="purple">NEAR/2</font>' : words[i] + " NEAR/2";
        }
      }
    };

    for (var i = 0; i < words.length; i++) {
      _loop(i);
    } // Add quotation marks to word/s after the final match


    if (lastMatch + 1 < words.length) {
      words[lastMatch + 1] = highlighting ? '<font color="DarkBlue">"' + words[lastMatch + 1] : '"' + words[lastMatch + 1];
      words[words.length - 1] = highlighting ? words[words.length - 1] + '"</font>' : words[words.length - 1] + '"';
    }

    console.log(words);
    return foundMatch ? "(".concat(words.join(" "), ")") : words.join(" ");
  },

  /**
  * Determine if a phrase needs to be enclosed within speachmarks and return the result
  * @param {Object} branch Phrase branch to examine
  * @param {string} engine Optional engine ID to examine for other enclose methods
  * @param {boolean} highlighting Optional bool to determine if html color styling is added
  * @return {string} The phrase enclosed as needed
  */
  quotePhrase: function quotePhrase(branch, engine) {
    var highlighting = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var text = _lodash.default.trimEnd(branch.content);

    var space = /\s/.test(text); // if(settings.replaceWildcards)

    switch (engine) {
      case "cinahl":
        text = _tools.default.multiReplace(text, [{
          subject: /#/g,
          value: _tools.default.createTooltip("*", "No Single Wildcard for Cinahl", "highlight")
        }, {
          subject: /\?/g,
          value: '#'
        }, {
          subject: /\$/g,
          value: '*'
        }]);
        break;

      case "cochrane":
        if (space) {
          text = _tools.default.wildCardCochrane(text, highlighting);
        }

        text = _tools.default.multiReplace(text, [{
          subject: /\$/g,
          value: _tools.default.createTooltip("?", "No Single Character Wildcard for Cochrane", "highlight")
        }]); // Return text to prevent duplicate quotation marks

        return text;

      case "embase":
        text = _tools.default.multiReplace(text, [{
          subject: /\?/g,
          value: _tools.default.createTooltip("?", "No Optional Wildcard for Embase", "highlight")
        }, {
          subject: /\$/g,
          value: _tools.default.createTooltip("*", "No Optional Wildcard for Embase", "highlight")
        }, {
          subject: /#/g,
          value: _tools.default.createTooltip("*", "No Single Wildcard for Embase", "highlight")
        }]);
        break;

      case "mongodb":
        text = _tools.default.multiReplace(text, []);
        break;

      case "ovid":
        text = _tools.default.multiReplace(text, []);
        break;

      case "psycinfo":
        text = _tools.default.multiReplace(text, [{
          subject: /\?/g,
          value: '?'
        }, {
          subject: /\$/g,
          value: '*'
        }]);
        break;

      case "pubmed":
        text = _tools.default.multiReplace(text, [{
          subject: /\?/g,
          value: '?'
        }, {
          subject: /\$/g,
          value: '*'
        }, {
          subject: /#/g,
          value: _tools.default.createTooltip("*", "No Single Wildcard for Pubmed", "highlight")
        }]);
        break;

      case "scopus":
        text = _tools.default.multiReplace(text, [{
          subject: /\?/g,
          value: _tools.default.createTooltip("?", "No Optional Wildcard for Scopus", "highlight")
        }, {
          subject: /\$/g,
          value: _tools.default.createTooltip("*", "No Optional Wildcard for Scopus", "highlight")
        }, {
          subject: /#/g,
          value: _tools.default.createTooltip("?", "Single Wildcard for Scopus is ?", "highlight")
        }]);
        space = true; //Always include quotes with scopus to make phrase a "loose phrase"

        break;

      case "wos":
        text = _tools.default.multiReplace(text, [{
          subject: /\?/g,
          value: '$'
        }, {
          subject: /\$/g,
          value: '*'
        }, {
          subject: /#/g,
          value: _tools.default.createTooltip("*", "No Single Wildcard for WoS", "highlight")
        }]);
        break;
    }

    return space ? highlighting ? '<font color="DarkBlue">"' + text + '"</font>' : '"' + text + '"' : text;
  },

  /**
  * Convert the '$or' / '$and' nodes within a tree into a nested structure
  * This function will also flatten identical branches (i.e. run-on multiple $and / $or into one array)
  * @param {Object} tree The object tree to recombine
  * @returns {Object} The recombined tree
  */
  renestConditions: function renestConditions(tree) {
    if (!_lodash.default.isArray(tree)) return tree; // Not an array - skip
    // Transform arrays of the form: [X1, $or/$and, X2] => {$or/$and: [X1, X2]}

    return tree.reduce(function (res, branch, index, arr) {
      var firstKey = (0, _lodash.default)(branch).keys().first();

      if (firstKey == '$or' || firstKey == '$and') {
        // Is a combinator
        var expression = {};
        expression[firstKey] = [res.pop(), // Right side is the last thing we added to the buffer
        arr.splice(index + 1, 1)[0]];
        res.push(expression);
      } else {
        // Unknown - just push to array and carry on processing
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
  combineConditions: function combineConditions(tree, options) {
    var settings = _lodash.default.defaults(options, {
      depth: 10
    });

    var collapses = [];

    var traverseTree = function traverseTree(branch) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      // Recurse into each tree node and make a bottom-up list of nodes we need to collapse
      _lodash.default.forEach(branch, function (v, k) {
        // Use _.map if its an array and _.mapValues if we're examining an object
        if (_lodash.default.isObject(v)) {
          var firstKey = (0, _lodash.default)(branch).keys().first();

          if (path.length > 1 && (firstKey == '$or' || firstKey == '$and')) {
            // Mark for cleanup later (when we can do a bottom-up traversal)
            var lastKey = _lodash.default.findLast(collapses, function (i) {
              return i.key == '$and' || i.key == '$or';
            }); // Collapse only identical keys


            if (!lastKey || lastKey.key == firstKey) {
              collapses.push({
                key: firstKey,
                path: path
              });
            }
          }

          if (settings.depth && path.length > settings.depth) return; // Stop recursing after depth has been reached

          traverseTree(v, path.concat([k]));
        }
      });
    };

    traverseTree(tree);
    collapses.forEach(function (collapse) {
      var parent = _lodash.default.get(tree, collapse.path.slice(0, -1));

      var child = _lodash.default.get(tree, collapse.path.concat([collapse.key]));

      if (!child || !parent || !parent.length) return;
      var child2 = parent[1];
      if (child2) child.push(child2); // Wrap $or conditions (that have an '$and' parent) in an object {{{

      var lastParent = (0, _lodash.default)(collapse.path).slice(0, -1).findLast(_lodash.default.isString);
      if (lastParent && lastParent == '$and' && collapse.key == '$or') child = {
        $or: child
      }; // }}}

      _lodash.default.set(tree, collapse.path.slice(0, -1), child);
    });
    return tree;
  },

  /**
  * Create a tooltip with a specified message
  * @param {string} content Content to append tooltip to
  * @param {string} message Message to contain inside tooltip
  * @param {string} css CSS class to use
  */
  createTooltip: function createTooltip(content, message, css) {
    css = typeof css !== 'undefined' ? css : "black-underline";
    return "<span class=\"" + css + "\" v-tooltip=\"'" + message + "'\">" + content + '</span>';
  },

  /**
  * Create a popover with options to replace empty field tags with specified field tag
  * @param {string} content Content to append popover to
  */
  createPopover: function createPopover(content, offset) {
    return '<v-popover offset="8" placement="right">' + '<span class="blue-underline">' + content + '</span>' + '<template slot="popover">' + '<h3 class="popover-header">Add Field Tag</h3>' + '<input class="tooltip-content" v-model="customField" placeholder="Field tag" />' + '<div class="replace-all">' + '<input type="checkbox" id="checkbox" v-model="replaceAll">' + '<label for="checkbox">Replace All</label>' + '</div>' + '<div class="replace-buttons">' + '<button v-on:click="replaceFields(customField, replaceAll, ' + offset + ')" type="button" class="btn btn-primary">Replace</button>' + '<button v-close-popover type="button" class="btn btn-dark">Close</button>' + '</div>' + '</template>' + '</v-popover>';
  }
};
exports.default = _default;