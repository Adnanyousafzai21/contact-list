import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Detail from "./Detail";
function App() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    contact: "",
  });
  const [item, setItem] = useState([]);
  const [Edit, setEdit] = useState("SAVE");
  const [isedit, setisedit] = useState();
  const [counter, setCounter] = useState(false);
  const [span, setSpan]=useState(false)
  let sum = 0;

  const getvalue = (val) => {
    const { name, value } = val.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const Save = () => {
    // setEdit("Save");
    if (!data.contact) {
      setSpan(true)
    } else if (Edit === "Update") {
      setEdit("Save")
      setItem(
        item.map((val) => {
          if (val.id === isedit) {
            return { ...val, fitem: data };
          }
          return val;
        })
      );

      setData({
        fname: "",
        lname: "",
        contact: "",
        img: "",
      });
    } else {
      setSpan(false)
      setCounter(true);
      const newdata = {
        fitem: data,
        id: new Date().toLocaleTimeString().toString(),
      };
      setCounter(data);
      setItem((prev) => {
        return [...prev, newdata];
      });
      setData({
        fname: "",
        lname: "",
        contact: "",
        img: "",
      });
    }
  };
  // console.log(data);
  const delette = (id) => {
    const detitem = item.filter((elm) => {
      return elm.id !== id;
    });
    setItem(detitem);
  };
  const edit = (id) => {
    const edit = item.find((elm) => {
      return elm.id === id;
    });
    // console.log(edit.item.fname);
    setData({
      fname: edit.fitem.fname,
      lname: edit.fitem.lname,
      contact: edit.fitem.contact,
    });
    // console.log(edit.item);
    setisedit(id);
    setEdit("Update");
    // console.log(data);
  };
  return (
    <>
    <Detail/>
      <div className="container">
        <div className="contact">
          <ul>
            <div className="contact-list">
              <div className="list">Contact List</div>
              {!counter ? (
                <div className="counter">zero contacts</div>
               
              ) : (
                " "
              )}
            </div>

            {item &&
              item.map((val, index) => {
                const { fitem, id } = val;

                sum += index;

                return (
                  <>
                    <li className="list_item" key={id}>
                      <div className="names">
                        <div className="fnln">
                         <i className="fa fa-user"></i> {fitem.fname} {fitem.lname}
                        </div>
                        <div className="contactf "><i className="fa fa-phone"></i>{fitem.contact}</div>
                       
                      </div>
                      <div className="butns">
                        <div onClick={() => edit(id)} className="btni btnedit">
                          <i className="fa fa-edit"></i>
                        </div>
                        <div
                          onClick={() => delette(id)}
                          className="btni btndele"
                        >
                          <i className="fa fa-trash"></i>
                        </div>
                      </div>
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
        <div className="form">
          <h3>Add Contacts</h3>
          <div className="inputdiv">
            <input
              type="text"
              placeholder="Frist Name"
              onChange={getvalue}
              value={data.fname}
              name="fname"
            />
          </div>
          <div className="inputdiv">
            <input
              type="text"
              placeholder="Last Name"
              onChange={getvalue}
              value={data.lname}
              name="lname"
              // value={data.lname}
            />
          </div>
          <div className="inputdiv">
            <input
              type="text"
              placeholder="Phone"
              onChange={getvalue}
              value={data.contact}
              name="contact"
            />
             
          </div>
         {span?<span className="required">required</span>:""} 
          

          <div className="btn">
            <button onClick={Save}>{Edit}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
