private exportToExcel(data: any[], name = 'template') {
    const workbook = new this.exceljs.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');
    // Add headers
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    // Add data
    data.forEach((item) => {
      const row: any = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });
    let rowIndex = 1;
    for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = {
        vertical: 'top',
        horizontal: 'left',
        wrapText: true,
      };
    }
    let columns = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ];
    for (let i = 0; i < columns.length; i++) {
      worksheet.getColumn(columns[i]).width = 30;
      //refactor
      if (!headers[i]?.includes('AMOUNT')) {
        worksheet.getColumn(columns[i]).numFmt = '@';
      }
    }
    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      import('file-saver').then(file_saver => {
        // @ts-ignore
          file_saver.default(blob, `${name}.xlsx`);
      });
    });
  }