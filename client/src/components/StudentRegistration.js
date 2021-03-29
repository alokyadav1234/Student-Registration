import React, {useState} from 'react';
import M from 'materialize-css';
import{Link, useHistory} from 'react-router-dom';

const StudentRegistration = () => {
  const [firstName, setName] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentStatus, setStatus] = useState('');
  const history = useHistory();

  const postForm = ()=>{
    fetch('/',{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          paymentStatus
      })
  }).then(res => res.json()).then(data => {
      console.log(data)
      if(data.error){
        console.log(data.error)
          M.toast({html: data.error, classes:"#f44336 red"})
      }else{
          M.toast({html: "successfully Loged in", classes:"#4caf50 green"}) 
          const fullName = data.firstName+' '+data.lastName
          localStorage.setItem("FULLNAME", fullName);
          history.push('/confirmation')
      }
  })
  }
    return ( 
      <div className="container" style={{margin:"50px", width:"800px", padding:"20px"}}>
      
      <div className = "card auth-card row offset-s2" style={{padding:"20px"}}>
      <h5><u>SignUp</u></h5>
          <div className="col s6">
          <input type="text" placeholder = "name" value = {firstName} onChange = {e => setName(e.target.value)}/>
          <input type="text" placeholder = "lastname" value = {lastName} onChange = {e => setLastname(e.target.value)}/>
          </div>
          <div className="col s6">
          <input type="text" placeholder = "email" value = {email} onChange = {e => setEmail(e.target.value)}/>
          <input type="password" placeholder = "password" value = {password} onChange = {e => setPassword(e.target.value)}/>
          </div>
      </div>
      <button className="btn waves-effect waves-light" type="submit" name="action" onClick = {postForm}>Submit</button>
     

      </div>
     );
}
 
export default StudentRegistration;