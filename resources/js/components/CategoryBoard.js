import React from 'react';
import ModalHeader from './ModalHeader';
import ModalButtonSubmit from './ModalButtonSubmit';
import Modal from './Modal';
import EditCategoryForm from './EditCategoryForm';
import DeleteCategoryForm from './DeleteCategoryForm';
import AddCategoryForm from './AddCategoryForm';
class CategoryBoard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal id='categoryform' modalDeleteSubmitButton={<ModalButtonSubmit buttonTitle='Delete Category' />} modalCategorySubmitButton={<ModalButtonSubmit buttonTitle='Add a Category' />}  modalHeader={<ModalHeader title='Category Form' />}>
                <AddCategoryForm initializeData={this.props.initializeData} fetchRequest={this.props.fetchRequest}/>
                <EditCategoryForm category={this.props.category} initializeData={this.props.initializeData} fetchRequest={this.props.fetchRequest} />
                <DeleteCategoryForm category={this.props.category} initializeData={this.props.initializeData} fetchRequest={this.props.fetchRequest} />
            </Modal>
        )
    }
}


export default CategoryBoard 


