import xlsx from 'xlsx';

try {
  const workbook = xlsx.readFile('(급여공제)사내동호회_260608.xlsx');
  console.log("Sheet names:", workbook.SheetNames);

  for (const sheetName of workbook.SheetNames) {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const validRows = data.slice(4).filter(row => row[2]);
    console.log(`Rows with 사번: ${validRows.length}`);
    if (validRows.length > 0) {
      console.log("First 3 valid rows:", validRows.slice(0, 3));
    }
  }
} catch (e) {
  console.error("Error reading file:", e);
}
