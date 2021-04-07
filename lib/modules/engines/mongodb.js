"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = _interopRequireDefault(require("../tools.js"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  id: 'mongodb',
  title: 'MongoDB Query Format',
  aliases: ['mongo'],
  debugging: true,
  // Mark this module for debugging only

  /**
  * Compile a tree structure to a MongoDB query
  * @param {array} tree The parsed tree to process
  * @param {Object} [options] Optional options to use when compiling
  * @return {Object} The compiled MongoDB query output
  */
  compile: function compile(tree, options) {
    var settings = _lodash.default.defaults(options, {
      replaceWildcards: true,
      translatePhraseField: function translatePhraseField(t) {
        return {
          'title': t
        };
      },
      meshField: 'mesh',
      translateTitleAbstract: function translateTitleAbstract(t) {
        return {
          $or: [{
            title: t
          }, {
            abstract: t
          }]
        };
      }
    }); // Apply wildcard replacements


    if (settings.replaceWildcards) _tools.default.replaceContent(tree, ['phrase'], [{
      subject: /[\?\$]/g,
      value: '*'
    }]);

    var compileWalker = function compileWalker(tree) {
      return (0, _lodash.default)(tree).map(function (branch, branchIndex) {
        var buffer = {};

        switch (branch.type) {
          case 'line':
            buffer += compileWalker(branch.nodes);
            break;

          case 'group':
            if (branch.field && branch.field == 'title+abstract') {
              // FIXME: Not yet properly supported
              buffer['TITLE+ABSTRACT'] = compileWalker(branch.nodes);
            } else if (branch.field) {
              buffer[branch.field] = compileWalker(branch.nodes);
            } else {
              buffer = settings.translatePhraseField(compileWalker(branch.nodes));
            }

            break;

          case 'ref':
            if (settings.transposeLines) {
              var node;

              for (node in branch.nodes) {
                if (node == 0) {
                  buffer += '(' + compileWalker(branch.nodes[node]) + ')';
                } else {
                  buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
                }
              }
            } else {
              buffer += branch.ref;
            }

            break;

          case 'phrase':
            if (branch.field && branch.field == 'title+abstract') {
              buffer = settings.translateTitleAbstract(branch.content);
            } else if (branch.field) {
              buffer[branch.field] = branch.content;
            } else {
              buffer = settings.translatePhraseField(branch.content);
            }

            break;

          case 'joinNear':
          case 'joinNext':
          case 'joinAnd':
            buffer = {
              $and: []
            };
            break;

          case 'joinOr':
            buffer = {
              $or: []
            };
            break;

          case 'joinNot':
            buffer = {
              $not: {}
            };
            break;

          case 'mesh':
            // FIXME: No ability to recurse
            buffer[settings.meshField] = {
              $in: [branch.content]
            };
            break;

          case 'meshMajor':
            // FIXME: No ability to recurse or meshMajor
            buffer[settings.meshField] = {
              $in: [branch.content]
            };
            break;

          case 'raw':
            // Do nothing
            break;

          case 'template':
            buffer = _tools.default.resolveTemplate(branch.content, 'mongodb');
            break;

          case 'comment':
            // Do nothing
            break;

          default:
            throw new Error('Unsupported object tree type: ' + branch.type);
        }

        return buffer;
      }) // Renest + combine $or/$and conditions {{{
      // NOTE: Highly experimental - causes bugs under some circumstances
      // .thru(tree => tools.renestConditions(tree))
      // .thru(tree => tools.combineConditions(tree))
      // }}}
      // Remove array structure if there is only one child (i.e. `[{foo: 'foo!'}]` => `{foo: 'foo!'}`) {{{
      .thru(function (tree) {
        if (_lodash.default.isArray(tree) && tree.length == 1) tree = tree[0];
        return tree;
      }) // }}}
      .value();
    };

    return compileWalker(tree);
  }
};
exports.default = _default;