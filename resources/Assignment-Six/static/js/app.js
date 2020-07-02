class UI{
      
  


}
class Expenses{
    datatable;
    constructor(category, buyingdate, amount, id){
        this.id = id
        this.category = category
        this.buyingdate = buyingdate
        this.amount=amount
    }

 
    static initializeCategory(){
      let formData = new FormData();
      formData.append('section', 'categorylist');
      fetch('api/index.php', {
        method: 'POST',
        body: formData
      }).then(function (response) {
          response.text().then(function (responseText) {
            responseText = JSON.parse(responseText);
            let html
            if(responseText.data==='no data'){
              html="<option selected>There's no categories yet, add one in category board</option>"
            }
            else{
              html="<option value='0' selected>Choose a category</option>"
              for(let i=0; i<responseText.length;i++){
                html+="<option value='"+responseText[i].id+"'>"+responseText[i].category+"</option>"
              }
            }
              $('#categoryedit').html(html);
              $('#category').html(html);
              $('#categoryEditBoardSelect').html(html);
              $('#categoryDeleteBoardSelect').html(html);
              
          });
      });
    }
    static initialize(){

        this.datatable = $('#myTable').DataTable( {
            "ajax": {
                "url": "api/index.php",
                "type":'post',
                "data": {
                    "section": 'listexpenses'
                }},
            "columns": [
                { "data": "id" },
                { "data": "category" },
                { "data": "amount" },
                { "data": "buyingdate" },
                { "data": function(row){
                    return "<button class='btn d-inline btn-danger delete' id='"+row.id+"'> <i class='edit fas fa-trash'></i></button><div class='modal-footer justify-content-center d-inline'><button data-toggle='modal' data-target='#editform' data-id='"+row.id+"' data-category='"+row.category+"' data-amount='"+row.amount+"' data-buyingdate='"+row.buyingdate+"' class='btn d-inline ml-3 btn-primary edit'> <i class='fas fa-pen-square'></i></button></div>"
                } },
            ],
            "columnDefs": [
              { "width": "30%", "targets": 4 },
              { "width": "5%", "targets": 2 },
              { "width": "5%", "targets": 0 }
            ],
            "drawCallback": function() {
                $('.delete').on('click', function(event){
                    let id=this.id
                    event.preventDefault();
                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this expense!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                let expenseid = id
                                let expense = new Expenses(null,null,null,expenseid)
                                Expenses.deleteExpense(expense)

                            } else {
                                swal("Your expense record is safe!");
                            }
                        });

                })

                $('.edit').on('click', function(event){
                    event.preventDefault();
                    let id=$(this).data('id')
                    let amount=$(this).data('amount')
                    let buyingdate=$(this).data('buyingdate')
                    let category=$(this).data('category')
                    $('#categoryedit option:contains(' + category + ')').prop({selected: true});
                    // $('#categoryedit').val(category)
                    $('#idEdit').val(id)
                    $('#amountEdit').val(amount)
                    $('#buyingDateEdit').val(buyingdate)

                })
            }
        } );


    }

    static reset(){
        this.datatable.destroy();
        this.datatable.clear();
        Expenses.initialize();
        Expenses.initializeCategory();
        Statistic.initializeChart()
    }
    static editExpense(expense){
              $.ajax({
                "url": 'api/index.php',
                "type": 'POST',
                "data": {
                "id": expense.id,
                "category":expense.category,
                "amount":expense.amount,
                "buyingdate": expense.buyingdate,
                "section": "editexpense"
    
                }}).done(function (json) {
                    swal({
                        title: "Edited Successfully!",
                        icon: "success",
                      });
                    Expenses.reset()
                  }).fail(function (xhr, errmsg, err) {
                    swal({
                      title: "Something went wrong, try again!",
                      icon: "danger",
                    });
      
                  })

              }
    static addExpense(expense){
      console.log(expense)
              $.ajax({
                "url": 'api/index.php',
                "type": 'POST',
                "data": {
                "category": expense.category,
                "buyingdate": expense.buyingdate,
                "amount": expense.amount,
                "section": "addexpense",
    
                }}).done(function (json) {
                  console.log(json)
                  if (json.data=='success'){
                    swal({
                      title: "Added Successfully!",
                      icon: "success",
                    });
                    Expenses.reset()}
                    else{
                      swal({
                        title: "Something went wrong, try again!",
                        icon: "danger",
                      });
                    }
                  }).fail(function (xhr, errmsg, err) {
                    swal({
                      title: "Something went wrong, try again!",
                      icon: "danger",
                    });
      
                  })

              }
              static deleteExpense(expense){
                console.log(expense)
                      $.ajax({
                        "url": 'api/index.php',
                        "type": 'POST',
                        "data": {
                        "id": expense.id,
                        "section": "deleteexpense",
            
                        }}).done(function (json) {
                            swal("Poof! Your expense record has been deleted!", {
                                icon: "success",
                            });
                            Expenses.reset()
                          }).fail(function (xhr, errmsg, err) {
                            swal({
                              title: "Something went wrong, try again!",
                              icon: "danger",
                            });
              
                          })
        
                      }


                      static addCategory(category){
                        let formData = new FormData();
                        formData.append('section', 'addcategory');
                        formData.append('category', category.category);
                        fetch('api/index.php', {
                          method: 'POST',
                          body: formData
                        }).then(function (response) {
                            response.text().then(function (responseText) {
                              responseText = JSON.parse(responseText)
                              if(responseText.data==='success'){
                              swal({
                                title: "Added Successfully!",
                                icon: "success",
                              });
                              Expenses.initializeCategory();}
                              else{
                                swal("This category already exists!")
                              }
                            });
                        });
                      }

                      static editCategory(category){
                        let formData = new FormData();
                        formData.append('section', 'editcategory');
                        formData.append('category', category.category);
                        formData.append('id', category.id);
                        fetch('api/index.php', {
                          method: 'POST',
                          body: formData
                        }).then(function (response) {
                            response.text().then(function (responseText) {
                              responseText = JSON.parse(responseText)
                              if(responseText.data==='success'){
                              swal({
                                title: "Edited Successfully!",
                                icon: "success",
                              });
                              Expenses.reset();}
                              else{
                                swal("This category name already exists!")
                              }
                            });
                        });
                      }


                      static deleteCategory(category){
                        let formData = new FormData();
                        formData.append('section', 'deletecategory');
                        formData.append('category', category.category);
                        formData.append('id', category.id);
                        fetch('api/index.php', {
                          method: 'POST',
                          body: formData
                        }).then(function (response) {
                            response.text().then(function (responseText) {
                              responseText = JSON.parse(responseText)
                              if(responseText.data==='success'){
                              swal({
                                title: "Deleted Successfully!",
                                icon: "success",
                              });
                              Expenses.reset();}
                              else{
                                swal("Something went wrong, try again!")
                              }
                            });
                        });
                      }
            
    }

