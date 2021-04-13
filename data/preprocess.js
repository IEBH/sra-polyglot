import * as fs from 'fs';
import xlsxToParseMap from "./modules/xlsxToParseMap.js"

function mapToJson(map) {
	return JSON.stringify([...map]);
}
function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}

/**
* Testkit settings
* @property {string} sheet ID of the sheet to extract the syntax tests from
* @property {array<string>} omitCols Column headings to ignore when processing the sheet (implies also `rowHeader` as an item)
* @property {string} rowHeader Which column header should be used as the row description / header
* @property {number} [dataRowStart] Row offset to start reading data from, if falsy is calculated as driverRow+1
*/
var settings = {
	sheet: 'fieldCodes',
	omitCols: ['Searching type'],
	rowHeader: 'Explanation',
	dataRowStart: 1,
};

xlsxToParseMap(settings).then(parseMap => {
	fs.writeFileSync('parseMap.json', mapToJson(parseMap));
});
