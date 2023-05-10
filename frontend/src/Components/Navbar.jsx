import React from 'react'
import AddCroom from './AddCroom';
import axios from 'axios';

function Navbar() {

    const [addroom, setaddroom] = React.useState(0);
    const [data, setdata] = React.useState([]);

    const handleLogout = () => {    
        localStorage.removeItem("token");
        window.location.href = "/";
      };
    
    React.useEffect(() => {
    ( async () => {
        axios.get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {                                
        setdata(res.data)                    
        }).catch((err) => console.log(err))
    })();
    },[])

  return (
    <div className='navx'> 
    <AddCroom trigger={addroom} setTrigger={setaddroom} datax={data.userid}/>
        <div className='navtxt'>
          <p>Welcome, {data.name}</p>
        </div>
        <button className='adcl' onClick={(e) => setaddroom(1)}>Add Classroom</button>    
        {/* <button className='profbtn'>Edit Profile</button>         */}
        <button onClick={handleLogout} className="logoutbtn">Logout</button>
    </div>
  )
}

export default Navbar