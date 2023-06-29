import React from 'react'
import axios from 'axios';
import cross from '../Assets/cross.webp'

function AddCroom(props) {

    const [name, setname] = React.useState("");
    const [code, setcode] = React.useState("");    
    
    const handleSubmit = (e) => {
        e.preventDefault();
                
        axios.post("https://mern-attendance.up.railway.app/createroom", {
            cname:name,
            ccode:code,
            userid:props.datax,
            strength:0,
            days:0,
        })
        .then((res) => {
            console.log(res.data) 
            window.location.href="/home"           
          }).catch((err) => {
            console.log(err.response.data.message)      
          })   
    }

  return props.trigger ? (
    <div className='signup-cont'>      
        <div className="signupform" style={{width:'600px'}}>
        <img src={cross} alt="X" className='xbtn' onClick={() => {
              props.setTrigger(0)              
            }}/>
            <p align="center" className='addcrh'>Add Classroom</p>            
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="datax">
                <label>Name </label>
                <br/>
                <input type="text"  required className='forminput' onChange={(e) => setname(e.target.value) } />
              </div>
              <div className="datax">
                <label>Course Code </label>
                <br/>
                <input type="text" required className='forminput' onChange={(e) => setcode(e.target.value) }/>
              </div>                                       
              <div className='d-flex justify-content-center align-items-center'>
                <input type="submit" className='subbtn mt-4' value="Add"/>
              </div>
            </form>            
        </div>
    </div>
  ):(<></>)
}

export default AddCroom