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
    id: 'ovid',
    title: 'Ovid Medline / Ovid Embase',
    aliases: ['ovid', 'o', 'ov'],

    /**
    * Compile a tree structure to Ovid MEDLINE output
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
        if (settings.replaceWildcards) _tools2.default.replaceContent(tree, ['phrase'], [{ subject: /\?/g, value: '?' }]);

        var compileWalker = function compileWalker(tree) {
            var expand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            return tree.map(function (branch, branchIndex) {
                var buffer = '';
                switch (branch.type) {
                    case 'line':
                        buffer += compileWalker(branch.nodes);
                        break;
                    case 'group':
                        if (branch.field) {
                            buffer += '(' + compileWalker(branch.nodes, false) + ')';
                            if (expand) {
                                buffer += branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">.ti.</font>' : '.ti.' : branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ab.</font>' : '.ab.' : branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ti,ab.</font>' : '.ti,ab.' : branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">.tw.</font>' : '.tw.' : branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">.mp.</font>' : '.mp.' : branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">.fs.</font>' : '.fs.' : branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">.pt.</font>' : '.pt.' : branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">.nm.</font>' : '.nm.' : branch.field == 'language' ? settings.highlighting ? '<font color="LightSeaGreen">.lg.</font>' : '.lg.' : '' // Unsupported field suffix for Ovid
                                ;
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
                                        buffer += branch.ref[node];
                                    } else {
                                        buffer += ' ' + branch.cond + ' ' + branch.ref[node];
                                    }
                                }
                            } else {
                                buffer += branch.ref;
                            }
                        }
                        break;
                    case 'phrase':
                        if (branch.field && expand) {
                            buffer += branch.content + (branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">.ti.</font>' : '.ti.' : branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ab.</font>' : '.ab.' : branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ti,ab.</font>' : '.ti,ab.' : branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">.tw.</font>' : '.tw.' : branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">.mp.</font>' : '.mp.' : branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">.fs.</font>' : '.fs.' : branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">.pt.</font>' : '.pt.' : branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">.nm.</font>' : '.nm.' : branch.field == 'language' ? settings.highlighting ? '<font color="LightSeaGreen">.lg.</font>' : '.lg.' : '' // Unsupported field suffix for Ovid
                            );
                        } else {
                            if (settings.highlighting) {
                                buffer += _tools2.default.createPopover(branch.content, branch.offset + branch.content.length);
                            } else {
                                buffer += branch.content;
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
                        buffer += 'ADJ' + branch.proximity;
                        if (settings.highlighting) buffer += '</font>';
                        break;
                    case 'mesh':
                        if (settings.highlighting) {
                            buffer += _tools2.default.createTooltip('<font color="blue">' + (branch.recurse ? 'exp ' : '') + branch.content + '/</font>', "Polyglot does not translate subject terms (e.g MeSH to Emtree), this needs to be done manually");
                        } else {
                            buffer += (branch.recurse ? 'exp ' : '') + branch.content + '/';
                        }
                        break;
                    case 'meshMajor':
                        if (settings.highlighting) {
                            buffer += _tools2.default.createTooltip('<font color="blue">' + (branch.recurse ? 'exp ' : '') + '*' + branch.content + '/</font>', "Polyglot does not translate subject terms (e.g MeSH to Emtree), this needs to be done manually");
                        } else {
                            buffer += (branch.recurse ? 'exp ' : '') + '*' + branch.content + '/';
                        }
                        break;
                    case 'raw':
                        buffer += branch.content;
                        break;
                    case 'template':
                        buffer += _tools2.default.resolveTemplate(branch.content, 'ovid');
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