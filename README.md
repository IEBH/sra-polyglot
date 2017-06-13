Polyglot Search Syntax Translator
=================================
This module is part of the [Bond University Centre for Research in Evidence-Based Practice](https://github.com/CREBP) Systematic Review Assistant suite of tools.

When given a complex search query in either PubMed or Ovid MEDLINE format it will attempt to translate it to any of the supported search engine formats.

It forms the [Polyglot Search Syntax Translator](http://crebp-sra.com/#/polyglot) module of the [Systematic Review Accelerator](http://crebp-sra.com).


```javascript
var polyglot = require('sra-polyglot');

var queries = polyglot.translateAll('"Primary Health Care"[Mesh] OR Primary care OR Primary healthcare OR Family practice OR General practice\n\nAND\n\n"Treatment Failure"[Mesh] OR Treatment failure OR Treatment failures\n\nAND\n\n"Bacterial Infections"[Mesh] OR Bacteria OR Bacterial\n\nAND\n\n"Anti-Bacterial Agents"[Mesh] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic');

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


Search Syntax
=============
A search query can be specified in either PubMed query format, Ovid MEDLINE format or a mix of the two. Most of the usual search query syntax will be supported by Polyglot by default.

The following sub-headings break down each individual syntax.

**General notes**:

* Generally you can use either PubMed or Ovid MEDLINE query syntax without any issue
* By default queries on their own line will be automatically enclosed in brackets
* Multiple terms can be grouped using speachmarks but this is optional
* [Comments](#comments) can be specified to make your search strategy easier to read in future
* [Templates](#templates) are supported allowing inserts of compound search terms which can be specific to different output engines


Plain-text phrases
------------------
To search for basic phrases simply specify the words within the search term with or without being enclosed in speachmarks. Specific search fields can be specified by appending it to the term in any of the following supported formats:

* `Term` (Generic search in all fields)
* `Term[ti]` (PubMed field specification, fields also supported: `tiab`, `ti`, `ab`)
* `Term.ti.` (Ovid MEDLINE field specification, fields also supported: `ti`, `ti,ab`, `tw`, `ab`, `pt`, `fs`, `sh`, `xm`)


Mesh Headings
-------------
To search for a supported Mesh term use any of the following:

* `Term[Mesh]` (exploded Mesh heading, PubMed format)
* `Term[Mesh:NoExp]` (non-exploded Mesh heading, PubMed format)
* `exp Term/` (exploded Mesh heading, Ovid MEDLINE format #1)
* `Term/` (non-exploded Mesh heading, Ovid MEDLINE format #1)
* `Term.xm.` (exploded Mesh heading, Ovid MEDLINE format #2)
* `Term.sh.` (non-exploded Mesh heading, Ovid MEDLINE format #2)


Logical Syntax
--------------
Any of the following keywords can be used to join multiple phrases together:

* `Term1 AND Term2`
* `Term1 OR Term2`
* `Term1 NOT Term2`
* `(Term1 OR Term2) AND (Term3 OR Term4)` (logical grouping using brackets)

All keywords are case insensitive (i.e. `and` works the same as `AND` or `And`).


Proximity searching
-------------------
Similar to [Logical Syntax](#logical-syntax), proximity searching allows the searching of a secondary term within the range of the primary:

* `Term1 ADJ3 Term2` (Search for `Term2` within 3 words of `Term1`, Ovid MEDLINE format)
* `Term1 NEAR3 Term2` (Search for `Term2` within 3 words of `Term1`, Cochrane Library format)
* `Term1 N3 Term2` (Search for `Term2` within 3 words of `Term1`, CINAHL format)
* `Term1 NEAR/3 Term2` (Search for `Term2` within 3 words of `Term1`, Embase and Web of Science formats)


Comments
--------
Comments allow you to add notes within your search strategy which will be removed from the output.
These allow you to write your query in a human-readable way without effecting the output in each search engine.

To use comments simply add a hash character (`#`) anywhere on a line. Any text *after* that character will be ignored until the next line.


Parsed Tree Object
==================
This section is only intended for people who are interested in the inner working of the parsing tree used by Polyglot.

Each of the following sub-sections describes a node which can be contained within the compiled tree returned by `Polyglot.parse(query)`.

The result tree can then be fed into `Polyglot.engines.ENGINE.compile(tree)` to return the translated search.


group
-----
A sub-grouping of nodes. This represents a lexical parentheses level.

| Property | Type        | Description                                                                                   |
|----------|-------------|-----------------------------------------------------------------------------------------------|
| `field`  | String Enum | The field to use for complex logical comparisons (see the `phrase` section for the full list) |
| `nodes`  | Array       | Sub-nodes to include within the search group                                                  |


joinAnd
-------
A logical 'And' condition between the previous and next element.


joinNear
-------
A proximity join between the previous and next element.

| Property    | Type   | Description                                                        |
|-------------|--------|--------------------------------------------------------------------|
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

| Property  | Type    | Description                                                                                                                               |
|-----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `content` | String  | The Mesh heading to use                                                                                                                   |
| `recurse` | Boolean | Whether to recurse down child Mesh nodes when searching. This is only present if the input syntax supports it (Ovid MEDLINE specifically) |


phrase
------
A simple text phrase.

| Property  | Type                                                                                          | Description                                                                                                                                                                                                                                          |
|-----------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `field`   | String Enum: `title`, `abstract`, `title+abstract`, `practiceGuideline`, `floatingSubheading` | The field to use for simple phrase comparisons                                                                                                                                                                                                       |
| `content` | String                                                                                        | If specified the string of text to search for in the field specified by `context`. Cannot be used with `nodes`                                                                                                                                       |
| `nodes`   | Array                                                                                         | If specified points to a group of nodes used to compile the search expression to be searched in the field specified by `context`. The `nodes` structure must contain exactly 1 element and it must be of a group type. Cannot be used with `content` |


raw
---
A string of text that should be passed from the input to the output.
This string can contain control characters such as line-feeds.


| Property  | Type   | Description                    |
|-----------|--------|--------------------------------|
| `content` | String | The string of text to preserve |


template
--------
A meta template specified which Polyglot will insert into the output correctly based on the search engine.

These are specified using the `<Template ID>` syntax.

For example the "RCT Filter" template (specified via `<RCT Filter>` in Polglot) has a specific syntax in PubMed and Ovid MEDLINE and in some search engines is omitted all other. Using templates allows Polyglot to correctly swap the synax based on the output engine.


| Property  | Type   | Description                                      |
|-----------|--------|--------------------------------------------------|
| `content` | String | The lower-case version of the template ID to use |
