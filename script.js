var a;

function handleFileUpload() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      a= contents;
      displayDownloadedData(contents);
    };
    reader.readAsText(file);
  }
}

// Обновление содержимого таблицы
function updateTableData() {
  // получение данных для таблицы (например, из глобальной переменной)
  var tableData = a;

  // обновление таблицы на табах 'download', 'edit' и других
  var tabs = ['download', 'edit', /* добавьте другие табы, на которых должна быть отображена таблица */];
  for (var i = 0; i < tabs.length; i++) {
      var tabName = tabs[i];
      var tabContent = document.getElementById(tabName);
      var table = tabContent.querySelector('table');

      // обновление содержимого таблицы
      // ... код для обновления таблицы ...
      table.innerHTML = '';
      tableData.forEach(function(rowData) {
          var row = document.createElement('tr');
          rowData.forEach(function(cellData) {
              var cell = document.createElement('td');
              cell.textContent = cellData;
              row.appendChild(cell);
          });
          table.appendChild(row);
      });
  }
}

function displayDownloadedData(data) {
  data=a;
  var table = document.getElementById("downloadTable");
  table.innerHTML = "";
  var rows = data.split("\n");
  for (var i = 0; i < rows.length-1; i++) {
    var rowData = rows[i].split(";");
    var row = table.insertRow(-1);
    for (var j = 0; j < rowData.length; j++) {
      var cell = row.insertCell(-1);
      cell.innerHTML = rowData[j];
    }
  }
}

function displayTable(tableData) {
  var table = document.getElementById("downloadTable");
  
  // Очистка таблицы перед выводом новых данных
  table.innerHTML = "";
  
  // Заполняем таблицу данными
  for (var i = 0; i < tableData.length; i++) {
    var row = table.insertRow(-1);
    
    for (var j = 0; j < tableData[i].length; j++) {
      var cell = row.insertCell(j);
      cell.innerHTML = tableData[i][j];
    }
  }
}

function hidetable(){
  document.getElementById('downloadTable').style.display = 'none';
}

function showtable(){
  document.getElementById('downloadTable').style.display = 'block';
}

function deleterow(){
  var table = document.getElementById("downloadTable");
  var rows = table.getElementsByTagName("tr");
  
  for (var i = 0; i < rows.length; i++) {
   var cells = rows[i].getElementsByTagName("td");
   var isEmpty = true;
  
   for (var j = 0; j < cells.length; j++) {
      if (cells[j].innerText.trim() !== "") {
        isEmpty = false;
        break;
      }
   }
  
   if (isEmpty) {
      table.deleteRow(i);
      i--;
   }
  }
}

function deleteCell() {
  var table = document.getElementById("downloadTable");
  var rowCount = table.rows.length;
  for (var i = 0; i < rowCount; i++) {
     var row = table.rows[i];
     var cellCount = row.cells.length;
     for (var j = 0; j < cellCount; j++) {
       var cell = row.cells[j];
       if (cell.innerHTML == "") {
         table.deleteRow(i);
         table.deleteCell(j);
         return;
       }
     }
  }
 }

function deletecell(){
  var table = document.getElementById("downloadTable");
  var cell = table.getElementsByTagName("td");
  
  for (var i = 0; i < cells.length; i++) {
   var rows = cells[i].getElementsByTagName("tr");
   var isEmpty = true;
  
   for (var j = 0; j < rows.length; j++) {
      if (rows[j].innerText.trim() !== "") {
        isEmpty = false;
        break;
      }
   }
  
   if (isEmpty) {
     
    
   }
  }
}

