import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function MarkAtt() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [data, setdata] = React.useState([]);
  const [stud, setstud] = React.useState([]);
  const [load, setload] = React.useState(0);
  const [loadbtn, setloadbtn] = React.useState(0);
  const [updated, setupdated] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:5000/getroom/" + id)
        .then((res) => {
          console.log(res.data);
          setdata(res.data.room);
        })
        .catch((err) => console.log(err));
    })();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    ( async () => {
        
      axios
        .get("http://localhost:5000/getstudents/" + id)
        .then((res) => {
          console.log(res.data.students);
          setstud(res.data.students);
          setload(1);
          setloadbtn(0);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [updated]);// eslint-disable-line react-hooks/exhaustive-deps

  const handlepresclick = (e, id) => {
    e.preventDefault();
    console.log(updated)
    setloadbtn(1)
    axios
      .put("http://localhost:5000/updatestudent/" + id)
      .then((res) => {
        console.log(res.data);
        if (updated === 1) {
          setupdated(0);
        } else {
          setupdated(1);
        }
        console.log(updated)
      })
      .catch((err) => console.log(err));
  };

  

  const handleabsclick = (e, id) => {
    e.preventDefault();
    console.log(updated)
    setloadbtn(1)
    axios
      .put("http://localhost:5000/updatestudentabs/"+id)
      .then((res) => {
        console.log(res.data);
        if (updated === 1) {
          setupdated(0);
        } else {
          setupdated(1);
        }
        console.log(updated)
      })
      .catch((err) => console.log(err));
  };

  const handleConf = (e, id) => {
    e.preventDefault();
    axios
    .put("http://localhost:5000/confirmed/"+id)
    .then((res) => {
      console.log(res.data);
      navigate(-1);
    })
    .catch((err) => console.log(err))
  }

  return load ? (
    <div className="container pt-4 pb-4 d-flex flex-column">
      <div className="backbtn mt-1">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <h1 align="center">{data.cname}</h1>
      <table className="attentable mt-4">
        <thead>
            <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Attendance</th>
            </tr>
        </thead>
        <tbody>
          {stud.map((student, idx) => {
            return (
              <tr key={idx}>
                <td style={{borderLeft:'solid 1px rgb(194, 194, 194)'}}>{student.name}</td>
                <td>{student.roll}</td>
                <td>
                  <div className="tabbtns">
                    {student.disabled ? [                
                    <>
                        {loadbtn ? [<button className="absbtn" disabled>
                            Change To Absent
                        </button>]:[<button className="absbtn" onClick={(e) => handleabsclick(e, student._id)}>                            
                            Change To Absent
                        </button>]}
                        
                    </>
                    ] :[ 
                        <>
                        {loadbtn ? [<button className="presbtn" disabled>                            
                            Mark As Present
                        </button>]:[<button className="presbtn" onClick={(e) => handlepresclick(e, student._id)}>                            
                            Mark As Present
                        </button>]}
                    </>
                    ]}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <span className="note">*Please click confirm only if attendance for everyone has been marked and is final else click on BACK.</span>        
      <button className="confbtn mt-3 btn btn-primary" onClick={(e) => handleConf(e, id)}>Confirm</button>      
      
    </div>
  ) : (
    <>Loading...</>
  );
}

export default MarkAtt;
