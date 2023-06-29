import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 

function Home() {
  const [data, setdata] = React.useState([]);
  const [rooms, setrooms] = React.useState([]);
  const [load, setload] = React.useState(0);
  const [load2, setload2] = React.useState(0);
  const [head, sethead] = React.useState("Your Classrooms")

  React.useEffect(() => {
    (async () => {     
      await axios
        .get("https://mern-attendance.up.railway.app/user", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          setdata(res.data);
          setload(1);
        })
        .catch((err) => console.log(err));
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (load) {
      (async () => {
        axios
          .get("https://mern-attendance.up.railway.app/getrooms/" + data.userid)
          .then((res) => {
            console.log(res.data.rooms);
            setrooms(res.data.rooms);
            setload2(1);
          })
          .catch((err) => {
            sethead("Add Classrooms to see them here.")
            setload2(1);
            console.log(err);
          });
      })();
    }
  }, [load]); // eslint-disable-line react-hooks/exhaustive-deps

  const truncate = (str) => {
    return str.length > 20 ? <>{str.substring(0, 17) + "..."}</> : <>{str}</>;
  };

  return load2 ? (
    <>
    <ToastContainer />
      <h1 className="text-center mt-4 ychead" style={{ fontFamily: "Poppins" }}>
        {head}
      </h1>
      <div className="homecont">
        {rooms.map((room) => {
          return (
            <div className="cardcont" key={room._id}>
              <p align="center" className="cc" style={{ fontSize: "30px" }}>
                {truncate(`${room.ccode}`)}
              </p>
              <p align="center" className="cc" style={{ fontSize: "18px" }}>
               {truncate(`${room.cname}`)}
              </p>
              <p align="center" className="cc" style={{ fontSize: "14px" }}>
                Strength: {room.strength}
              </p>
              <div className="btns2">
                <Link to={`/view/${room._id}`}>
                  <button className="btnx btnent">Enter</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <div className="loader"></div>
  );
}

export default Home;
