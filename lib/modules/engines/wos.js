"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = _interopRequireDefault(require("../tools.js"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  id: 'wos',
  title: 'Web of Science',
  aliases: ['webofscience', 'w', 'wos', 'websci'],

  /**
  * Compile a tree structure to Web of Science output
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
            if (branch.field && branch.field == 'language') {
              buffer += "LA=" + branch.content;
            } else {
              buffer += _tools.default.quotePhrase(branch, 'wos', settings.highlighting);
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
            buffer += 'NEAR/' + branch.proximity;
            break;

          case 'joinNext':
            buffer += 'NEAR/' + (branch.proximity - 1);
            break;

          case 'mesh':
            if (settings.highlighting) {
              buffer += _tools.default.createTooltip(_tools.default.quotePhrase(branch, 'wos', settings.highlighting), "Web of Science does not support MeSH terms");
            } else {
              buffer += _tools.default.quotePhrase(branch, 'wos');
            }

            break;

          case 'meshMajor':
            if (settings.highlighting) {
              buffer += _tools.default.createTooltip(_tools.default.quotePhrase(branch, 'wos', settings.highlighting), "Web of Science does not support MeSH terms");
            } else {
              buffer += _tools.default.quotePhrase(branch, 'wos');
            }

            break;

          case 'raw':
            buffer += branch.content;
            break;

          case 'template':
            buffer += _tools.default.resolveTemplate(branch.content, 'wos');
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
      action: 'http://apps.webofknowledge.com.ezproxy.bond.edu.au/UA_GeneralSearch.do',
      fields: {
        fieldCount: '1',
        action: 'search',
        product: 'UA',
        search_mode: 'GeneralSearch',
        SID: 'W15WDD6M2xkKPbfGfGY',
        max_field_count: '25',
        max_field_notice: 'Notice: You cannot add another field.',
        input_invalid_notice: 'Search Error: Please enter a search term.',
        exp_notice: 'Search Error: Patent search term could be found in more than one family (unique patent number required for Expand option) ',
        input_invalid_notice_limits: ' <br/>Note: Fields displayed in scrolling boxes must be combined with at least one other search field.',
        sa_params: "UA||W15WDD6M2xkKPbfGfGY|http://apps.webofknowledge.com.ezproxy.bond.edu.au|'",
        formUpdated: 'true',
        'value(input1)': query,
        'value(select1)': 'TS',
        x: '798',
        y: '311',
        'value(hidInput1)': null,
        limitStatus: 'collapsed',
        ss_lemmatization: 'On',
        ss_spellchecking: 'Suggest',
        SinceLastVisit_UTC: null,
        SinceLastVisit_DATE: null,
        period: 'Range Selection',
        range: 'ALL',
        startYear: '1900',
        endYear: new Date().getYear(),
        update_back2search_link_param: 'yes',
        ssStatus: 'display:none',
        ss_showsuggestions: 'ON',
        ss_query_language: 'auto',
        ss_numDefaultGeneralSearchFields: '1',
        rs_sort_by: 'PY.D;LD.D;SO.A;VL.D;PG.A;AU.A'
      }
    };
  },
  openTerms: 'any search box'
};
exports.default = _default;