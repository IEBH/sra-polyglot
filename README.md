Polyglot Search Syntax Translator
=================================
This module is part of the [Bond University Centre for Research in Evidence-Based Practice](https://github.com/CREBP) Systematic Review Assistant suite of tools.

When given a complex search query in either PubMed or Ovid MEDLINE format it will attempt to translate it to any of the supported search engine formats.


```javascript
var polyglot = require('sra-polyglot');

var queries =polyglot.translateAll('"Primary Health Care"[Mesh] OR Primary care OR Primary healthcare OR Family practice OR General practice\n\nAND\n\n"Treatment Failure"[Mesh] OR Treatment failure OR Treatment failures\n\nAND\n\n"Bacterial Infections"[Mesh] OR Bacteria OR Bacterial\n\nAND\n\n"Anti-Bacterial Agents"[Mesh] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic');

console.log(queries);
```

Will output an object structure like:

```json
{
	"pubmed": "(\"Primary Health Care\"[MESH] OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\nAND\n\n(\"Treatment Failure\"[MESH] OR Treatment failure OR Treatment failures)\n\nAND\n\n(\"Bacterial Infections\"[MESH] OR Bacteria OR Bacterial)\n\nAND\n\n(\"Anti-Bacterial Agents\"[MESH] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)",
	"ovid": "(exp Primary Health Care/ OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\nAND\n\n(exp Treatment Failure/ OR Treatment failure OR Treatment failures)\n\nAND\n\n(exp Bacterial Infections/ OR Bacteria OR Bacterial)\n\nAND\n\n(exp Anti-Bacterial Agents/ OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)",
	"cochrane": "([mh \"Primary Health Care\"] OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\nAND\n\n([mh \"Treatment Failure\"] OR Treatment failure OR Treatment failures)\n\nAND\n\n([mh \"Bacterial Infections\"] OR Bacteria OR Bacterial)\n\nAND\n\n([mh \"Anti-Bacterial Agents\"] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)",
	"embase": "('Primary Health Care'/exp OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\nAND\n\n('Treatment Failure'/exp OR Treatment failure OR Treatment failures)\n\nAND\n\n('Bacterial Infections'/exp OR Bacteria OR Bacterial)\n\nAND\n\n('Anti-Bacterial Agents'/exp OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)",
	"webofscience": "(Primary care OR Primary healthcare OR Family practice OR General practice)\n\nAND\n\n(Treatment failure OR Treatment failures)\n\nAND\n\n(Bacteria OR Bacterial)\n\nAND\n\n(Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)",
	"cinahl": "((MH \"Primary Health Care+\") OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\nAND\n\n((MH \"Treatment Failure+\") OR Treatment failure OR Treatment failures)\n\nAND\n\n((MH \"Bacterial Infections+\") OR Bacteria OR Bacterial)\n\nAND\n\n((MH \"Anti-Bacterial Agents+\") OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)"
}
```

See the JSDoc of the [inline code](index.js) for more details on the supported APIs.



Parsed Tree Object
==================
Each of the following sub-sections describes a node which can be contained within the compiled tree.

group
-----
A sub-grouping of nodes. This represents a lexical parentheses level.

| Property | Type | Description |
| `field` | String Enum | The field to use for complex logical comparisons (see the `phrase` section for the full list) |
| `nodes` | Array | Sub-nodes to include within the search group |


joinAnd
-------
A logical 'And' condition between the previous and next element.


joinNear
-------
A proximity join between the previous and next element.

| Property | Type | Description |
| `proximity` | Number | The number of (usually) words to allow as a maximum proximity scan |


joinNot
-------
A logical 'Not' condition between the previous and next element.


joinOr
------
A logical 'Or' condition between the previous and next element.


mesh
----
A valid Mesh heading.

| Property | Type | Description |
| `content` | String | The Mesh heading to use |
| `recurse` | Boolean | Whether to recurse down child Mesh nodes when searching. This is only present if the input syntax supports it (Ovid MEDLINE specifically) |


phrase
------
A simple text phrase.

| Property | Type | Description |
| `field` | String Enum: `title`, `abstract`, `title+abstract`, `practiceGuideline`, `floatingSubheading` | The field to use for simple phrase comparisons |
| `content` | String | If specified the string of text to search for in the field specified by `context`. Cannot be used with `nodes` |
| `nodes`   | Array | If specified points to a group of nodes used to compile the search expression to be searched in the field specified by `context`. The `nodes` structure must contain exactly 1 element and it must be of a group type. Cannot be used with `content` |


raw
---
A string of text that should be passed from the input to the output.
This string can contain control characters line linefeeds.


| Property | Type | Description |
| `content` | String | The string of text to preserve |
