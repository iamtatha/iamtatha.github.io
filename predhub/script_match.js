window.addEventListener("DOMContentLoaded", (event) => {
  const sheetDataHandler = (sheetData) => {
    console.log("sheet data: ", sheetData);
    console.log("length: ", sheetData.length);
    //ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE
    let table = document.getElementById("euro");
    let key = 0;

    for(key; key<sheetData.length; key++) {
        let row = table.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        

        c1.innerHTML = sheetData[key]["Match Number"];
        c2.innerHTML = sheetData[key]["Date"];
        c3.innerHTML = sheetData[key]["Home Team"];
        c4.innerHTML = sheetData[key]["Away Team"];
    }

    let table2 = document.getElementById("copa");
    let key2 = 0;

    for(key2; key2<sheetData.length; key2++) {
        let row = table2.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        

        c1.innerHTML = sheetData[key2]["Match copa"];
        c2.innerHTML = sheetData[key2]["Date copa"];
        c3.innerHTML = sheetData[key2]["Home Team copa"];
        c4.innerHTML = sheetData[key2]["Away Team copa"];
    }
  };

  // --==== QUERY EXAMPLES ====--
  // --==== USE LETTERS FOR COLUMN NAMES ====--
  //  'SELECT A,C,D WHERE D > 150'
  //  'SELECT * WHERE B = "Potato"'
  //  'SELECT * WHERE A contains "Jo"'
  //  'SELECT * WHERE C = "active" AND B contains "Jo"'
  //  "SELECT * WHERE E > date '2022-07-9' ORDER BY E DESC"

  getSheetData({
    // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
    sheetID: "1WA2m2UpVj1Ois9ESeRp5YYhwyvfvQ0RUMmIgRAMtKxg",
    // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
    sheetName: "EURO2024",
    query: "SELECT *",
    callback: sheetDataHandler,
  });
});
