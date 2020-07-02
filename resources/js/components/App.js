import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './Logout';
import NavBar from './NavBar';
import Chart from './Chart';
import AddExpenseForm from './AddExpenseForm';
import CategoryBoard from './CategoryBoard';
import FormsPopUpButtons from './FormsPopUpButtons';
import RenderTable from './RenderTable';
import { Fragment } from 'react';
import DatePicker from './DatePicker';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            expensesGroupedByCategory: '',
            expenses: '',
        }
        this.fetchRequest = this.fetchRequest.bind(this)
        this.handleChangeExpensesGroupedByCategory=this.handleChangeExpensesGroupedByCategory.bind(this)
        this.initializeData = this.initializeData.bind(this)
        this.getCategories = this.getCategories.bind(this)
        this.getExpenses = this.getExpenses.bind(this)
        this.getExpensesGroupedByCategory = this.getExpensesGroupedByCategory.bind(this)
    }

    getCategories() {
        this.fetchRequest('getcategories', 'get').then(data => {
            this.setState({
                category: data
            })
        })
    }
    getExpenses(page=1) {
        this.fetchRequest('getexpenses?page='+page+'', 'get').then(data => {
            this.setState({
                expenses: data
            })
        })
    }
    handleChangeExpensesGroupedByCategory(data){
        this.setState({
            expensesGroupedByCategory : data
        })
    }
    getExpensesGroupedByCategory(data) {
        this.fetchRequest('getExpensesGroupedByCategory', 'get').then(data => {
            this.setState({
                expensesGroupedByCategory: data
            })
        })
    }
    initializeData() {
        this.getExpensesGroupedByCategory()
        this.getCategories()
        this.getExpenses()
    }

    fetchRequest(url, method, data = null) {
        if (method === 'get') {
            return fetch(url).then(response => response.json())
        }
        else {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
        }
    }
    componentDidMount() {
        this.initializeData()
    }
    render() {
        return (
            <Fragment>
                <NavBar first_name={this.props.first_name} last_name={this.props.last_name}>
                    <Logout />
                </NavBar>
                <AddExpenseForm initializeData={this.initializeData} fetchRequest={this.fetchRequest} category={this.state.category} />
                <CategoryBoard initializeData={this.initializeData} fetchRequest={this.fetchRequest} category={this.state.category} />
                <FormsPopUpButtons />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-7'>
                            <RenderTable per_page={this.state.expenses.per_page} last_page={this.state.expenses.last_page} total={this.state.expenses.total} currentPage={this.state.expenses.current_page} getExpenses={this.getExpenses} initializeData={this.initializeData} fetchRequest={this.fetchRequest} category={this.state.category} expenses={this.state.expenses.data} />
                        </div>
                        <div className='col-md-5'>
                            <DatePicker handleChangeExpensesGroupedByCategory={this.handleChangeExpensesGroupedByCategory} fetchRequest={this.fetchRequest} />
                            <Chart expensesGroupedByCategory={this.state.expensesGroupedByCategory} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default App;

if (document.getElementById('ExpenseManager')) {
    const el = document.getElementById('main')
    const props = Object.assign({}, el.dataset)
    ReactDOM.render(<App {...props} />, document.getElementById('ExpenseManager'));
}
