import axios from "axios";
import React, { useState } from "react";
function Modal(props) {
  var a = props.data;
  const [prodata, setProdata] = useState(props.data);
  const [del, cdel] = useState(false);
  console.log(prodata);
  function another(e) {
    e.preventDefault();
  }
  function handleRemove(val) {
    //e.preventDefault()
    const mailid = window.localStorage.getItem("mail");
    //console.log(val)
    axios
      .post("/api/userdelete", {
        val,
        mailid,
      })
      .then((res) => {
        console.log("received");
        //window.location.reload();
        setProdata(res.data.followers);
      })
      .catch((err) => {
        console.log(err);
      });
    cdel(true);
  }
  function fun(val) {
    
    return (
      <ul>
        {val}
        <button
          style={{ marginLeft: "5%" }}
          onClick={() => {
            handleRemove(val);
            another();
          }}
          class="btn btn-secondary"
        >
          Remove
        </button>
      </ul>
    );
  }
  return (
    <div style={{ paddingBottom: "2%" }}>
      <span
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={"#exampleModalLong" + props.findWhat}
      >
        {props.findWhat} {del ? prodata.length : a.length}
      </span>

      <div
        class="modal fade"
        id={"exampleModalLong" + props.findWhat}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {" "}
                {props.findWhat}
              </h5>
            </div>
            {/* <h1>{props.data}</h1> */}
            <div class="modal-body">{del ? prodata.map(fun) : a.map(fun)}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
