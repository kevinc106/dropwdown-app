import React from "react";
import './Customer.css';

function Customer(props){  
    return(
        <div className="Customer"> 
            <span className="Customer-span">
                NIT: {props.customer.nit}
            </span>
            <span className="Customer-span">
                Name: {props.customer.name}
            </span>
            <span className="Customer-span">
                Reference Name: {props.customer.reference_name}
            </span>
        </div>
    );
}

export {Customer}