'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tools = require('../tools.js');

var _tools2 = _interopRequireDefault(_tools);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    id: 'cinahl',
    title: 'CINAHL',
    aliases: ['cinahl', 'ci', 'cnal'],

    /**
    * Compile a tree structure to CINAHL output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
    compile: function compile(tree, options) {
        var settings = _lodash2.default.defaults(options, {
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
                                        buffer += "S" + branch.ref[node];
                                    } else {
                                        buffer += ' ' + branch.cond + ' S' + branch.ref[node];
                                    }
                                }
                            } else {
                                buffer += "S" + branch.ref;
                            }
                        }
                        break;
                    case 'phrase':
                        if (branch.field && (branch.field == 'title+abstract' || branch.field == 'title+abstract+tw')) {
                            buffer += 'TI ' + _tools2.default.quotePhrase(branch, 'cinahl', settings.highlighting) + ' OR ' + 'AB ' + _tools2.default.quotePhrase(branch, 'cinahl', settings.highlighting);
                        } else if (branch.field) {
                            buffer += _lodash2.default.trimStart((branch.field == 'title' ? 'TI' : branch.field == 'abstract' ? 'AB' : branch.field == 'floatingSubheading' ? 'MW' : branch.field == 'publicationType' ? 'PT' : branch.field == 'substance' ? 'MW' : branch.field == 'language' ? 'LA' : '') + ' ' + _tools2.default.quotePhrase(branch, 'cinahl', settings.highlighting));
                        } else {
                            if (settings.highlighting) {
                                buffer += _tools2.default.createPopover(_tools2.default.quotePhrase(branch, 'cinahl', settings.highlighting), branch.offset + branch.content.length);
                            } else {
                                buffer += _tools2.default.quotePhrase(branch, 'cinahl', settings.highlighting);
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
                        buffer += 'N' + branch.proximity;
                        break;
                    case 'mesh':
                        if (settings.highlighting) {
                            buffer += _tools2.default.createTooltip('<font color="blue">' + '(MH "' + branch.content + (branch.recurse ? '+' : '') + '")</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
                        } else {
                            buffer += '(MH "' + branch.content + (branch.recurse ? '+' : '') + '")';
                        }
                        break;
                    case 'meshMajor':
                        if (settings.highlighting) {
                            buffer += _tools2.default.createTooltip('<font color="blue">' + '(MM "' + branch.content + (branch.recurse ? '+' : '') + '")</font>', "Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually");
                        } else {
                            buffer += '(MM "' + branch.content + (branch.recurse ? '+' : '') + '")';
                        }
                        break;
                    case 'raw':
                        buffer += branch.content;
                        break;
                    case 'template':
                        buffer += _tools2.default.resolveTemplate(branch.content, 'cinahl');
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
            method: 'POST',
            action: 'http://web.a.ebscohost.com.ezproxy.bond.edu.au/ehost/resultsadvanced',
            fields: {
                bquery: query
            }
        };
    },
    openTerms: 'any search box'
};