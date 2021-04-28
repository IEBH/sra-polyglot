import * as fs from 'fs';
import xlsxToParseMap from "./modules/xlsxToParseMap.js"
import xlsxToEngineObject from "./modules/xlsxToEngineObject.js"

/**
* Testkit settings
* @property {string} sheet ID of the sheet to extract the syntax tests from
* @property {boolean} matchFieldCode Whether to try and regex match the field code
* @property {array<string>} omitCols Column headings to ignore when processing the sheet (implies also `rowHeader` as an item)
* @property {string} includeCols Columns to include when parsing
* @property {string} rowHeader Which column header should be used as the row description / header
* @property {number} [dataRowStart] Row offset to start reading data from, if falsy is calculated as driverRow+1
*/
var settings = {
	sheet: 'fieldCodes',
	matchFieldCode: true,
	omitCols: ['Searching type'],
	includeCols: ['PubMed full', 'PubMed abbreviation', 'PubMed abbreviation 2', 'Ovid MEDLINE', 'Ovid MEDLINE 2'],
	rowHeader: 'Explanation',
	dataRowStart: 0,
};

// Field Codes {{{
xlsxToParseMap(settings).then(parseMap => {
	fs.writeFileSync(
		'../src/data/fieldCodesParse.js',
		`export default JSON.parse(\`${JSON.stringify(parseMap).replace(/\\/g, "\\\\")}\`)` // Replace \ with \\ to escape \}\`)`
	);
});

xlsxToEngineObject(settings).then(engineObject => {
	fs.writeFileSync(
		'../src/data/fieldCodesObject.js',
		`export default JSON.parse(\`${JSON.stringify(engineObject).replace(/\\/g, "\\\\")}\`)` // Replace \ with \\ to escape \
	) 
});
// }}}

// Mesh {{{
xlsxToEngineObject({ ...settings, sheet: 'mesh' }).then(engineObject => {
	fs.writeFileSync(
		'../src/data/meshObject.js',
		`export default JSON.parse(\`${JSON.stringify(engineObject).replace(/\\/g, "\\\\")}\`)` // Replace \ with \\ to escape \
	) 
});
// }}}

// Mesh Translations {{{
xlsxToParseMap({ ...settings, sheet: 'meshTranslations', matchFieldCode: false }).then(parseMap => {
	fs.writeFileSync(
		'../src/data/meshTranslationsParse.js',
		`export default JSON.parse(\`${JSON.stringify(parseMap).replace(/\\/g, "\\\\")}\`)` // Replace \ with \\ to escape \}\`)`
	);
});

xlsxToEngineObject({ ...settings, sheet: 'meshTranslations' }).then(engineObject => {
	fs.writeFileSync(
		'../src/data/meshTranslationsObject.js',
		`export default JSON.parse(\`${JSON.stringify(engineObject).replace(/\\/g, "\\\\")}\`)` // Replace \ with \\ to escape \
	) 
});
// }}}