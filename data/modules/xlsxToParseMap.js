import xlsx from 'xlsx';

/**
* Collection of row sources to use when running a test
* This is calculated from the input data
* @type {array<Object>} Collection of sources extracted from the input data
* @property {string} id The row ID to use to extract data per line
*/
var sources;

function permute(input, permArr = [], usedChars = []) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        permute(input, permArr, usedChars);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};


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
            let parseObject = {};
            sheet.forEach((row, rowIndex) => {
                sources.forEach(source => {
                    // Match based on field code
                    if(row[source.id] && settings.matchFieldCode) {
                        var match = row[source.id].match(/Test(?<fieldCode>[^\n]*)/); // Only does basic match
                        if (match && match.groups.fieldCode) {
                            var fieldCode = match.groups.fieldCode;
                            // Permute field code if it could have different variations (e.g. .ti,ab. or .ab,ti.)
                            var variations = [ fieldCode ];
                            if (fieldCode.includes(",")) {
                                variations = []; // Clear variations array to prevent duplicate field code
                                var periodSplit;
                                var permutations;
                                periodSplit = (fieldCode.split(/(\.)/g)); // Split by period
                                periodSplit = periodSplit.filter(el => el.length > 0); // Filter out empty strings
                                const index = periodSplit.findIndex(el => el.includes(",")) // Find index that has comma
                                permutations = permute(periodSplit[index].split(",")); // Calculate permutations for index
                                permutations = permutations.map(el => el.join(",")); // Join permuatations by comma
                                permutations.forEach(el => { // For each permutation reconstruct string and push to array
                                    var fieldCodePermutation = [
                                        ...periodSplit.slice(0, index),
                                        el,
                                        ...periodSplit.slice(index + 1)
                                    ].join("");
                                    variations.push(fieldCodePermutation);
                                })
                            }
                            // Push fieldCode and explanation to Map
                            variations.forEach(fieldCodeVariation => {
                                if (!parseObject[fieldCodeVariation.toLowerCase()]) {
                                    parseObject[fieldCodeVariation.toLowerCase()] = row[settings.rowHeader];
                                } else {
                                    console.log(
                                        `Duplicate key (${source.id})`,
                                        `'${fieldCodeVariation.toLowerCase()}'`,
                                        "for",
                                        `'${row[settings.rowHeader]}'`,
                                        "already exists for",
                                        `'${parseObject[fieldCodeVariation.toLowerCase()]}'`
                                    );
                                }
                            })
                        } else {
                            console.error(`\n${row[source.id]} failed to match field code\n`)
                        }
                    }
                    // Match based on entire string (for mesh translations)
                    else if (row[source.id]) {
                        const key = row[source.id].toLowerCase().replaceAll('"', '')
                        if (!parseObject[key]) {
                            parseObject[key] = row[settings.rowHeader];
                        } else {
                            console.log(
                                `Duplicate key (${source.id})`,
                                `'${key}'`,
                                "for",
                                `'${row[settings.rowHeader]}'`,
                                "already exists for",
                                `'${parseObject[key]}'`
                            );
                        }
                    } else {
                        console.error(`\n${source.id}'s "${row[settings.rowHeader]}" is undefined\n`)
                    }
                })
            })
            // For any key that ends in '.', remove it (for optional end period on ovid tranlsations)
            // e.g. .ti. === .ti
            Object.keys(parseObject).forEach(key => {
                if (key.slice(-1) === ".") {
                    const newKey = key.slice(0, -1);
                    parseObject[newKey] = parseObject[key];
                }
            })
            // Create alternative keys with & or and
            Object.keys(parseObject).forEach(key => {
                const newKey = key.replaceAll("&", "and");
                parseObject[newKey] = parseObject[key];
            })
            // Sort keys descending to ensure longest is matched first
            const ordered = Object.keys(parseObject).sort().reverse().reduce(
                (obj, key) => { 
                    obj[key] = parseObject[key]; 
                    return obj;
                }, 
                {}
            );
            return ordered;
        })
}