import React, {useState} from 'react'
import axios from 'axios'
import cross from '../Assets/cross.webp'
import {ToastContainer, toast } from 'react-toastify';



function Login(props) {

  const [email, setemail] = useState('');  
  const [pwd, setpwd] = useState('');
  const [show, setshow] = useState(0)

  const handlelogin = (e) => {
    e.preventDefault();
     
    axios.post("https://mern-attendance.up.railway.app/login",{
        email:email,
        password:pwd,        
    })
    .then((res) => {
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
          
        window.location = "/home";
      } else {
        console.log(res.data)     
      }   
    }).catch((err) => {
      console.log(err)            
      toast.error(`${err.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
    });
    })        
  }

  return props.trigger ? (
    <div className='signup-cont'>    
    <ToastContainer />  
        <div className="signupform" style={{width:'30%'}}>
            <img src={cross} alt="X" className='xbtn' onClick={() => {
              props.setTrigger(0)
              setshow(0)
            }}/>
            <p align="center" style={{fontSize:'50px'}}>Login</p>
            <form onSubmit={(e) => handlelogin(e)}>
              <div className="datax">
                <label>Email </label>
                <br/>
                <input type="email"  required className='forminput' onChange={(e) => setemail(e.target.value) } />
              </div>
              <div className="datax">
                <label>Password </label>
                <br/>
                {
                  show ? (
                    <>
                      <input type="text" required className='forminput' onChange={(e) => setpwd(e.target.value) }/>
                      <i className="far fa-eye-slash showicon3" onClick={() => setshow(0)}></i>
                    </>
                  ):(<>
                      <input type="password" required className='forminput' onChange={(e) => setpwd(e.target.value) }/>
                      <i className="far fa-eye showicon3" onClick={() => setshow(1)}></i>
                    </>
                  )
                }
                {

                }
              <div className='d-flex justify-content-center align-items-center'>
                <input type="submit" className='subbtn mt-4' value="LOGIN"/>
              </div>
              </div>                                                                     
            </form>            
        </div>
    </div>
  ):(<></>)
}

export default Login