import React from 'react';
import CategoryOptionsInput from './CategoryOptionsInput';
import ModalButtonSubmit from './ModalButtonSubmit';
import CategoryInput from './CategoryInput';
class EditCategoryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { category: '', categoryId: '', categoryInput: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategoryInput = this.handleChangeCategoryInput.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }
    handleChangeCategory(event) {
            this.setState({ category: event.value, categoryId: event.id })
    }
    handleChangeCategoryInput(event) {

        this.setState({ categoryInput: event })
    }
    handleSubmit(event) {
        event.preventDefault();
        let id = event.target.id
        let data = {
            'category': this.state.category,
            'category_id': this.state.categoryId,
            'categoryInput': this.state.categoryInput,
        }
        this.props.fetchRequest('editcategory', 'POST', data).then(data => {
            if (data.success == 'success') {
                swal({
                    title: "Edited Successfully!",
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
                <form id='editcategoryform' onSubmit={this.handleSubmit}>
                    <CategoryOptionsInput classes='md-form mb-1' handleChangeCategory={this.handleChangeCategory} categorySelected={this.state.category} category={this.props.category} />
                    <CategoryInput placeholder='Change category name' handleChangeCategoryInput={this.handleChangeCategoryInput} value={this.state.categoryInput} />
                    <ModalButtonSubmit buttonTitle='Edit Category' />
                </form>
        )
    }
}


export default EditCategoryForm
