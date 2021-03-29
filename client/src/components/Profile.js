import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Profile = () => {
const [Profile , setProfile] = useState({})
const [display, setDisplay] = useState(false)
const [message, setMssage] = useState('');
const history = useHistory()
let displayMessage=false
useEffect(() => {
    fetch('/getStudent',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:localStorage.getItem("EMAIL")
        })
    }).then(res => res.json()).then(result => {
        setProfile(result)
    }).catch(err => {
        console.log("profiledata-----"+ err)
    })
},[])

/*renderTag(){
    if(this.state.Tages.length === 0) return <p>"Their is no Tages"</p>;
    return  <ul>{this.state.Tages.map(Tag => <li key = {Tag}>{Tag}</li>)}</ul>;
  }*/

  const messageDisplay =() =>{
   
   setDisplay(true)
   setMssage("Photgraph has been uploaded. Please go to home page")
   
  }


const fullName = Profile.firstName+' '+Profile.lastName +`'s`

    return ( 
        <div className="container">
        <h5>{fullName} Profile</h5>
        <p>{Profile.email}</p><br/>
        <blockquote style={{color: "blue"}}>{message}</blockquote>
        <b><p>Upload Photograph</p></b>
        <div className="file-field input-field">
        <div className="btn">
        <span>File</span>
        <input type="file"/>
            </div>
        <input className="file-path validate" type="text" placeholder="UploadImage"/>
        </div>
        <button className="waves-effect waves-light btn" style={{margin:"10px"}} onClick={()=>messageDisplay()}>Upload</button>
        <button className="waves-effect waves-light btn" onClick={() => history.push('/welcome')}>Home</button>
        </div>
        
     );
}
 
export default Profile;