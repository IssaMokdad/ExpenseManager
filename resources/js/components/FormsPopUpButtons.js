import React from 'react';
import FormPopUpButton from './FormPopUpButton';
function FormsPopUpButtons() {

    return (

        <div className='container'>
            <div className='row'>
                <FormPopUpButton modalId='#expenseform' buttonTitle='Add an Expense' />
                <FormPopUpButton modalId='#categoryform' buttonTitle='Category Board' />
            </div>
        </div>

    )
}


export default FormsPopUpButtons


