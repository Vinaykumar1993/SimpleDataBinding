import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
function App() {
  const [tabledata,settabledata] = useState([]);
  const [clonetabledata,setclonetabledata] = useState([]);
  const [filtertext,setfiltertext] = useState([]);
  const getData=()=>{
    fetch('http://localhost:4000/getdata')
    .then((resp)=>resp.json())
    .then((respjson)=>{
      if(respjson.status==1){
          // console.log()
          settabledata(respjson.data);
          setclonetabledata(respjson.data);
      }
    });
  }
  const filterData=()=>{
    let filteredData=[...clonetabledata].filter((obj)=>obj.name.includes(filtertext));
    settabledata(filteredData);
  }
  const postData=(postinfo)=>{
    let postobj={name:postinfo.name,age:postinfo.age};
    fetch('http://localhost:4000/getdata',{},postobj)
    .then((resp)=>resp.json())
    .then((respjson)=>console.log("postedData",respjson));
  }
  useEffect(()=>{
  getData();
  },[]);
  return (
    <div className="App">
    <div className="search_block">
     <input placeholder="search your name" onChange={(e)=>setfiltertext(e.target.value)} />
     <button onClick={()=>filterData()}>Search</button>
     </div>
     <div className="table_data">
     {tabledata.length>0&&
     <table cellSpacing="0" cellPadding="0">
     <thead>
     <tr>
     <th>s no</th>
     <th>name</th>
     <th>age</th>
     </tr>
     </thead>
     <tbody>
     {tabledata.map((obj,index)=>{
      return(
        <tr key={`tablerowindex_${index+1}`}>
          <td>{index+1}</td>
          <td>{obj.name}</td>
          <td>{obj.age}</td>
        </tr>
        )
     })}
     </tbody>
     </table>
     }
     </div>
    </div>
  );
}

export default App;
