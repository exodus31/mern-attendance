import React from 'react'
import Signup from './Signup'
import Login from './Login';
import { ToastContainer } from 'react-toastify';

function Landing() {

    const [sign, setsign] = React.useState(0);
    const [log, setlog] = React.useState(0);

  return (
    <div className='landing'>
      <ToastContainer />
        <Signup trigger={sign} setTrigger={setsign} />
        <Login trigger={log} setTrigger={setlog} />
        <div className="landinghead">
          <h1>Attendance Made Easy</h1>
        </div>
        <div className="btns">
            <button className='snbtn' onClick={() => setsign(1)}>Signup</button>
            <button className='logbtn' onClick={() => setlog(1)}>Login</button>
        </div>
    </div>
  )
}

export default Landing