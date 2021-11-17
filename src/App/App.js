import './App.css'; 
import React, { useState, useEffect, useRef, useCallback } from "react";
import {Customer} from '../Customer' 

const operations = 
{filter:{filters:[
  {field:"reference_name",operator:"contains",ignoreCase:true,value:""},
  {field:"nit",operator:"contains",ignoreCase:true,value:""},
  {field:"name",operator:"contains",ignoreCase:true,value:""},
  {field:"reference_name",operator:"contains",ignoreCase:true,value:""}
],logic:"or"},skip:0,take:process.env.REACT_APP_RESULTS_NUMBER}; 

function App() {   
  const setValueOperation = (value) => {
      try {
          operations.filter.filters.map(item => {
              item.value=value;
          })        
      } catch (error) {
          console.log(error)
      }
  }  
  
  const fetchCustomers = async (URL,operations) => {   
      const headers = {
        "APIKEY":process.env.REACT_APP_API_KEY,
        "Data-Operations":JSON.stringify(operations) 
      }
      const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      }; 
      const response = await fetch(URL, requestOptions);
      const Customers = await response.json();  
      return Customers; 
  }  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');  
  const [customers,setCustomers] = useState([]);   

  async function setFecthCustomers() {
    const customers = await fetchCustomers(process.env.REACT_APP_URL, operations);
    setCustomers(customers.results);
  }

  async function handleSearch(e) {
    setValueOperation(e.target.value); 
    setQuery(e.target.value); 
    await setFecthCustomers();
  }
 
  useEffect(async() => {
    setLoading(true);
    setError(false);
    setValueOperation(query);
    await setFecthCustomers();
    setLoading(false);
  },[]) 
   
  return (
    <React.Fragment>
      <div className="container">
        <h1 className="App">Customers</h1> 
        <div className="InputSearchElement">
          <input className="InputSearchInput" type="text" value={query} onChange={handleSearch} placeholder="Search customer"></input> 
        </div>
        <span className="ResultCounter">Results: {customers.length}</span>
        <div>
          {customers.map((customer) => (
            <Customer
              customer={customer}
            />
          ))}
        </div>
        <div>{loading && 'Loading...'}</div>
        <div>{error && 'Error'}</div>
      </div>
       
    </React.Fragment>  
  );
}


 
export {App};
