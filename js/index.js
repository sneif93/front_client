$(document).ready(function() {
   
    
   
    getClients();
    getIdTypes();
    getDepartments();
} );

function getClients(){
    console.log('client');
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/api/clients',
        dataType: 'json',
        success: function (response) {
            
            if (response.success) {
                console.log(response);
                $.each(response.data, function (i, item) {
                    $('#table-body').append('<tr>\n\
                        <th scope="row">' + item.id + '</th>\n\
                        <td>' + item.first_name +' '+ item.last_name +'</td>\n\
                        <td>' + item.first_surname +' '+ item.last_surname +'</td>\n\
                        <td>' + item.name_id_types + '</td>\n\
                        <td>' + item.document + '</td>\n\
                        <td>' + item.address + '</td>\n\
                        <td>' + item.phone + '</td>\n\
                        <td>' + item.email + '</td>\n\
                        <td>' + item.employment + '</td>\n\
                        <td>' + item.name_city + '</td>\n\
                        <td><a class="btn btn_ch_normal btn-sm" href="javascript: alertUpdateClient(' + item.id + ')" role="button">Editar</a>\n\
                        <a class="btn btn_ch_normal btn-sm" href="javascript: deleteForm(' + item.id + ')" role="button">borrar</a></td>\n\
                        </tr>');
                });
                
            } else {
               
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    }).done(function( data ) {
        $('#example').DataTable( {
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        } );
      });
}

function getIdTypes(){
    console.log('client');
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/api/idTypes',
        dataType: 'json',
        success: function (response) {
            
            if (response.success) {
                console.log(response);
                $.each(response.data, function (i, item) {
                    $('#typeSelect').append('<option value="'+item.id+'">' + item.name   +'</option>');
                });
                
            } else {
               
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    }).done(function( data ) {
       
      });
}

function getDepartments(){
    console.log('client');
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/api/departments',
        dataType: 'json',
        success: function (response) {
            
            if (response.success) {
                console.log(response);
                $.each(response.data, function (i, item) {
                    $('#departmentSelect').append('<option value="'+item.id+'">' + item.name   +'</option>');
                });
                
            } else {
               
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    }).done(function( data ) {
       getCities();
      });
}

function getCities(){
    var id_department = $('#departmentSelect').val();
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/api/citiesByDepartment?id_department='+id_department,
        dataType: 'json',
        success: function (response) {
            
            if (response.success) {
                console.log(response);
                $.each(response.data, function (i, item) {
                    $('#citySelect').html('');
                    $('#citySelect').append('<option value="'+item.id+'">' + item.name   +'</option>');
                });
                
            } else {
               
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    }).done(function( data ) {
       
      });
}

function getClient(id){
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/api/client?id='+id,
        dataType: 'json',
        success: function (response) {
            
            if (response.success) {
                $('#departmentSelect').val(response.data.id_department);
                getCities()
                $('#documentInput').val(response.data.document);
                $('#nameInput').val(response.data.first_name);
                $('#lastNameInput').val(response.data.last_name);
                $('#surnameInput').val(response.data.first_surname);
                $('#lastSurnameInput').val(response.data.last_surname);
                $('#typeSelect').val(response.data.id_type);
                $('#addressInput').val(response.data.address);
                $('#phoneInput').val(response.data.phone);
                $('#emailInput').val(response.data.email);
                $('#employmentInput').val(response.data.employment);
                $('#citySelect').val(response.data.id_city);
                
                
                
            } else {
               
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    }).done(function( response) {
        if (response.success) {
          
        }
      });
}

function saveForm(){

    var json = {
        "first_name":$('#nameInput').val(),
        "last_name":$('#lastNameInput').val(),
        "first_surname":$('#surnameInput').val(),
        "last_surname":$('#lastSurnameInput').val(),
        "id_type":$('#typeSelect').val(),
        "document":$('#documentInput').val(),
        "address":$('#addressInput').val(),
        "phone":$('#phoneInput').val(),
        "email":$('#emailInput').val(),
        "employment": $('#employmentInput').val(),
        "id_city":$('#citySelect').val()
    }
    console.log(json);
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/api/client',
        data: json,
        dataType: "json",
        success: function (response) {
            if (response.success) {
                alert(response.message);
                window.location.reload();
            }else{
                validFormResponse(response.message);
            } 
        }
        
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    });



}


function updateForm(id){

    var json = {
        "id":id,
        "first_name":$('#nameInput').val(),
        "last_name":$('#lastNameInput').val(),
        "first_surname":$('#surnameInput').val(),
        "last_surname":$('#lastSurnameInput').val(),
        "id_type":$('#typeSelect').val(),
        "document":$('#documentInput').val(),
        "address":$('#addressInput').val(),
        "phone":$('#phoneInput').val(),
        "email":$('#emailInput').val(),
        "employment": $('#employmentInput').val(),
        "id_city":$('#citySelect').val()
    }
    console.log(json);
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/api/updateClient',
        data: json,
        dataType: "json",
        success: function (response) {
            if (response.success) {
                alert(response.message);
                window.location.reload();
            }else{
                validFormResponse(response.message);
            } 
        }
        
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    });



}

function deleteForm(id){

    var json = {
        "id":id,
    }
    console.log(json);
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/api/deleteClient',
        data: json,
        dataType: "json",
        success: function (response) {
            if (response.success) {
                alert(response.message);
                window.location.reload();
            }else{
                validFormResponse(response.message);
            } 
        }
        
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert( jqXHR + " " + textStatus + " " + errorThrown  );
    });



}



function validFormResponse(data){
    $("#response").html('');
    array = Object.values(data);
    $("#response").append('<div class="alert alert-danger col-12" role="alert" id="formDanger"></div>');
    array.forEach(element => {
        console.log(element);
        $("#formDanger").append('<div class="col-12"><p>'+element[0]+'</p></div>');
    });

}





function alertSaveClient(){
    //alert("ok");
   
    getDepartments();
    $('#modalSaveForm').modal('show');
    $('#modal-btn').html('');
    $('#modal-btn').append('<a class="btn btn-primary" href="javascript: saveForm();">Save changes</a>');
    $('#modal-btn').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');

}

function alertUpdateClient(id){
    getClient(id);
    $('#modalSaveForm').modal('show');
    $('#modal-btn').html('');
    $('#modal-btn').append('<a class="btn btn-primary" href="javascript: updateForm('+id+');">Update changes</a>');
    $('#modal-btn').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');

}

