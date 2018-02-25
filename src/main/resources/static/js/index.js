let pagination = 0;
let thread = false;
let searchBy = 'all';

$(document).ready(function () {
    if (!checkIfLoggedIn() || !validateToken(Cookies.get('Authorization'))) {
        let temp = new Template();
        $('body').append(temp.getLoginPage());
    } else {
        let temp = new Template();
        $('body').append(temp.getHomePage());
        reqTable(searchBy, "", pagination, Cookies.get('Authorization'));
        displayRegisterItem();
        initializeSearchBar();
        $('#table-div').on('scroll', function () {
            if (($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 1) && !thread) {
                let t = $('#search-bar')[0].value;
                reqTable(searchBy, t, pagination, Cookies.get('Authorization'));
            }
        });

        let threadSearchBar = null;

        function findSearchBar(t) {
            if (!t.trim()) {
                return;
            }
            $('tbody')[0].innerHTML = '';
            reqTable(searchBy, t, 0, Cookies.get('Authorization'));
        }

        $('#search-bar').keyup(function () {
            clearTimeout(threadSearchBar);
            let $this = $(this);
            threadSearchBar = setTimeout(function () {
                findSearchBar($this.val())
            }, 1000);
        });
    }
});

function utilizeSearchBar(obj, search, btnInner) {
    let dropdownMenuLink = $('#dropdownMenuLink')[0];
    let searchBar = $('#search-bar')[0];
    obj.on('click', function () {
        thread = true;
        searchBy = search;
        dropdownMenuLink.innerHTML = btnInner;
        $('tbody')[0].innerHTML = '';
        pagination = 0;
        searchBar.value = '';
        searchBar.readOnly = false;
        setTimeout(function () {
            thread = false;
        }, 1000);
    });
}

function utilizeSearchBarAll(obj, search, btnInner) {
    let dropdownMenuLink = $('#dropdownMenuLink')[0];
    let searchBar = $('#search-bar')[0];
    dropdownMenuLink.innerHTML = 'All';
    obj.on('click', function () {
        searchBy = search;
        dropdownMenuLink.innerHTML = btnInner;
        $('tbody')[0].innerHTML = '';
        pagination = 0;
        searchBar.value = '';
        searchBar.readOnly = true;
        thread = false;
        reqTable(searchBy, "", pagination, Cookies.get('Authorization'));
    });
}

function initializeSearchBar() {
    utilizeSearchBarAll($('#s-all'), 'all', 'All');
    utilizeSearchBar($('#s-serial'), 'serial', 'Serial');
    utilizeSearchBar($('#s-cat'), 'category', 'Category');
    utilizeSearchBar($('#s-name'), 'name', 'Name');
    utilizeSearchBar($('#s-des'), 'description', 'Description');
    utilizeSearchBar($('#s-st'), 'stock', 'Stock');
}

function checkIfLoggedIn() {
    let loginStorage = localStorage.getItem('ls.token');
    let loginStorageTokenObj = JSON.parse(localStorage.getItem("ls.token"));
    if (loginStorageTokenObj === null) return false;
    let loginStorageToken = loginStorageTokenObj.access_token;
    let access_token = Cookies.get("Authorization");
    return !(loginStorage === null || loginStorage === undefined || loginStorageToken !== access_token);
}


function validateToken(access_token) {
    return $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url: '/validate?access_token=' + access_token,
        //async: false
    }).then(result => JSON.parse(result))
        .then(result => result.statusText === 'success');
    //return result.statusText === 'success';
}

function displayRegisterItem() {
    let temp = new Template();
    $('#register-item').html(temp.getRegisterItem());
}

function displayEdit(serial) {
    if (!checkIfLoggedIn()) {
        alert("Authorization error. Please login");
        userLogout();
        return;
    }
    let temp = new Template();
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url: '/item/byId?id=' + serial + '&access_token=' + Cookies.get('Authorization'),
        statusCode: {
            200: function (e) {
                $('#edit').html(temp.getEdit(e['id'], e['category'], e['name'], e['description'], e['stock'])).modal();
                modalEdit();

            },
            400: function (e) {
                console.log("bad request");
            },
            403: function (e) {
                console.log("forbidden")

            }
        },
        success: function (e) {
            console.log("success" + e);
        },
        error: function (e) {
            console.log("error");
        }
    });

}

function displayDelete(serial) {
    if (confirm('(ID: ' + serial + ') Are you sure you want to delete this item?')) {
        deleteItem(serial);
    }
}

function modalEdit() {
    $('#edit').modal();
}

function modalRegisterItem() {
    $('#register-item').modal();
}

function modalUserLogin() {
    $('#user-login-form').modal();
}

function modalUserRegister() {
    $('#user-register-form').modal();
}

