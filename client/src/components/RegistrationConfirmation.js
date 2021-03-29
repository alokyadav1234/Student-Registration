import React, {useState} from 'react';
import{Link, useHistory} from 'react-router-dom';


const RegistrationConfirmation = () => {
    const [fee, payFee] = useState(100);
    const history = useHistory();

    const payment = () => {
        fetch('/success',{
            method:"GET"
        }).then(res => res.json()).then(result => {
            if(result){
                history.push('/success')
            }else{
                history.push('/fail')
            }
        })
    }


    
    return ( 
        <div className="container" style={{margin:"50px"}}>
            <form action="http://localhost:5000/pay" method="POST">
        <div className = "card auth-card" style={{padding:"20px" ,margin:"50px"}}>
        <h5><u>Registration Confirmation</u></h5>
        <blockquote style={{color: "blue"}}>{localStorage.getItem("FULLNAME")} You have been successfully registered please pay fee 100 USD</blockquote >
         <input type="hidden" name="fee" value = "100"/>
           
           
        <button className="btn waves-effect waves-light" type="submit">Pay</button>
       
  
        </div>
        </form>
        </div>
     );
}
 
export default RegistrationConfirmation;