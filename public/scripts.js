$(document).ready(function() {
  $('#btn-guardar').click(function() {
    addItem();
  })
});

function loadData() {
  var row = "";
  $("#table-data").append("");
  $.get('/api/findAll', function(data) {
    row = '<tr>';
    for (var i = 0; i < data.length; i++) {
      row += '<td>' + data[i].id + '</td><td>' + data[i].name + '</td><td>' + data[i].note + '</td><td>' + data[i].updated_at +
      '</td><td>' + '<input type="checkbox" id="'+ data[i].id + '" name="check ' + data[i].id + '" value="' + data[i].id + '" ' + isChecked(data[i].completed) + ' onclick="setChecked(' + data[i].id + ', ' + data[i].completed + ')">'
       + '</td><td>' + '<a href="javascript:deleteItem('+ data[i].id +');" id="' + data[i].id + '">Eliminar</a></td></tr>'
    }
    row += '</table>';
    $('#table-data').html(row);
  });
}

function setChecked(id, condition) {
  var identificador = Number(id);
  var stateChange = condition;
  // console.log(stateChange);
  $.ajax({
    type: "POST",
    url: "/api/updateItem",
    data: {id: identificador, state: stateChange},
    success: function(data) {
      console.log("updated");
      loadData();
    }
  });
}

function isChecked(state) {
  if(state == true)
    return "checked";
}

function addItem() {
  var nombre = $('#input-nombre').val();
  var content = $('#input-desc').val();
  $.ajax({
    type: "POST",
    url: "/api/addItem",
    data: {name: nombre, note: content},
    success: function(data) {
      loadData();
      $('#input-nombre').val("");
      $('#input-desc').val("");
    }
  });
}

function deleteItem(identificador) {
  $.ajax({
    type: "POST",
    url: "/api/removeItem",
    data: {id: identificador},
    success: function() {
      console.log("deleted");
      loadData();
    }
  });
}

window.onload = loadData();
