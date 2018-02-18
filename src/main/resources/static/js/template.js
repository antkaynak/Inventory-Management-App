class Template {

    getLoginPage() {
        return ` <section class="login">
        <h1>Company Inventory Management</h1>
        <h3>Please log in</h3>
        <button class="form-control btn" onclick="modalUserLogin()">Login</button>
        <button class="form-control btn btn-primary" onclick="modalUserRegister()">Register</button>
    </section>
    <div class="modal fade" id="user-login-form" tabindex="-1" role="dialog" aria-labelledby="user-login-form" aria-hidden="true">
        <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title custom_align" id="LoginUser"><i class="fa fa-barcode"></i> Login</h4>
                    </div>
                    <div class="modal-body">
                    <div class ="form-group" id="user-login-form-error"></div>
                            <div class="form-group">
                            <input class="form-control " type="text" placeholder="Email" id="log-email">     
                            </div> 
                            <div class="form-group">  
                            <input class="form-control " type="password" placeholder="Password" id="log-pass">
                            </div> 
                        
                    </div>
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-warning btn-lg" style="width: 100%" onclick="userLogin()"><i class="fas fa-check"></i>Login</button>
                    </div>
                </div>
            </div>
    </div>

    <div class="modal fade" id="user-register-form" tabindex="-1" role="dialog" aria-labelledby="user-register-form" aria-hidden="true">
        <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title custom_align" id="RegisterUser"><i class="fa fa-barcode"></i> User Register</h4>
                    </div>
                    <div class="modal-body">
                    <div class ="form-group" id="user-register-form-error"></div>
                            <div class="form-group">
                            <input class="form-control " type="text" placeholder="Email" id="usreg-email">  
                            </div>
                            <div class="form-group">      
                            <input class="form-control " type="password" placeholder="Password" id="usreg-pass">
                            </div>
                            <div class="form-group">
                            <input class="form-control " type="text" placeholder="Name" id="usreg-name">
                            </div>
                    </div>
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-warning btn-lg" style="width: 100%" onclick="userRegister()"><i class="fas fa-check"></i>Register</button>
                    </div>
                </div>
            </div>
    </div>`;
    }

    getHomePage() {
        return `<section class="home">
                    <div class="toolbar">
                    <input class="form-control " type="text" placeholder="Search" id="search-bar" readonly="readonly">
                    <div class="dropdown show search-by">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="#" id="s-all">All</a>
                        <a class="dropdown-item" href="#" id="s-serial">Serial</a>
                        <a class="dropdown-item" href="#" id="s-cat">Category</a>
                        <a class="dropdown-item" href="#" id="s-name">Name</a>
                        <a class="dropdown-item" href="#" id="s-des">Description</a>
                        <a class="dropdown-item" href="#" id="s-st">Stock</a>
                    </div>
                    </div>
                    <button class="form-control btn-warning" onclick="userLogout()">Logout</button>
                    <button class="form-control" onclick="modalRegisterItem()">Create Item</button>
                    </div>
                    <div id="table-div" class="table-responsive">
                        <table class="table table-striped" id="table">
                            <thead>
                            <th onclick="sortTable(0, 'int')">Serial</th>
                            <th onclick="sortTable(1)">Category</th>
                            <th onclick="sortTable(2)">Item Name</th>
                            <th onclick="sortTable(3)">Description</th>
                            <th onclick="sortTable(4, 'int')">Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>

                    </div>
    </section>
    
    <div class="modal fade" id="register-item" tabindex="-1" role="dialog" aria-labelledby="register-item" aria-hidden="true">
    </div>
    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
    </div>
        
`;
    }

    getTableRow(serial, category, itemName, description, stock) {
        return ` <tr id="${serial}">
                                <td>${serial}</td>
                                <td>${category}</td>
                                <td>${itemName}</td>
                                <td>${description}</td>
                                <td>${stock}</td>
                                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-s" data-title="Edit" onclick="displayEdit(${serial})"><i class="far fa-edit"></i></button></p></td>
                                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-s" data-title="Delete" onclick="displayDelete(${serial})"><i class="far fa-trash-alt"></i></button></p></td>
                            </tr>`;
    }

    getTableEmptyRow() {
        return ` <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>END OF DATA</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>`;
    }

    getRegisterItem() {
        return `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title custom_align" id="RegisterItem"><i class="fa fa-barcode"></i> Register Item</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input class="form-control " type="text" placeholder="Category" id="rg-cat">
                        </div>
                        <div class="form-group">
                            <input class="form-control " type="text" placeholder="Name" id="rg-name">
                        </div>
                        <div class="form-group">
                            <input class="form-control " type="text" placeholder="Description" id="rg-des">
                        </div>
                         <div class="form-group">
                            <input class="form-control " type="text" placeholder="Stock" id="rg-st">
                        </div>
                    </div>
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-warning btn-lg" style="width: 100%" onclick="registerItem()"><i class="fas fa-check"></i>Create</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    getEdit(serial, category, itemName, description, stock) {
        return `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title custom_align" id="Edit"><i class="fas fa-barcode"></i> Edit</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input class="form-control " type="text" placeholder="Category" id="edit-cat" value="${category}">
                        </div>
                        <div class="form-group">
                            <input class="form-control " type="text" placeholder="Name" id="edit-name" value="${itemName}">
                        </div>
                        <div class="form-group">
                            <input class="form-control " type="text" placeholder="Description" id="edit-des" value="${description}">
                        </div>
                         <div class="form-group">
                            <input class="form-control " type="text" placeholder="Stock" id="edit-st" value="${stock}">
                        </div>
                    </div>
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-warning btn-lg" style="width: 100%" onclick="editItem(${serial})"><i class="fas fa-check"></i>Update</button>
                    </div>
                </div>
            </div>
        </div>`;
    }


}