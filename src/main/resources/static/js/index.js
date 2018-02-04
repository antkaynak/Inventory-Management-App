let pagination = 0;
let thread = false;

$(document).ready(function() {

    /*
    scrolldan sonra bilgilerin yuklenmesi
    tablo client side sortlamak category vs header tiklandiginda siralasin
    search bari

     */

    $("[data-toggle=tooltip]").tooltip();

    if(!checkIfLoggedIn()){
        let temp = new Template();
        $('body').append(temp.getLoginPage());
    }else{
        let temp = new Template();
        $('body').append(temp.getHomePage());
        reqTable();
        displayRegisterItem();

            $('#table-div').on('scroll', function() {
                if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 1) {
                    alert('end reached');
                }
            });

    }


});

function checkIfLoggedIn(){
    return true;
}

function displayRegisterItem(){
    let temp = new Template();
    $('#register-item').html(temp.getRegisterItem());
}

function displayEdit(serial){
    let temp = new Template();
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url:'/item/byId?id='+serial,
        statusCode: {
            200: function( e ) {
               $('#edit').html(temp.getEdit(e['id'],e['category'], e['name'],e['description'],e['stock'])).modal();
                modalEdit();

            },
            400: function( e ) {
                console.log("bad request");
            },
            403: function( e ) {
                console.log("forbidden")

            }
        },
        success: function (e) {
            console.log("success"+ e);
        },
        error: function (e) {
            console.log("error");
        }
    });

}

function modalEdit(){
    $('#edit').modal();
}

function modalRegisterItem(){
    $('#register-item').modal();
}

function reqTable(){
    thread = true;
    let temp = new Template();
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url:'/item/all?page='+pagination,
        statusCode: {
            200: function( e ) {
                pagination++;
                for(let i = 0; i< e.length; i++){
                    $('tbody').append(temp.getTableRow(e[i].id,e[i].category,e[i].name,e[i].description,e[i].stock));
                }
            },
            400: function( e ) {
                console.log("bad request");
            },
            403: function( e ) {
                console.log("forbidden")

            }
        },
        error: function (e) {
            console.log("error");
        }
    });
}

function registerItem() {

    let data = {
        "category": $('#rg-cat').val(),
        "name": $('#rg-name').val(),
        "description": $('#rg-des').val(),
        "stock": $('#rg-st').val()
    };

    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url:'/item/register',
        data: JSON.stringify(data),
        statusCode: {
            200: function( e ) {
                console.log("success");
                let temp = new Template();
                $('tbody').append(temp.getTableRow(e.id,e.category,e.name,e.description,e.stock));
                displayRegisterItem(); //you can clear inputs by hand if you want more efficiency
                $('#register-item').modal('hide');
            },
            400: function( e ) {
                alert("400 bad request");
            },
            403: function( e ) {
                alert("403 error")

            }
        },
        error: function () {
           console.log("error");
        }
    });

}

function editItem(serial) {

    let data = {
        "id": serial,
        "category": $('#edit-cat').val(),
        "name": $('#edit-name').val(),
        "description": $('#edit-des').val(),
        "stock": $('#edit-st').val()
    };

    console.log(data);

    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url:'/item/edit',
        data: JSON.stringify(data),
        statusCode: {
            200: function( e ) {
                $('#edit').modal('hide');
                $("#"+e.id+" td:nth-child(2)")[0].innerHTML = e.category;
                $("#"+e.id+" td:nth-child(3)")[0].innerHTML = e.name;
                $("#"+e.id+" td:nth-child(4)")[0].innerHTML = e.description;
                $("#"+e.id+" td:nth-child(5)")[0].innerHTML = e.stock;
            },
            400: function( e ) {
                alert("400 bad request");
            },
            403: function( e ) {
                alert("403 error")

            }
        },
        error: function () {
            console.log("error");
        }
    });

}

function findItemByName(name){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url:'/item/search?keyword='+name,
        statusCode: {
            200: function( e ) {
                console.log(e);
            },
            400: function( e ) {
                console.log("bad request");
            },
            403: function( e ) {
                console.log("forbidden")

            }
        },
        success: function (e) {
            console.log("success"+ e);
        },
        error: function (e) {
            console.log("error");
        }
    });
}
