import React from 'react';
import CategoryOptionsInput from './CategoryOptionsInput';
import AmountInput from './AmountInput';
import BuyingDateInput from './BuyingDateInput';
import ModalHeader from './ModalHeader';
import ModalButtonSubmit from './ModalButtonSubmit';
import Modal from './Modal';
class AddExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { category: '', categoryId: '', amount: '', buyingDate: '' };
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeBuyingDate = this.handleChangeBuyingDate.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleChangeCategory(event) {

        this.setState({ category: event.value, categoryId: event.id })
    }
    handleChangeAmount(amount) { this.setState({ amount: amount }) }
    handleChangeBuyingDate(buyingDate) { this.setState({ buyingDate: buyingDate }) }
    handleSubmit(event) {
        let id=event.target.id
        event.preventDefault();
        // let id=event.target.id
                // let data = {
        //     'category': this.state.category,
        //     'category_id': this.state.categoryId,
        //     'amount': this.state.amount,
        //     'Buying Date': this.state.buyingDate,
        //     'image'      : this.input.current.value
        // }
        let formData = new FormData();
        formData.append('image', this.fileInput.current.files[0]);
        formData.append('category', this.state.category);
        formData.append('category_id', this.state.categoryId);
        formData.append('amount', this.state.amount);
        formData.append('Date', this.state.buyingDate);

        fetch('/addexpense', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            body: formData
        }).then(response => response.json()).then(data => {

            if (data.success == 'success') {
                swal({
                    title: "Added Successfully!",
                    icon: "success",
                });
                this.setState({
                    category: '', categoryId: '', amount: '', buyingDate: ''
                })
                
                this.fileInput.current.value=null
                document.getElementById(id).reset();
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
            <form name='fileinfo' method='post' encType='multipart/form-data' onSubmit={this.handleSubmit} id='expensefor'>
                <Modal id='expenseform' modalSubmitButton={<ModalButtonSubmit buttonTitle='Add an Expense' />} modalHeader={<ModalHeader title='Add Expense Form' />}  >
                <CategoryOptionsInput classes='md-form mb-3' handleChangeCategory={this.handleChangeCategory} categorySelected={this.state.category} category={this.props.category} />
                <AmountInput value={this.state.amount} handleChangeAmount={this.handleChangeAmount} />
                <BuyingDateInput buyingDate={this.state.buyingDate} handleChangeBuyingDate={this.handleChangeBuyingDate} />
                <label>Attach a receipt</label><input ref={this.fileInput} type='file' />
            </Modal></form>
        )
    }
}


export default AddExpenseForm



















