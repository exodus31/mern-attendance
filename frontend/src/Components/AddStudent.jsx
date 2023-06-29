import axios from 'axios';
import React from 'react'
import cross from '../Assets/cross.webp'
import {ToastContainer, toast } from 'react-toastify';

function AddStudent(props) {

    const [name, setname] = React.useState(0);
    const [roll, setroll] = React.useState(0);
    const [att, setatt] = React.useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("https://mern-attendance.up.railway.app/createstudent",{
            name,
            roll,
            roomid:props.roomid,
            attendance:att,
        })  
        .then((res) => {
            console.log(res.data)
            props.setTrigger(0);
            if(props.reload){
              props.setreload(0)
            }else{
              props.setreload(1)
            }
        }).catch((err) => {
            console.log(err.response.data.message)
            toast.error(`${err.response.data.message}`, {
              position: toast.POSITION.TOP_CENTER,
          });
        })    
    }

  return props.trigger ? (
    <div className='signup-cont' >
      <ToastContainer />
        <div className="signupform" style={{width:'30%'}}>
        <img src={cross} alt="X" className='xbtn' onClick={() => {props.setTrigger(0)}}/>
            <p align="center" style={{fontSize:'30px'}}>Add Student</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="datax">
                <label>Name </label>
                <br/>
                <input type="text" required className='forminput' onChange={(e) => setname(e.target.value) } />
              </div>
              <div className="datax">
                <label>Roll no. </label>
                <br/>
                <input type="number" required className='forminput' onChange={(e) => setroll(e.target.value) }/>
              </div>      
              <div className="datax">
                <label>Current Attendance</label>
                <br/>
                <input type="number" required className='forminput' onChange={(e) => setatt(e.target.value) } value={att}/>
              </div>
              <div className="adstbtn">
                <input type="submit" className='subbtn' />
              </div>               
            </form>            
        </div>
    </div>
  ):(<></>)
}

export default AddStudent