import React from 'react';
function BuyingDateInput(props) {
    function handleChangeBuyingDate(e){ 
        props.handleChangeBuyingDate(e.target.value)
        
    }
    return (<div className="md-form mb-5">
        <i className="far fa-calendar-alt"></i>
        <input onChange={handleChangeBuyingDate} value={props.buyingDate} type="date" id="amount" className="form-control validate" required />
        <label data-error="wrong" data-success="right" htmlFor="orangeForm-email">Buying Date</label>
    </div>)
}


export default BuyingDateInput