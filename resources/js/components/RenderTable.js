import React, { Fragment } from 'react';
import EditExpenseForm from './EditExpenseForm'
import ImageForm from './ImageForm'
import Paginator from './Paginator'
class RenderTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imagePath: '', category: '', categoryId: '', expenseId: '', amount: '', buyingDate: '',
            activePage: '',
        }
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onClickReceipt = this.onClickReceipt.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    onClickReceipt(event) {
        event.preventDefault()
        let imagePath = event.target.getAttribute('data-imagepath')
        imagePath = 'uploads/' + imagePath
        this.setState({
            imagePath: imagePath
        })
    }

    onClick(event) {
        event.preventDefault()
        let amount = event.target.getAttribute("data-amount")
        let category = event.target.getAttribute("data-category")
        let expenseId = event.target.getAttribute("data-id")
        let buyingDate = event.target.getAttribute("data-buyingdate")
        let categoryId = event.target.getAttribute("data-categoryid")
        this.setState({
            category: category,
            expenseId: expenseId,
            amount: amount,
            buyingDate: buyingDate,
            categoryId: categoryId
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                activePage: this.props.currentPage
            })
        }
    }
    handlePageChange(page) {
        let pageNumber = page
        this.setState({activePage: pageNumber}, function () {
            this.props.getExpenses(this.state.activePage)
        });
        
    }
    handleDeleteSubmit(event) {
        let id = event.target.id
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
                    let data = {
                        'id': id,
                    }
                    this.props.fetchRequest('deleteexpense', 'POST', data).then(data => {
                        if (data.success == 'success') {
                            swal({
                                title: "Deleted Successfully!",
                                icon: "success",
                            });
                            this.props.initializeData()

                        }
                        else {
                            swal({
                                title: "Something went wrong, try again!",
                            });
                        }
                    })

                } else {
                    swal("Your expense is safe!");
                }
            });
    }

    render() {
        console.log(this.props.currentPage)
        console.log(typeof(this.props.currentPage))
        let data
        if (this.props.expenses !== undefined) {
            data = Array.from(this.props.expenses).map(data =>
                <tr key={data.id}><td>{data.category}</td>
                    <td>{data.amount}</td>
                    <td>{data['Buying Date']}</td>
                    <td>
                        <div className='row'>
                            <div className='col-2'>
                                <form className='form' id={data.id} onSubmit={this.handleDeleteSubmit}><button type='submit' className='btn btn-danger' >
                                    <i className='fas fa-trash'></i>
                                </button>
                                </form>
                            </div>
                            <div className='ml-1 col-2 mr-1'>
                                <form data-categoryid={data.category_id} data-id={data.id} data-amount={data.amount} data-buyingdate={data['Buying Date']} data-category={data.category} onSubmit={this.onClick}>
                                    <button type='submit' className='btn btn-primary' data-target='#editexpenseform' data-toggle="modal">
                                        <i className='fa fa-pen-square'>
                                        </i>
                                    </button>
                                </form>
                            </div>
                            <div className='col-2'>
                                <form onSubmit={this.onClickReceipt} data-imagepath={data.image}>
                                    <button type='submit' className='btn btn-primary' data-target='#showimage' data-toggle="modal">
                                        <i className="fas fa-receipt">
                                        </i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </td>
                </tr >)
        }
        return (
            <Fragment>
                <table className="table table-bordered table-hover">
                    <thead >
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Buying Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data}
                    </tbody>
                </table>       
                    <Paginator handlePageChange={this.handlePageChange} last_page={this.props.last_page} total={this.props.total} activePage={this.state.activePage}/>
                <EditExpenseForm categorySelected={this.state.category} expenseId={this.state.expenseId} amount={this.state.amount} buyingDate={this.state.buyingDate} initializeData={this.props.initializeData} fetchRequest={this.props.fetchRequest} categoryId={this.state.categoryId} category={this.props.category} />
                <ImageForm imagePath={this.state.imagePath} />
            </Fragment>
        )
    }
}


export default RenderTable
