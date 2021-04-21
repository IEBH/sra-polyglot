import xlsx from 'xlsx';

var sheetToArr = function(sheet){
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = xlsx.utils.decode_range(sheet['!ref']);
    for(rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
        row = {};
        for(colNum = range.s.c; colNum <= range.e.c; colNum++) {
            var nextCell = sheet[
                xlsx.utils.encode_cell({r: rowNum, c: colNum})
            ];
            var key = sheet[
                xlsx.utils.encode_cell({r: range.s.r, c: colNum})
            ].w;
            if(key && nextCell) {
                row[key] = nextCell
            }
        }
        if(Object.keys(row).length > 0) {
            result.push(row);
        }
    }
    return result;
};

export default settings => {
    /**
    * Collection of row sources to use when running a test
    * This is calculated from the input data
    * @type {array<Object>} Collection of sources extracted from the input data
    * @property {string} id The row ID to use to extract data per line
    */
    var sources;
    return Promise.resolve()
        .then(()=> xlsx.readFile(`./v4.xlsx`))
        .then(workbook => {
            return sheetToArr(workbook.Sheets[settings.sheet]);
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
            console.log(sources);
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
                        if (!engineObject[source.id][row[settings.rowHeader]]?.w) {
                            let termArray = row[source.id].w.split(/(Test)/g)
                            engineObject[source.id][row[settings.rowHeader].w] = { terms: termArray, comment: row[source.id].c?.t };
                        } else {
                            console.log("Duplicate key:", row[settings.rowHeader].w);
                        }
                    } else {
                        console.error(`\n${source.id}'s "${row[settings.rowHeader].w}" is undefined\n`)
                    }
                })
            })
            return engineObject;
        })
}