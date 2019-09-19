'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tools = require('../tools.js');

var _tools2 = _interopRequireDefault(_tools);

var _global = require('../global.js');

var _global2 = _interopRequireDefault(_global);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    id: 'pubmed',
    title: 'PubMed',
    aliases: ['pubmed', 'p', 'pm', 'pubm'],

    /**
    * Compile a tree structure to PubMed output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
    compile: function compile(tree, options) {
        var settings = _lodash2.default.defaults(options, {
            replaceWildcards: true
        });

        // Apply wildcard replacements
        if (settings.replaceWildcards) _tools2.default.replaceContent(tree, ['phrase'], [{ subject: /\?/g, value: '?' }, { subject: /\$/g, value: '*' }, { subject: /#/g, value: '<span msg="NO_SINGLE_WILDCARD">*</span>' }]);

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
                            branch.nodes = _tools2.default.visit(branch.nodes, ['phrase'], function (b) {
                                return b.field = branch.field;
                            });
                            branch.nodes = _tools2.default.visit(branch.nodes, ['group'], function (b) {
                                return b.field = branch.field;
                            });
                        }
                        buffer += '(' + compileWalker(branch.nodes) + ')';
                        break;
                    case 'ref':
                        var node;
                        for (node in branch.nodes) {
                            if (node == 0) {
                                buffer += '(' + compileWalker(branch.nodes[node]) + ')';
                            } else {
                                buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
                            }
                        }
                        break;
                    case 'phrase':
                        if (branch.field) {
                            buffer += _tools2.default.quotePhrase(branch, 'pubmed', settings.highlighting) + (branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">[ti]</font>' : '[ti]' : branch.field == 'abstract' ? settings.highlighting ? _tools2.default.createTooltip('<font color="LightSeaGreen">[tiab]</font>', 'PubMed cannot search abstract field term independently') : '[tiab]' : branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">[tiab]</font>' : '[tiab]' : branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">[tiab]</font>' : '[tiab]' : branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">[tw]</font>' : '[tw]' : branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">[sh]</font>' : '[sh]' : branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">[pt]</font>' : '[pt]' : branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">[nm]</font>' : '[nm]' : '' // Unsupported field suffix for PubMed
                            );
                        } else {
                            // If no field tag exists create popover with ability to replace field tag
                            if (_global2.default.variables.no_field_tag.indexOf(branch.offset + branch.content.length) === -1) {
                                _global2.default.variables.no_field_tag.push(branch.offset + branch.content.length);
                            }
                            if (settings.highlighting) {
                                buffer += _tools2.default.createPopover(_tools2.default.quotePhrase(branch, 'pubmed', settings.highlighting), branch.offset + branch.content.length);
                            } else {
                                buffer += _tools2.default.quotePhrase(branch, 'pubmed', settings.highlighting);
                            }
                        }
                        break;
                    case 'joinNear':
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
                            buffer += _tools2.default.createTooltip('<font color="blue">' + _tools2.default.quotePhrase(branch, 'pubmed') + '[Mesh' + (branch.recurse ? '' : ':NoExp') + ']</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
                        } else {
                            buffer += _tools2.default.quotePhrase(branch, 'pubmed') + '[Mesh' + (branch.recurse ? '' : ':NoExp') + ']';
                        }
                        break;
                    case 'meshMajor':
                        if (settings.highlighting) {
                            buffer += _tools2.default.createTooltip('<font color="blue">' + _tools2.default.quotePhrase(branch, 'pubmed') + '[Majr]' + '</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
                        } else {
                            buffer += _tools2.default.quotePhrase(branch, 'pubmed') + '[Majr]';
                        }
                        break;
                    case 'raw':
                        buffer += branch.content;
                        break;
                    case 'template':
                        buffer += _tools2.default.resolveTemplate(branch.content, 'pubmed');
                        break;
                    case 'comment':
                        // Do nothing
                        break;
                    default:
                        throw new Error('Unsupported object tree type: ' + branch.type);
                }

                return buffer
                // Add spacing provided... its not a raw buffer or the last entity within the structure
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
            method: 'GET',
            action: 'https://www.ncbi.nlm.nih.gov/pubmed',
            fields: {
                term: query
            }
        };
    },
    openTerms: 'any search box'
};