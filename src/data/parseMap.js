function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}
// Replace below string when updating with value in data/parseMap.json
export default jsonToMap(`[["[all]","All fields"],[".mp.","Text word"],["[tw]","Text word"],["[ab]","Abstract"],[".ab","Abstract"],["[au]","Author"],[".au.","Author"],["[cois]","Conflict of interest"],[".ci.","Conflict of interest"],["[dp]","Date of publication"],[".dp.","Date of publication"],["[la]","Language"],[".lg.","Language"]]`);
