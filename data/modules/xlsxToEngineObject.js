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
            let engineObject = {};
            sources.forEach(source => {
                engineObject[source.id] = {};
                sheet.forEach((row, rowIndex) => {
                    if(row[source.id]) {
                        let termArray = row[source.id].split(/(Test)/g)
                        engineObject[source.id][row[settings.rowHeader]] = termArray;
                    } else {
                        console.error(`\n${source.id}'s "${row[settings.rowHeader]}" is undefined\n`)
                    }
                })
            })
            return engineObject;
        })
}