import React, {useState} from 'react';
import{useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Login = () => {
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const history = useHistory();
    const userLogin =()=>{
        fetch('/signIn',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res => res.json()).then(data => {
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }else{
                 M.toast({html: "successfully Loged in", classes:"#4caf50 green"}) 
                 const fullName = data.firstName+' '+data.lastName
                 localStorage.setItem("EMAIL", data.email)
                 localStorage.setItem("FULLNAME", fullName);
                 history.push('/welcome')
            }
        })
        }

        const signUp = () => {
            history.push('/registration')
        }
    
    return ( 
        <div className="container" style={{margin:"100px", width:"500px"}}>
           
            <div className="row card">
                
                    <div className="col m 6">
                    <h4>Login</h4>
                        <div className="input-field col m 8">
                            <input type="text" placeholder="email" value={email} onChange={e=> setEmail(e.target.value)}  />
                        </div>
                        <div className="input-field col m 8">
                        <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}  />
                        </div>
                    </div>
                    <div className="col s12">
                        <button className="waves-effect waves-light btn" style={{margin:"10px"}} type="submit" onClick={()=>userLogin()}>Login</button>
                        <button className="waves-effect waves-light btn" type="submit"onClick={() => signUp()}>signUp</button>
                    </div>
            
            </div>
        </div>
     );
}
 
export default Login;