import React,{useState} from 'react'
import axios from 'axios'
import cross from '../Assets/cross.webp'
import { toast } from 'react-toastify';

function Signup(props) {
  
  const [email, setemail] = useState('');  
  const [pwd, setpwd] = useState('');
  const [confpwd, setconfpwd] = useState('');
  const [trig, settrig] = useState(0);  
  const [show1, setshow1] = useState(0);
  const [show2, setshow2] = useState(0);  
  const [load, setload] = useState(0)
  const [name, setname] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setload(1)
    if( pwd.length < 8){
      console.log("errr")
      return
    }    
    axios.post("http://localhost:5000/register",{
        name:name,
        email:email,
        password:pwd,        
    })
    .then((res) => {
      console.log(res.data)         
      setload(0)
      props.setTrigger(0)
      toast.success("Signed Up Successfuly", {
        position: toast.POSITION.TOP_CENTER,
    });
    }).catch((err) => {
      console.log(err.response.data.message)           
      toast.error(`${err.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
    });
      setload(0)      
    })        
  }

  

  const handlechange = (e) => {
    e.preventDefault();    
    settrig(1);
    setconfpwd(e.target.value);
  }

  return props.trigger ? (
    <>    
    <div className='signup-cont'>        
        <div className="signupform" style={{width:'30%'}}>
            <img src={cross} alt="X" className='xbtn' onClick={() => {
              props.setTrigger(0)
              setshow1(0)
              setshow2(0)
              settrig(0)
            }}/>
            <p align="center" style={{fontSize:'40px'}}>{load ? <>Signing Up</>:<>SignUp</>}</p>
            <form onSubmit={(e) => handleSignup(e)}>
            <div className="datax">
                <label>Name </label>
                <br/>
                <input type="text"  required className='forminput' onChange={(e) => setname(e.target.value) } />
              </div>
              <div className="datax">
                <label>Email </label>
                <br/>
                <input type="email"  required className='forminput' onChange={(e) => setemail(e.target.value) } />
              </div>
              <div className="datax">
                <label>Password </label>
                <br/>
                {
                  show1 ? (
                    <>
                      <input type="text" required className='forminput' onChange={(e) => setpwd(e.target.value) }/>
                      <i className="far fa-eye-slash showicon" onClick={() => setshow1(0)}></i>
                    </>
                  ):(
                    <>
                      <input type="password" required className='forminput' onChange={(e) => setpwd(e.target.value) }/>
                      <i className="far fa-eye showicon" onClick={() => setshow1(1)}></i>
                    </>
                  )
                }
              </div>
              <div className="datax">
                <label>Confirm Password </label>
                <br/>
                {
                  show2 ? (
                    <>
                      <input type="text" required className='forminput' onChange={(e) => handlechange(e) }/>
                      <i className="far fa-eye-slash showicon2" onClick={() => setshow2(0)}></i>
                    </>
                  ):(
                    <>
                      <input type="password" required className='forminput' onChange={(e) => handlechange(e) }/>
                      <i className="far fa-eye showicon2" onClick={() => setshow2(1)}></i>
                    </>
                  )
                }
              </div>     
              <div className='d-flex justify-content-center align-items-center flex-column'>
                { pwd.length < 8 && pwd.length > 0 ? (<p className='mt-2' style={{color:'red', marginLeft:'20px'}}>Min. password length: 8</p>):(<></>)}
                { pwd !== confpwd && trig ? (<><p className='mt-1' style={{color:'red', marginLeft:'20px'}}>Passwords dont match</p><input type="submit" disabled className='subbtn mt-3' value="SIGNUP"/></>):(<input type="submit" className='subbtn mt-3' value="SIGNUP"/>)}            
              </div>                                     
            </form>            
        </div>
    </div>
    </>
  ):(<></>)
}

export default Signup
