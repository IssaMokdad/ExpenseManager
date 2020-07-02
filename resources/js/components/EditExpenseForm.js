import React from 'react';
import CategoryOptionsInput from './CategoryOptionsInput';
import AmountInput from './AmountInput';
import BuyingDateInput from './BuyingDateInput';
import ModalHeader from './ModalHeader';
import ModalButtonSubmit from './ModalButtonSubmit';
import Modal from './Modal';
class EditExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id: '',categoryId:'', category: '', amount: '', buyingDate: '' };
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeBuyingDate = this.handleChangeBuyingDate.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        
        if(this.props !== prevProps){
            
            if(this.props.categorySelected){
            this.setState({
                amount:this.props.amount,
                buyingDate:this.props.buyingDate,
                id:this.props.expenseId,
                category : this.props.categorySelected,
                categoryId : this.props.categoryId
            })}
            else{
                this.setState({
                    amount:this.props.amount,
                    buyingDate:this.props.buyingDate,
                    id:this.props.expenseId,
                    category : '',
                    categoryId :''
                }) 
            }
        }}
    handleChangeCategory(event) {

        this.setState({ category: event.value, categoryId: event.id })
    }
    handleChangeAmount(amount) { this.setState({ amount: amount }) }
    handleChangeBuyingDate(buyingDate) { this.setState({ buyingDate: buyingDate }) }
    handleSubmit(event) {
    event.preventDefault();
    let id=event.target.id
        let data = {
            'id': this.state.id,
            'category_id': this.state.categoryId,
            'amount': this.state.amount,
            'Buying Date': this.state.buyingDate,
        }
        this.props.fetchRequest('editexpense', 'POST', data).then(data => {

            if (data.success == 'success') {
                swal({
                    title: "Edited Successfully!",
                    icon: "success",
                });

                this.props.initializeData()
            }
            else {
                swal({
                    title: "Something went wrong, try again!",
                    icon: "danger",
                });
            }
        })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} id='editexpense'><Modal id='editexpenseform' modalSubmitButton={<ModalButtonSubmit buttonTitle='Edit' />} modalHeader={<ModalHeader title='Edit Expense Form' />}  >
                <CategoryOptionsInput classes='md-form mb-5' handleChangeCategory={this.handleChangeCategory} categorySelected={this.state.category} category={this.props.category} />
                <AmountInput amount={this.state.amount} handleChangeAmount={this.handleChangeAmount} />
                <BuyingDateInput buyingDate={this.state.buyingDate} handleChangeBuyingDate={this.handleChangeBuyingDate} />
            </Modal></form>
        )
    }
}

export default EditExpenseForm
