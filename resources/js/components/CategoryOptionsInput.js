import React from 'react';
function CategoryOptionsInput(props) {
    function handleChangeCategory(event){
        let index = event.target.selectedIndex;
        let el = event.target.childNodes[index]
        let option = el.getAttribute('id');

            let data={
                id:option,
                value:event.target.value
            } 
        props.handleChangeCategory(data)
    }
    let content = [];
    let data = Array.from(props.category);
    if (data.length > 0) {
        content.push(<option key={0} value=''>Choose a category</option>)
    }
    else {
        content.push(<option key={0} value=''>There are no categories, add category in categories form</option>)
    }
    content.push(data.map(data => {
        return <option value={data.category} key={data.id} id={data.id}>{data.category}</option>
    })
    )

    return (
        <div className={props.classes}>
            <i className="fas fa-shopping-cart"></i>
            <select onChange={handleChangeCategory} value={props.categorySelected} id="category" className="form-control validate" required>
            {content}
            </select>
            <label data-error="wrong" data-success="right" htmlFor="orangeForm-name"></label>
        </div>
    )
}

export default CategoryOptionsInput