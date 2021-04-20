import xlsx from 'xlsx';

/**
* Collection of row sources to use when running a test
* This is calculated from the input data
* @type {array<Object>} Collection of sources extracted from the input data
* @property {string} id The row ID to use to extract data per line
*/
var sources;

export default settings => {
    return Promise.resolve()
        .then(()=> xlsx.readFile(`./v4.xlsx`))
        .then(workbook => {
            return xlsx.utils.sheet_to_json(workbook.Sheets[settings.sheet]);
        })
        // Extract source rows to aim for from the data set
        .then(sheet => {
            // Calculate sources
            sources = Object.keys(sheet[0])
                .filter(header =>
                    [...settings.includeCols].includes(header) // Filter include cols
                )
                .filter(header =>
                    ![...settings.omitCols, settings.rowHeader].includes(header) // Skip omitted columns
                )
                .map(header => ({
                    id: header
                }));
            // Return sliced data - removing all header areas
            return sheet.slice(settings.dataRowStart); // Remove first row
        })
        // Create lookup map 
        .then(sheet => {
            let parseMap = new Map();
            sheet.forEach((row, rowIndex) => {
                sources.forEach(source => {
                    if(row[source.id]) {
                        var match = row[source.id].match(/Test(?<fieldCode>[^\s]*)/); // Only does basic match
                        if (match.groups.fieldCode) {
                            // TODO: Add logic if the field code could have different variations (e.g. .ti,ab,kf.)
                            // Push fieldCode and explanation to Map
                            parseMap.set(match.groups.fieldCode.toLowerCase(), row[settings.rowHeader])
                        } else {
                            console.error(`\n${row[source.id]} failed to match field code\n`)
                        }
                    } else {
                        console.error(`\n${source.id}'s "${row[settings.rowHeader]}" is undefined\n`)
                    }
                })
            })
            return parseMap;
        })
}