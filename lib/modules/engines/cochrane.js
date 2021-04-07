"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = _interopRequireDefault(require("../tools.js"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findTranslation = function findTranslation(field, highlighting) {
  return field == 'title' ? highlighting ? '<font color="LightSeaGreen">:ti</font>' : ':ti' : field == 'abstract' ? highlighting ? '<font color="LightSeaGreen">:ab</font>' : ':ab' : field == 'title+abstract' ? highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' : field == 'title+abstract+tw' ? highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' : field == 'title+abstract+other' ? highlighting ? '<font color="LightSeaGreen">:ti,ab,kw</font>' : ':ti,ab,kw' : field == 'title+abstract+keyword' ? highlighting ? '<font color="LightSeaGreen">:ti,ab,kw</font>' : ':ti,ab,kw' : field == 'floatingSubheading' ? highlighting ? '<font color="LightSeaGreen">:fs</font>' : ':fs' : field == 'publicationType' ? highlighting ? '<font color="LightSeaGreen">:pt</font>' : ':pt' : field == 'substance' ? highlighting ? '<font color="LightSeaGreen">:kw</font>' : ':kw' : field == 'keyword' ? highlighting ? '<font color="LightSeaGreen">:kw</font>' : ':kw' : '' // Unsupported field suffix for PubMed
  ;
};

var _default = {
  id: 'cochrane',
  title: 'Cochrane Library (via Wiley)',
  aliases: ['cochrane', 'c', 'cl'],

  /**
  * Compile a tree structure to Cochrane Library output
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
      var expand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return tree.map(function (branch, branchIndex) {
        var buffer = '';

        switch (branch.type) {
          case 'line':
            buffer += compileWalker(branch.nodes);
            break;

          case 'group':
            if (branch.field && branch.field == 'floatingSubheading') {
              if (settings.highlighting) buffer += '<font color="blue">';
              buffer += '[mh /' + _tools.default.quotePhrase(branch, 'cochrane') + ']';
              if (settings.highlighting) buffer += '</font>';
            } else if (branch.field) {
              buffer += '(' + compileWalker(branch.nodes, false) + ')';

              if (expand) {
                buffer += findTranslation(branch.field, settings.highlighting);
              }
            } else {
              buffer += '(' + compileWalker(branch.nodes) + ')';
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
            if (branch.field && branch.field == 'floatingSubheading') {
              if (settings.highlighting) buffer += '<font color="blue">';
              buffer += '[mh /' + _tools.default.quotePhrase(branch, 'cochrane') + ']';
              if (settings.highlighting) buffer += '</font>';
            } else if (branch.field && branch.field == 'language') {
              buffer += _tools.default.createTooltip(branch.content, "Cochrane does not support language searching, remove term from search", "red-underline");
            } else if (branch.field && expand) {
              buffer += _tools.default.quotePhrase(branch, 'cochrane', settings.highlighting) + findTranslation(branch.field, settings.highlighting);
            } else {
              if (settings.highlighting) {
                buffer += _tools.default.createPopover(_tools.default.quotePhrase(branch, 'cochrane', settings.highlighting), branch.offset + branch.content.length);
              } else {
                buffer += _tools.default.quotePhrase(branch, 'cochrane', settings.highlighting);
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
            if (settings.highlighting) buffer += '<font color="purple">';
            buffer += 'NEAR/' + branch.proximity;
            if (settings.highlighting) buffer += '</font>';
            break;

          case 'joinNext':
            if (settings.highlighting) buffer += '<font color="purple">';
            buffer += 'NEXT';
            if (settings.highlighting) buffer += '</font>';
            break;

          case 'mesh':
            if (settings.highlighting) {
              buffer += _tools.default.createTooltip('<font color="blue">' + '[mh ' + (branch.recurse ? '' : '^') + _tools.default.quotePhrase(branch, 'cochrane') + ']</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
            } else {
              buffer += '[mh ' + (branch.recurse ? '' : '^') + _tools.default.quotePhrase(branch, 'cochrane') + ']';
            }

            break;

          case 'meshMajor':
            if (settings.highlighting) {
              buffer += _tools.default.createTooltip('<font color="blue">' + '[mh ' + (branch.recurse ? '' : '^') + _tools.default.quotePhrase(branch, 'cochrane') + ']</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
            } else {
              buffer += '[mh ' + (branch.recurse ? '' : '^') + _tools.default.quotePhrase(branch, 'cochrane') + ']';
            }

            break;

          case 'raw':
            buffer += branch.content;
            break;

          case 'template':
            buffer += _tools.default.resolveTemplate(branch.content, 'cochrane');
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
      action: 'http://onlinelibrary.wiley.com/cochranelibrary/search',
      fields: {
        'submitSearch': 'Go',
        'searchRows[0].searchCriterias[0].fieldRestriction': null,
        'searchRows[0].searchCriterias[0].term': query,
        'searchRows[0].searchOptions.searchProducts': null,
        'searchRows[0].searchOptions.searchStatuses': null,
        'searchRows[0].searchOptions.searchType': 'All',
        'searchRows[0].searchOptions.publicationStartYear': null,
        'searchRows[0].searchOptions.publicationEndYear': null,
        'searchRows[0].searchOptions.disableAutoStemming': null,
        'searchRows[0].searchOptions.reviewGroupIds': null,
        'searchRows[0].searchOptions.onlinePublicationStartYear': null,
        'searchRows[0].searchOptions.onlinePublicationEndYear': null,
        'searchRows[0].searchOptions.onlinePublicationStartMonth': 0,
        'searchRows[0].searchOptions.onlinePublicationEndMonth': 0,
        'searchRows[0].searchOptions.dateType:pubAllYears': null,
        'searchRows[0].searchOptions.onlinePublicationLastNoOfMonths': 0,
        'searchRow.ordinal': 0,
        'hiddenFields.currentPage': 1,
        'hiddenFields.strategySortBy': 'last-modified-date;desc',
        'hiddenFields.showStrategies': 'false',
        'hiddenFields.containerId': null,
        'hiddenFields.etag': null,
        'hiddenFields.originalContainerId': null,
        'hiddenFields.searchFilters.filterByProduct:cochraneReviewsDoi': null,
        'hiddenFields.searchFilters.filterByIssue': 'all',
        'hiddenFields.searchFilters.filterByType': 'All',
        'hiddenFields.searchFilters.displayIssuesAndTypesFilters': 'true'
      }
    };
  },
  openTerms: 'use search manager box'
};
exports.default = _default;