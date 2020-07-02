import React from 'react';
import ModalButtonSubmit from './ModalButtonSubmit';
import CategoryInput from './CategoryInput';
class AddCategoryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { categoryInput: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategoryInput = this.handleChangeCategoryInput.bind(this);
    }

    handleChangeCategoryInput(event) {

        this.setState({ categoryInput: event })
    }
    handleSubmit(event) {
        event.preventDefault();
        let id = event.target.id
        let data = {
            'categoryInput': this.state.categoryInput,
        }
        this.props.fetchRequest('addcategory', 'POST', data).then(data => {
            if (data.success == 'success') {
                swal({
                    title: "Added Successfully!",
                    icon: "success",
                });
                this.setState({
                    category: '', categoryId: '', categoryInput: ''
                })
                this.props.initializeData()
                document.getElementById(id).reset()

            }
            else {
                swal({
                    title: "Something went wrong, try again!",
                });
            }
        })
    }

    render() {
        return (
                <form id='addcategoryform' onSubmit={this.handleSubmit}>
                    <CategoryInput placeholder='New category name' handleChangeCategoryInput={this.handleChangeCategoryInput} value={this.state.categoryInput} />
                    <ModalButtonSubmit buttonTitle='Add Category' />
                </form>
        )
    }
}


export default AddCategoryForm
