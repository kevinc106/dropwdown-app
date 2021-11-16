import React from "react";
import './TodoItem.css'

function Customer(props){  
    return(
        <li className="Customer">
        <span>
            {props.customer.nit}
        </span>
        <p>
            {props.customer.name}
        </p>
        <span>
            {props.customer.reference_name}
        </span>
        </li>
    );
}

export {Customer}