Expenses.initialize();
Expenses.initializeCategory();
Statistic.initializeChart()
$('#expensefor').on('submit', function (event) {
    event.preventDefault();
    let date = document.getElementById('buyingDate').value.toString();
    let expense = new Expenses($('#category option:selected').text(),date,$('#amount').val())
    console.log(expense)
    Expenses.addExpense(expense)
    document.getElementById('expensefor').reset()
  });
  $('#editfor').on('submit', function (event) {
    event.preventDefault();
    let date = $('#buyingDateEdit').val()
    let category = $('#categoryedit option:selected').text()
    let id = $('#idEdit').val()
    let amount = $('#amountEdit').val()
    let expense = new Expenses(category, date, amount, id)
    Expenses.editExpense(expense)
    document.getElementById('editfor').reset()
  });

  $('#addCategoryForm').on('submit', function (event) {
    event.preventDefault();
    let category = document.getElementById('addCategoryInput').value
    category = new Expenses(category)
    console.log(category)
    Expenses.addCategory(category)
    document.getElementById('addCategoryForm').reset()
  });

  $('#editCategoryForm').on('submit', function (event) {
    event.preventDefault();
    let id = $('#categoryEditBoardSelect').val();
    let category = document.getElementById('categoryEditBoard').value
    category = new Expenses(category, null, null, id)
    console.log(category)
    Expenses.editCategory(category)
    document.getElementById('editCategoryForm').reset()
  });


  $('#deleteCategoryForm').on('submit', function (event) {
    event.preventDefault();
    let id = $('#categoryDeleteBoardSelect').val();
    category = new Expenses(null, null, null, id)
    Expenses.deleteCategory(category)
    document.getElementById('deleteCategoryForm').reset()
  });
