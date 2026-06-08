import xlsx from 'xlsx';

const workbook = xlsx.readFile('인원명부260608.XLSX');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

console.log(data.slice(0, 5));
