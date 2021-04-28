import {expect} from 'chai';
import polyglot from '../src';
import xlsx from 'xlsx';

/**
* Testkit settings
* @property {string} sheet ID of the sheet to extract the syntax tests from
* @property {array<string>} omitCols Column headings to ignore when processing the sheet (implies also `rowHeader` as an item)
* @property {string} rowHeader Which column header should be used as the row description / header
* @property {string} polyglotSources Which columns (using `driverRow`) can be used as polyglot sources
* @property {number} [dataRowStart] Row offset to start reading data from, if falsy is calculated as driverRow+1
*/
var settings = {
	sheets: ['fieldCodes', 'mesh', 'meshTranslations', 'searchCommands', 'testCases'],
	omitCols: ['PubMed abbreviation 2', 'Ovid MEDLINE 2'],
	rowHeader: 'Explanation',
	polyglotSources: ['PubMed abbreviation', 'Ovid MEDLINE'],
	dataRowStart: 0,
};


/**
* Collection of row sources to use when running a test
* This is calculated from the input data
* @type {array<Object>} Collection of sources extracted from the input data
* @property {string} id The row ID to use to extract data per line
*/
var sources;


/**
* Collection of row targets to use when running a test
* This is calculated from the input data
* @type {array<Object>} Collection of targets extracted from the input data
* @property {string} id The row ID to use to extract data per line
*/
var targets;

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

it('should parse data/v4.xlsx', ()=> Promise.resolve()
	.then(()=> xlsx.readFile(`${__dirname}/../data/v4.xlsx`))
	.then(workbook => {
		return settings.sheets.map(sheet => {
			expect(workbook).to.have.nested.property(`Sheets.${sheet}`);
			return sheetToArr(workbook.Sheets[sheet]);
		}).flat()
	})
	.then(sheet => { // Extract source / target rows to aim for from the data set

		// Calculate sources
		sources = Object.keys(sheet[0])
			.filter(header =>
				![...settings.omitCols, settings.rowHeader].includes(header) // Skip omitted columns
				&& settings.polyglotSources.includes(header) // We can use this as source data
			)
			.map(header => ({
				id: header,
			}));

		// Calculate targets
		targets = Object.keys(sheet[0])
			.filter(header => ![...settings.omitCols, settings.rowHeader].includes(header)) // Skip omitted columns
			.map(header => ({
				id: header,
			}));

		// Return sliced data - removing all header areas
		if (!settings.dataRowStart) settings.dataRowStart = 1;
		return sheet.slice(settings.dataRowStart); // Remove
	})
	.then(sheet => { // Last sanity checks before starting the test cycle
		expect(sources).to.be.an('array');
		expect(sources).to.have.length.above(1);

		expect(targets).to.be.an('array');
		expect(targets).to.have.length.above(1);

		return sheet;
	})
	.then(sheet => sheet.forEach((row, rowIndex) =>
		describe(row[settings.rowHeader].w, ()=>
			sources.forEach(source =>
				targets
					.filter(target =>
						source.id != target.id // Skip 1:1 translations
						&& row[source.id] // Has a source value
						&& row[target.id] // Has a target value
					)
					.forEach(target => {
						if(!row[source.id].c) { // If no comment on source translation (i.e. is not a duplicate key)
							it(`${row[settings.rowHeader].w}: ${source.id} -> ${target.id}`, () => 
								expect(polyglot.translateGeneric(row[source.id].w, target.id))
									.to.equal(row[target.id].w, `Row: ${rowIndex+settings.dataRowStart+1}`)
							)
						}
					})
			)
		)
	))
)
