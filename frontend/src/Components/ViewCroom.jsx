import React from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import AddStudent from "./AddStudent";
import EditRoom from "./EditRoom";

function ViewCroom() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [room, setroom] = React.useState([]);
  const [load, setload] = React.useState(0);
  const [ast, setast] = React.useState(0);
  const [roomid, setroomid] = React.useState(0);
  const [rel, setrel] = React.useState(0);
  const [data, setdata] = React.useState([]);
  const [alert, setalert] = React.useState("");
  const [edit, setedit] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      axios
        .get("https://mern-attendance.up.railway.app/getroom/" + id)
        .then((res) => {
          console.log(res.data);
          setroom(res.data.room);
          setroomid(res.data.room._id)
        })
        .catch((err) => console.log(err));
    })();
  }, [rel]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    (async () => {
      axios
        .get("https://mern-attendance.up.railway.app/getstudents/" + id)
        .then((res) => {
          console.log(res.data.students);
          setdata(res.data.students);
          setload(1);
          setalert("")
        })
        .catch((err) => {
          setalert(err.response.data.message);
          setload(1);
          console.log(err);
        });
    })();
  }, [rel]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e, roomid) => {
    e.preventDefault();
    setast(1);
    setroomid(roomid);
  };



  const handleDel = async (e, id) => {
    e.preventDefault();

    await axios.delete(`https://mern-attendance.up.railway.app/delstudent/${id}`)
    .then((res) => {
      if(rel){
        setrel(0)
      }
      else{
        setrel(1)
      }
    }).catch((err) => console.log(err))
  }



  const  handleDelcroom = async (e) => {    
    e.preventDefault();
    console.log(roomid)
    await axios.delete(`https://mern-attendance.up.railway.app/del/${id}`)
    .then((res) => {      
      navigate(-1)
    }).catch((err) => console.log(err))
  }


  return load ? (
    <>
      <div className="container">
        <AddStudent
          trigger={ast}
          setTrigger={setast}
          roomid={roomid}
          reload={rel}
          setreload={setrel}
        />
        <EditRoom
          idx={roomid}
          trigger={edit}
          setTrigger={setedit}
          reload={rel}
          setreload={setrel}    
          cname={room.cname}
          ccode={room.ccode}
          days={room.days}
        />
        {
          window.innerWidth < 600 ? (<></>):(
            <div className="backbtn">
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          )
        }
        <div className="viewcont pt-3 mt-3 pb-4">
          <div className="subdiv">
            <div className="diftxt">
              <p className="ccodex">
                {room.ccode}
              </p>
              <p className="cnamex">
                {room.cname}
              </p>
            </div>
            <div className="endtxt">
              <p className="cnamex">
                Strength: {room.strength}
              </p>
              <p className="cnamex">
                Total Days for this course: {room.days}
              </p>
            </div> 
          </div>         
          <div className="buttonsx mt-5">            
            <button
              className="btnxx btnaddst"                              
              onClick={(e) => handleChange(e, room._id)}
            >
              Add Student
            </button>
            {alert ? (<></>): (
              <Link to={`/markatt/` + id} className="d-flex justify-center align-center">              
                <button
                    className="btnxx btnaddst"                
                  >
                      <span style={{color:'black'}}>Mark Attendance</span> 
                </button>
              </Link>
            )}
            <button
              className="btnxx btnaddst"              
              onClick={(e) => setedit(1)}
            >
              Edit Classroom
            </button>
            <button
              className="btnxx"
              style={{ backgroundColor: "rgb(207, 52, 52)" }}
              onClick={(e) => handleDelcroom(e)}
            >
              Delete Classroom
            </button>

          </div>
        </div>
      </div>
      {alert ? (
        <h2 align="center" className="mt-5">
          {alert}
        </h2>
      ) : (
        <div className="tablecont mt-5 container mb-5">
          <table className="attentable">
            <thead>
              <tr>
                <th style={{borderLeft:'solid 1px rgb(194, 194, 194)'}}>Name</th>
                <th>Roll No.</th>
                <th>Attendance</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((it, i) => {
                return (
                  <tr key={i}>
                    <td style={{borderLeft:'solid 1px rgb(194, 194, 194)'}}>{it.name}</td>
                    <td>{it.roll}</td>
                    <td>{it.attendance}/{room.days}</td>
                    <td><button className="btn btn-danger" onClick={(e) => handleDel(e, it._id)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  ) : (
   <div className="loader"></div>
  );
}

export default ViewCroom;
