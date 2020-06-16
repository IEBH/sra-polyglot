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
    id: 'psycinfo',
    title: 'PsycInfo',
    aliases: ['p', 'pi'],

    /**
    * Compile a tree structure to PsycInfo output
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
                            buffer += _tools2.default.quotePhrase(branch, 'psycinfo', settings.highlighting) + (branch.field == 'title' ? '.ti' : branch.field == 'abstract' ? '.ab' : branch.field == 'title+abstract' ? '.ti,ab' : branch.field == 'title+abstract+tw' ? '.ti,ab' : branch.field == 'title+abstract+other' ? '.mp.' : branch.field == 'floatingSubheading' ? '.hw' : branch.field == 'publicationType' ? '.pt' : branch.field == 'substance' ? '.hw' : branch.field == 'language' ? '.la' : '');
                        } else {
                            if (settings.highlighting) {
                                buffer += _tools2.default.createPopover(_tools2.default.quotePhrase(branch, 'psycinfo', settings.highlighting), branch.offset + branch.content.length);
                            } else {
                                buffer += _tools2.default.quotePhrase(branch, 'psycinfo', settings.highlighting);
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
                        buffer += 'ADJ' + branch.proximity;
                        break;
                    case 'mesh':
                        if (settings.highlighting) {
                            buffer += _tools2.default.createTooltip(_tools2.default.quotePhrase(branch, 'psycinfo', settings.highlighting), "PsycInfo does not support MeSH terms");
                        } else {
                            buffer += _tools2.default.quotePhrase(branch, 'psycinfo');
                        }
                        break;
                    case 'meshMajor':
                        if (settings.highlighting) {
                            buffer += _tools2.default.createTooltip('<font color="blue">' + 'exp *' + branch.content + '/</font>', "Polyglot does not translate subject terms (e.g MeSH to Emtree), this needs to be done manually");
                        } else {
                            buffer += 'exp *' + branch.content + '/';
                        }
                        break;
                    case 'raw':
                        buffer += branch.content;
                        break;
                    case 'template':
                        buffer += _tools2.default.resolveTemplate(branch.content, 'psycinfo');
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
            action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
            fields: {
                textBox: query
            }
        };
    },
    openTerms: 'any search box'
};