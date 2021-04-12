import {expect} from 'chai';
import polyglot from '../src';
import xlsx from 'xlsx';

/**
* Testkit settings
* @property {string} sheet ID of the sheet to extract the syntax tests from
* @property {array<string>} omitCols Column headings to ignore when processing the sheet (implies also `rowHeader` as an item)
* @property {string} rowHeader Which column header should be used as the row description / header
* @property {string} driverRow Which row to extract the polyglot drivers from (uses the `rowHeader` to match)
* @property {string} polyglotSources Which columns (using `driverRow`) can be used as polyglot sources
* @property {number} [dataRowStart] Row offset to start reading data from, if falsy is calculated as driverRow+1
*/
var settings = {
	sheet: 'Syntax',
	omitCols: ['Searching type'],
	rowHeader: 'Explanation',
	driverRow: '(Polyglot Driver)',
	polyglotSources: ['pubmed', 'medlineOvid'],
	dataRowStart: 0,
};


/**
* Collection of row sources to use when running a test
* This is calculated from the input data
* @type {array<Object>} Collection of sources extracted from the input data
* @property {string} id The row ID to use to extract data per line
* @property {string} driver The polyglot driver to use per line when testing data
*/
var sources;


/**
* Collection of row targets to use when running a test
* This is calculated from the input data
* @type {array<Object>} Collection of targets extracted from the input data
* @property {string} id The row ID to use to extract data per line
* @property {string} driver The polyglot driver to use per line when targetting data
*/
var targets;


/**
* Function to translate data headers into polyglot drivers
* @param {string} input The XLSX header text
* @returns {string|null} Either a valid polyglot driver or null if none are found
*/
var getPolyglotDriver = input => {
	var found;
	if (found = /^(?<prefix>cinahl|cochrane|embase|psycinfo|pubmed|medlineOvid|wos)/i.exec(input)) { // Use simple prefix
		return found.groups.prefix.toLowerCase();
	} else if (/^web of science/.test(input)) {
		return 'wos';
	} else {
		return null;
	}
};

it('should parse test/data/v4.xlsx', ()=> Promise.resolve()
	.then(()=> xlsx.readFile(`${__dirname}/data/v4.xlsx`))
	.then(workbook => {
		expect(workbook).to.have.nested.property(`Sheets.${settings.sheet}`);
		return xlsx.utils.sheet_to_json(workbook.Sheets[settings.sheet]);
	})
	.then(sheet => { // Extract source / target rows to aim for from the data set

		// Find the secondary driver row of the sheet
		var driverRowIndex = sheet.findIndex(row => row[settings.rowHeader] == settings.driverRow); // Find secondary driver row
		if (driverRowIndex < 0) throw new Error(`Unable to locate driver description row "${settings.driverRow}" in test data`);
		var driverRow = sheet[driverRowIndex];

		// Calculate sources
		sources = Object.keys(sheet[0])
			.filter(header =>
				![...settings.omitCols, settings.rowHeader].includes(header) // Skip omitted columns
				&& settings.polyglotSources.includes(driverRow[header]) // We can use this as source data
			)
			.map(header => ({
				id: header,
				driver: driverRow[header],
			}));

		// Calculate targets
		targets = Object.keys(sheet[0])
			.filter(header => ![...settings.omitCols, settings.rowHeader].includes(header)) // Skip omitted columns
			.map(header => ({
				id: header,
				driver: driverRow[header],
			}));

		// Return sliced data - removing all header areas
		if (!settings.dataRowStart) settings.dataRowStart = driverRowIndex + 1;
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
		describe(row[settings.rowHeader], ()=>
			sources.forEach(source =>
				targets
					.filter(target =>
						source.id != target.id // Skip 1:1 translations
						&& row[source.id] // Has a source value
						&& row[target.id] // Has a target value
					)
					.forEach(target =>
						it(`${row[settings.rowHeader]}: ${source.id} -> ${target.id}`, ()=>
							expect(polyglot.translate(row[source.id], target.driver))
								.to.equal(row[target.id], `Row: ${rowIndex+settings.dataRowStart+1}`)
						)
					)
			)
		)
	))
)
