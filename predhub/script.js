window.addEventListener("DOMContentLoaded", (event) => {
  const sheetDataHandler = (sheetData) => {
    console.log("sheet data: ", sheetData);
    console.log("length: ", sheetData.length);
    //ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE
    
    let key = 0;
    let count = 0;

    let data = []

    for(key; key<sheetData.length; key++) {
      nameKey = sheetData[key]["key"];
      name_ = sheetData[key]["name"];
      score_ = sheetData[key]["score"];
      tot_ = sheetData[key]["total preds"];
      avg_ = sheetData[key]["avg score"];
      
      count += 1;
      data.push({name: name_, score: score_, tot: tot_, avg: avg_});
    }

    data.sort((a, b) => a.avg - b.avg);
    data.sort((a, b) => a.score - b.score);
    let rank = 1;
    
    for(count; count>0; count--) {
      // console.log(data[count-1]);
      let table = document.getElementById("table");
      let row = table.insertRow(-1);
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);

      c1.innerHTML = rank;
      c2.innerHTML = data[count-1].name;
      c3.innerHTML = data[count-1].score;
      c4.innerHTML = data[count-1].avg;

      rank += 1;
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
    sheetID: "1a28hEzwn663y6WP19Ix9UNFyE-1NnXLUSRNfKdWBDQg",
    // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
    sheetName: "scores",
    query: "SELECT *",
    callback: sheetDataHandler,
  });
});
