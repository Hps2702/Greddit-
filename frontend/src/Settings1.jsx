import React, { useState, useEffect } from "react";
// import data from "./data.json";
import axios from "axios";
import Fuse from "fuse.js";
import CardAll from "./CardAll";
import Chip from "@mui/material/Chip";

const SettingsPage = (props) => {
  // props.rend = true

  const [stags, setStags] = useState([]);
  const [greds, setGreds] = useState([]);
  //const [arr,setArr] = useState([])
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/allsubgreddits")
      .then((response) => {
        setSearchData(response.data);
        setGreds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchItem = (query) => {
    console.log(query);
    //     console.log("krikir")
    if (!query) {
      setSearchData(greds);
      console.log("null query");
      return;
    }
    query = query.toLowerCase();
    console.log(query);
    const finalResult = [];
    greds.forEach((item) => {
      if (item.Name.toLowerCase().indexOf(query) !== -1) {
        finalResult.push(item);
      }
    });
    setSearchData(finalResult);
  };

  const searchTag = () => {
   
   
    const gat= Array.from(new Set(stags))
    console.log(gat);
    //     console.log("krikir")
    if (gat.length === 0) {
      setSearchData(greds);
      console.log("null query");
      return;
    }
    const finalResult = [];

    gat.map((query) => {
      query = query.toLowerCase();
     // console.log(query);
      greds.forEach((item) => {
        item.tags.forEach((val) => {
          if (val.toLowerCase().indexOf(query) !== -1) {
            finalResult.push(item);
          }
        });
      });
    });

    const finalData = Array.from(new Set(finalResult));
    setSearchData(finalData);
  };
function handleAdd(querys){
  const arr = [...stags]
  arr.push(querys);
  const finalData = Array.from(new Set(arr))
  setStags(finalData)
}
  function handleDelete(querys){
    const arr = [...stags]
    const finalData = Array.from(new Set(arr))
let index = finalData.indexOf(querys)
let tags = finalData.splice(index,1)

 setStags(tags)
  }
  return (
    <div>
      <div
        style={{ marginLeft: "25%", width: "50%" }}
        className="search-container"
      >
        <input
          type="search"
          class="form-control"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search By Name"
        />
      </div>

      <div
        style={{ marginTop: "1%", marginLeft: "25%", width: "50%" }}
        className="search-container"
      >
        <input
          type="search"
          class="form-control"
          onChange={(e) => searchTag(e.target.value)}
          placeholder="Search By Tag"
        />
      </div>

      <div style={{padding:"2%"}}className="item-container">
        {/* {props.rend && < Card data={searchData}/>} */}
        {greds.map((val) => (
          // <p>{val.tags}</p>
          
          <span >
            {val.tags.map((a) => (
              <span>
                <Chip
                  label={a}
                  onClick={stags.includes(a) ? null : (e) => {
                    handleAdd(a);
                    searchTag()
                }}
                onDelete={stags.includes(a) ? (e)=>{handleDelete(a);searchTag()} : null} 
               />
              </span>
            ))}
          </span>
        ))}
 <div>
        </div>
        <CardAll data={searchData} />
      </div>
    </div>
  );
};

export default SettingsPage;
