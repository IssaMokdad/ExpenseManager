import React from 'react';
import CategoryOptionsInput from './CategoryOptionsInput';
import ModalButtonSubmit from './ModalButtonSubmit';
import CategoryInput from './CategoryInput';
class DeleteCategoryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { category: '', categoryId: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }
    handleChangeCategory(event) {
        this.setState({ category: event.value, categoryId: event.id })
    }

    handleSubmit(event) {
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
                        'category': this.state.category,
                        'category_id': this.state.categoryId,
                    }
                    this.props.fetchRequest('deletecategory', 'POST', data).then(data => {
                        if (data.success == 'success') {
                            swal({
                                title: "Deleted Successfully!",
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

                } else {
                    swal("Your category is safe!");
                }
            });
    }

    render() {
        return (
            <form id='deletecategoryform' onSubmit={this.handleSubmit}>
                <CategoryOptionsInput classes='md-form mb-1' handleChangeCategory={this.handleChangeCategory} categorySelected={this.state.category} category={this.props.category} />
                <ModalButtonSubmit buttonTitle='Delete Category' />
            </form>
        )
    }
}
export default DeleteCategoryForm