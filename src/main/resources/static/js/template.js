class Template{

    getLoginPage(){
        return ` <section class="login">
        <h1>Company Inventory Management</h1>
        <h3>Please log in</h3>
        <a href="#" id="deneme" class="btn">Login</a>
    </section>`;
    }

     getHomePage(){
        return `<section class="home">
                    <div class="toolbar">
                    <input class="form-control " type="text" placeholder="Search">
                    <button class="form-control" onclick="modalRegisterItem()">Create Item</button>
                    </div>
                    <div id="table-div" class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <th>Serial</th>
                            <th>Category</th>
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Stock</th>
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

    getTableRow(serial,category,itemName,description,stock){
        return ` <tr id="${serial}">
                                <td>${serial}</td>
                                <td>${category}</td>
                                <td>${itemName}</td>
                                <td>${description}</td>
                                <td>${stock}</td>
                                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-s" data-title="Edit" onclick="displayEdit(${serial})"><i class="far fa-edit"></i></button></p></td>
                                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-s" data-title="Delete"><i class="far fa-trash-alt"></i></button></p></td>
                            </tr>`;
    }

    getRegisterItem(){
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
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>`;
    }

    getEdit(serial, category,itemName,description,stock){
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
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>`;
    }


}