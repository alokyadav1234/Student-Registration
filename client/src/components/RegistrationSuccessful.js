import React from 'react';
import{useHistory} from 'react-router-dom';
const RegistrationSuccessful = () => {
    const history = useHistory();
    return ( 
        <div className="card card-auth container" style={{padding:"5px 10px 30px 30px", margin:"30px"}}>
<h5><u>Payment Status</u> </h5>
<u><h6 style={{color: "green"}}>Successful</h6></u>
<blockquote style={{color: "blue"}}>Thanks for the payment. Your paymet status is successful.
 Plaease login and upload photograph in profile section</blockquote>
<button className="btn waves-effect waves-light" onClick = {() => history.push('/')}>Login</button>
        </div>
     );
}
 
export default RegistrationSuccessful;