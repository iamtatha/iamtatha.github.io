window.addEventListener("DOMContentLoaded", (event) => {
  const sheetDataHandler = (sheetData) => {
    console.log("sheet data: ", sheetData);
    console.log("length: ", sheetData.length);
    //ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE
    let table = document.getElementById("table");
    let row = table.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    let c6 = row.insertCell(5);
    let c7 = row.insertCell(6);
    let c8 = row.insertCell(7);
    let c9 = row.insertCell(8);
    let c10 = row.insertCell(9);
    
    let key = 0;

    c1.innerHTML = sheetData[key]["Sl. No."];
    c2.innerHTML = sheetData[key]["Name"];
    c3.innerHTML = sheetData[key]["Email"];
    c4.innerHTML = sheetData[key]["Contact"];
    c5.innerHTML = sheetData[key]["Service"];
    c6.innerHTML = sheetData[key]["Book Date"];
    c7.innerHTML = sheetData[key]["Book Time"];
    c8.innerHTML = sheetData[key]["Query"];
    c9.innerHTML = sheetData[key]["Rating"];
    c10.innerHTML = sheetData[key]["Testimonial"];
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
    sheetID: "1NHXYOMPWGGtlThwFYYW0aQdu_-gxozAsTzuDK8zOIlg",
    // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
    sheetName: "test",
    query: "SELECT * WHERE E = 'GATE Guidance'",
    callback: sheetDataHandler,
  });
});
