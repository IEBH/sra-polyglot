import xlsx from 'xlsx';

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

/**
* Collection of row sources to use when running a test
* This is calculated from the input data
* @type {array<Object>} Collection of sources extracted from the input data
* @property {string} id The row ID to use to extract data per line
*/
var sources;

var xlsxToParseObject = () => {
    Promise.resolve()
        .then(()=> xlsx.readFile(`./polyglotV4.xlsx`))
        .then(workbook => {
            return xlsx.utils.sheet_to_json(workbook.Sheets[settings.sheet]);
        })
        // Extract source rows to aim for from the data set
        .then(sheet => {
            // Calculate sources
            sources = Object.keys(sheet[0])
                .filter(header =>
                    ![...settings.omitCols, settings.rowHeader].includes(header) // Skip omitted columns
                )
                .map(header => ({
                    id: header
                }));
            // Return sliced data - removing all header areas
            return sheet.slice(settings.dataRowStart); // Remove
        })
        // Create lookup map 
        .then(sheet => {
            let lookupMap = new Map();
            sheet.forEach((row, rowIndex) => {
                sources.forEach(source => {
                    if(row[source.id]) {
                        var match = row[source.id].match(/Term(?<fieldCode>[^\s]*)/); // Only does basic match
                        if (match.groups.fieldCode) {
                            // TODO: Add logic if the field code could have different variations (e.g. .ti,ab,kf.)
                            // Push fieldCode and explanation to Map
                            lookupMap.set(match.groups.fieldCode, row[settings.rowHeader])
                        } else {
                            console.error(`\n${row[source.id]} failed to match field code\n`)
                        }
                    } else {
                        console.error(`\n${source.id}'s "${row[settings.rowHeader]}" is undefined\n`)
                    }
                })
            })
            return lookupMap;
        })
        .then(lookupMap => console.log(lookupMap))
}

xlsxToParseObject();