function reqTable(searchBy, keyword, page, token) {
    thread = true;
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url: '/item/search?by=' + searchBy + '&keyword=' + keyword + '&page=' + page + '&access_token=' + token,
        statusCode: {
            200: function (e) {
                pagination++;
                let temp = new Template();
                if (e.length === 0) {
                    $('tbody').append(temp.getTableEmptyRow());
                    return;
                }
                for (let i = 0; i < e.length; i++) {
                    $('tbody').append(temp.getTableRow(e[i].id, e[i].category, e[i].name, e[i].description, e[i].stock));
                }
                thread = false;
            },
            401: function (e) {
                userLogout();
            },
            400: function (e) {
                console.log("bad request");
            },
            403: function (e) {
                console.log("forbidden")

            }
        },
        error: function (e) {
            console.log("error -> " + searchBy + " + " + keyword + " + " + pagination);
        }
    });

}

function registerItem() {
    if (!checkIfLoggedIn()) {
        alert("Authorization error. Please login");
        userLogout();
        return;
    }
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
        url: '/item/register?access_token=' + Cookies.get('Authorization'),
        data: JSON.stringify(data),
        statusCode: {
            200: function (e) {
                console.log("success");
                let temp = new Template();
                $('tbody').append(temp.getTableRow(e.id, e.category, e.name, e.description, e.stock));
                displayRegisterItem(); //you can clear inputs by hand if you want more efficiency
                $('#register-item').modal('hide');
            },
            401: function (e) {
                userLogout();
            },
            400: function (e) {
                alert("400 bad request");
            },
            403: function (e) {
                alert("403 error")

            }
        },
        error: function () {
            console.log("error");
        }
    });

}

function editItem(serial) {

    if (!checkIfLoggedIn()) {
        alert("Authorization error. Please login");
        userLogout();
        return;
    }

    let data = {
        "id": serial,
        "category": $('#edit-cat').val(),
        "name": $('#edit-name').val(),
        "description": $('#edit-des').val(),
        "stock": $('#edit-st').val()
    };


    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url: '/item/edit?access_token=' + Cookies.get('Authorization'),
        data: JSON.stringify(data),
        statusCode: {
            200: function (e) {
                $('#edit').modal('hide');
                $("#" + e.id + " td:nth-child(2)")[0].innerHTML = e.category;
                $("#" + e.id + " td:nth-child(3)")[0].innerHTML = e.name;
                $("#" + e.id + " td:nth-child(4)")[0].innerHTML = e.description;
                $("#" + e.id + " td:nth-child(5)")[0].innerHTML = e.stock;
            },
            400: function (e) {
                alert("400 bad request");
            },
            401: function (e) {
                userLogout();
            },
            403: function (e) {
                alert("403 error")

            }
        },
        error: function () {
            console.log("error");
        }
    });

}

function deleteItem(serial) {
    if (!checkIfLoggedIn()) {
        alert("Authorization error. Please login");
        userLogout();
        return;
    }
    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url: '/item/delete?id=' + serial + '&access_token=' + Cookies.get('Authorization'),
        statusCode: {
            200: function (e) {
                $('#' + serial).remove();
            },
            400: function (e) {
                alert("400 bad request");
            },
            401: function (e) {
                userLogout();
            },
            403: function (e) {
                alert("403 error")

            }
        },
        error: function () {
            console.log("error");
        }
    });
}

function userLogin() {
    $.ajax({
        type: 'POST',
        url: 'oauth/token',
        data: {
            'client_id': 'XXXXX',
            'client_secret': 'YYYYYY',
            'grant_type': 'password',
            'username': $('#log-email').val(),
            'password': $('#log-pass').val(),
            'scope': 'read write'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("XXXXX" + ':' + "YYYYYY"))
        },
        statusCode: {
            400: function (e) {
                let displayError = $('#user-login-form-error');
                displayError.html('');
                displayError.append(`<div class="alert-danger">Bad Credentials! Please try again.</div>`);
            }
        },
        success: function (response) {
            let expiredAt = new Date();
            expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
            response.expires_at = expiredAt.getTime();
            localStorage.setItem('ls.token', JSON.stringify(response));
            Cookies.set("Authorization", JSON.parse(localStorage.getItem("ls.token")).access_token);
            window.location.reload(true);
        }
    });
}

function userLogout() {
    localStorage.removeItem('ls.token');
    Cookies.remove('Authorization');
    window.location.reload(true);
}

function userRegister() {
    let data = {
        "email": $('#usreg-email').val(),
        "password": $('#usreg-pass').val(),
        "name": $('#usreg-name').val()
    };

    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        contentType: 'application/json; charset=utf-8',
        url: '/register',
        data: JSON.stringify(data),
        statusCode: {
            200: function (e) {
                $('#user-register-form').modal('hide');
                modalUserLogin();
            },
            400: function (e) {
                let displayError = $('#user-register-form-error');
                displayError.html('');
                for (let i = 0; i < e.responseJSON.length; i++) {
                    displayError.append(`<div class="alert-danger">${e.responseJSON[i]}</div>`);
                }

            },
            403: function (e) {
                let displayError = $('#user-register-form-error');
                displayError.html('');
                displayError.append(`<div class="alert-danger">${e.responseText}</div>`);
            }
        },
        error: function () {
            console.log("error");
        }
    });

}

function sortTable(n, type) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (type === 'int') {
                if (dir === "asc") {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchCount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
