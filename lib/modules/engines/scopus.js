"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = _interopRequireDefault(require("../tools.js"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  id: 'scopus',
  title: 'Scopus',
  aliases: ['s', 'so'],

  /**
  * Compile a tree structure to Scopus output
  * @param {array} tree The parsed tree to process
  * @param {Object} [options] Optional options to use when compiling
  * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
  * @return {string} The compiled output
  */
  compile: function compile(tree, options) {
    var settings = _lodash.default.defaults(options, {
      replaceWildcards: true
    });

    var compileWalker = function compileWalker(tree) {
      return tree.map(function (branch, branchIndex) {
        var buffer = '';

        switch (branch.type) {
          case 'line':
            buffer += compileWalker(branch.nodes);
            break;

          case 'group':
            if (branch.field) {
              // If the group has a filter decorate all its children with that field
              // This mutates the tree for the other engine compile functions
              branch.nodes = _tools.default.visit(branch.nodes, ['phrase'], function (b) {
                return b.field = branch.field;
              });
              branch.nodes = _tools.default.visit(branch.nodes, ['group'], function (b) {
                return b.field = branch.field;
              });
            }

            buffer += '(' + compileWalker(branch.nodes) + ')';
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
              // Only print each line number in format defined by engine 
              // If branch.ref is array then user specified OR/1-4
              if (Array.isArray(branch.ref)) {
                for (node in branch.ref) {
                  if (node == 0) {
                    buffer += "#" + branch.ref[node];
                  } else {
                    buffer += ' ' + branch.cond + ' #' + branch.ref[node];
                  }
                }
              } else {
                buffer += "#" + branch.ref;
              }
            }

            break;

          case 'phrase':
            if (branch.field) {
              buffer += branch.field == 'title' ? 'TITLE(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'abstract' ? 'ABS(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'title+abstract' ? 'TITLE-ABS(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'title+abstract+tw' ? 'TITLE-ABS(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'title+abstract+other' ? 'TITLE-ABS-KEY(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'title+abstract+keyword' ? 'TITLE-ABS-KEY(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'floatingSubheading' ? 'INDEXTERMS(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'publicationType' ? 'DOCTYPE(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'substance' ? 'CHEM(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'keyword' ? 'AUTHKEY(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : branch.field == 'language' ? 'LANGUAGE(' + _tools.default.quotePhrase(branch, 'scopus', settings.highlighting) + ')' : _tools.default.quotePhrase(branch, 'scopus', settings.highlighting);
            } else {
              if (settings.highlighting) {
                buffer += _tools.default.createPopover(_tools.default.quotePhrase(branch, 'scopus', settings.highlighting), branch.offset + branch.content.length);
              } else {
                buffer += _tools.default.quotePhrase(branch, 'scopus', settings.highlighting);
              }
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

          case 'joinNear':
            buffer += 'W/' + branch.proximity;
            break;

          case 'joinNext':
            buffer += 'W/' + branch.proximity;
            break;

          case 'mesh':
            if (settings.highlighting) {
              buffer += _tools.default.createTooltip('<font color="blue">' + 'INDEXTERMS("' + branch.content + '")</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
            } else {
              buffer += 'INDEXTERMS("' + branch.content + '")';
            }

            break;

          case 'meshMajor':
            if (settings.highlighting) {
              buffer += _tools.default.createTooltip('<font color="blue">' + 'INDEXTERMS("' + branch.content + '")</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
            } else {
              buffer += 'INDEXTERMS("' + branch.content + '")';
            }

            break;

          case 'raw':
            buffer += branch.content;
            break;

          case 'template':
            buffer += _tools.default.resolveTemplate(branch.content, 'scopus');
            break;

          case 'comment':
            // Do nothing
            break;

          default:
            throw new Error('Unsupported object tree type: ' + branch.type);
        }

        return buffer // Add spacing provided... its not a raw buffer or the last entity within the structure
        + (branch.type == 'raw' || // Its not a raw node
        branch.type == 'line' || // Its not a line node
        branchIndex == tree.length - 1 || // Its not the last item in the sequence
        branchIndex < tree.length - 1 && tree[branchIndex + 1] && tree[branchIndex + 1].type && tree[branchIndex + 1].type == 'raw' ? '' : ' ');
      }).join('');
    };

    return compileWalker(tree);
  },
  open: function open(query) {
    return {
      method: 'POST',
      action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
      fields: {
        textBox: query
      }
    };
  },
  openTerms: 'use advanced search box'
};
exports.default = _default;