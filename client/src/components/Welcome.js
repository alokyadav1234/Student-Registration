import React from 'react';
import{Link, useHistory} from 'react-router-dom';
const Welcome = () => {
    const history = useHistory()

    const profile =()=>{
history.push('/profile')
    }
    return (
        <div>
            <h3>Welcome {localStorage.getItem("FULLNAME")} </h3>
            <div><button className="waves-effect waves-light btn" onClick={profile}> Profile</button></div>
        </div>
     );
}
 
export default Welcome;