function editTD() {
  var table = document.getElementById("downloadTable");
  var tds = table.getElementsByTagName("td");
 
  for (var i = 0; i < tds.length; i++) {
     tds[i].onclick = function() {
       var cell = this;
       var text = cell.textContent || cell.innerText;
       var input = document.createElement("input");
       input.type = "text";
       input.value = text;
       cell.innerHTML = "";
       cell.appendChild(input);
       input.focus();
       input.select();
       input.onblur = function() {
         var newText = this.value;
         cell.textContent = newText;
       }
     }
  }
 }
 
 function addTableData() {

  var table = document.getElementById("downloadTable");
  var row = table.insertRow();
  for (var i = 0; i < table.rows[0].cells.length; i++) {
     var cell = row.insertCell();
     cell.textContent = " ";
  }
  editTD();
 }
 
 function addcells() {

  var table = document.getElementById("downloadTable");
  var cellCount = table.rows.length;
  for (var i = 0; i < cellCount; i++) {
       var row = table.rows[i];
       var cell = row.insertCell();
       cell.textContent = " ";
  }
  editTD();
 }
 
 function createtable(){
  var table = document.getElementById("downloadTable");
  table.innerHTML = "";
  const row = table.insertRow();
 const cell = row.insertCell();
 cell.textContent = " ";
 return cell;
 }

 function average(k) {
  var table = document.getElementById("downloadTable");
  var sum = 0;
  var count = 0;
 
  for (var i = 1; i < table.rows.length; i++) {
     var row = table.rows[i];
     var cell = row.cells[k]; 
 
     // проверка на пустоту ячейки и наличие в ней числа
     if (cell && !isNaN(parseInt(cell.innerText))) { 
       sum += parseInt(cell.innerText);
       count++;
     }
  }
 
  var average = sum / count;
  return average;
 }
 
 function sred(N){
  var table = document.getElementById("downloadTable");
  var cells = table.getElementsByTagName("td");
  var row = table.insertRow(-1); // вставить новую строку в конец таблицы
  for (var i = 0; i < table.rows[0].cells.length-1; i++) {
    var cell = row.insertCell(-1); // вставить новую ячейку в конец строки
    if (i < N){
      cell.textContent = " ";
    }
    else{
      cell.textContent = average(i).toFixed(2).toString();
    }
  }
 }

 function average2(i) {
  var table = document.getElementById("downloadTable");
  var row = table.rows[i];
  var sum = 0;
  var count = 0;
  
  for (var j = 2; j < row.cells.length-1; j++) {
      var cell = row.cells[j]; 
  
      // проверка на пустоту ячейки и наличие в ней числа
      if (cell && !isNaN(parseInt(cell.innerText))) { 
        sum += parseInt(cell.innerText);
        count++;
      }
  }
  
  var average2 = sum / count;
  return average2;
  }
  
  function sred2(N){
  var table = document.getElementById("downloadTable");
  var rows = table.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var row = table.rows[i];
    var cell = row.insertCell();
       if (i < N){
         cell.textContent = " ";
       }
       else{
         cell.textContent = average2(i).toFixed(2).toString();
       }
     }
  }

  function countObjects(searchValue) {
    let table = document.getElementById("downloadTable");
    let rows = table.getElementsByTagName('tr');
    let count = 0;
    let c=0;
    for (let i = 0; i < rows.length-1; i++) {
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length-1; j++) {
            if (cells[j].innerHTML == searchValue) {
                count++;
            }
        }
        if (count > 0){
          c++;
          count=0;
        }
    }
    return c;
}

function kolvo(){
 let table = document.getElementById("stat2");
 var rows = table.getElementsByTagName("tr");
 var cells = rows[1].getElementsByTagName("td");
 for (var i = 1; i < table.rows[0].cells.length; i++) {
    cells[i].textContent = countObjects(6-i).toString();
 }
}

function xyunya(){
  let table2 = document.getElementById("downloadTable");
  let table = document.getElementById("stat2");
  var rows = table.getElementsByTagName("tr");
  var cells = rows[2].getElementsByTagName("td");
 for (var i = 1; i < table.rows[0].cells.length; i++) {
    cells[i].textContent = (((countObjects(6-i)))/(table2.rows.length-2)*100).toFixed(2).toString();
 }
}

function grafic(){
 // Получение данных из таблицы
 var data = [];
 var table = document.getElementById('downloadTable');
 var headers = [];
 for (var i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerHTML;
 }
 data.push(headers);
 for (var i = 1; i < table.rows.length; i++) {
    var tableRow = table.rows[i];
    var row = [];
    for (var j = 0; j < tableRow.cells.length; j++) {
      row.push(tableRow.cells[j].innerHTML);
    }
    data.push(row);
 }

 // Отображение диаграммы
 google.charts.load('current', {'packages':['corechart']});
 google.charts.setOnLoadCallback(drawChart);
 function drawChart() {
    var dataTable = google.visualization.arrayToDataTable(data);
    var chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(dataTable);
 }

}
function removeAllColumns() {
  var table = document.getElementById("downloadTable");
  var rows = table.getElementsByTagName("tr");
  
  // delete all columns except the first and last
  for (var i = rows.length - 1; i > -1; i--) {
      var cells = rows[i].getElementsByTagName("td");
      for (var j = cells.length - 2; j > 0; j--) {
          cells[j].parentNode.removeChild(cells[j]);
      }
  }
  table.deleteRow(rows.length-1);
  }