import React from "react";
import axios from "axios";
import cross from "../Assets/cross.webp";

function EditRoom(props) {
  const [cname, setcname] = React.useState(props.cname);
  const [ccode, setccode] = React.useState(props.ccode);
  const [days, setdays] = React.useState(props.days);

  const handleEdit = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:5000/editroom`, {
        roomid: props.idx,
        cname,
        ccode,
        days,
      })
      .then((res) => {
        props.setTrigger(0);
        if (props.reload) {
          props.setreload(0);
        } else {
          props.setreload(1);
        }
      })
      .catch((err) => console.log(err));
  };

  return props.trigger ? (
    <div className="signup-cont">
      <div className="signupform" style={{ width: "30%" }}>
        <img
          src={cross}
          alt="X"
          className="xbtn"
          onClick={() => {
            props.setTrigger(0);
          }}
        />
        <p align="center" style={{ fontSize: "30px" }}>
          Edit Classroom
        </p>
        <form onSubmit={(e) => handleEdit(e)}>
          <div className="datax">
            <label>Course Name </label>
            <br />
            <input
              type="text"
              required
              className="forminput"
              onChange={(e) => setcname(e.target.value)}
              value={cname}
            />
          </div>
          <div className="datax">
            <label>Course Code </label>
            <br />
            <input
              type="text"
              required
              className="forminput"
              onChange={(e) => setccode(e.target.value)}
              value={ccode}
            />
          </div>
          <div className="datax">
            <label>Total Days</label>
            <br />
            <input
              type="number"
              required
              className="forminput"
              onChange={(e) => setdays(e.target.value)}
              value={days}
            />
          </div>
          <div className="adstbtn">
            <input type="submit" className="subbtn" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default EditRoom;
