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
