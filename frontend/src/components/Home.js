
import React,{useState,useEffect} from "react";
import Base from "./Base";
import CardView from "./Card";
import DisplayTable from "./Table";
import axios from 'axios'

export default function Home() {
    const [data,setData] = useState([])
    const [globaldata,setGlobaldata] = useState({})
    useEffect(() => {
        axios.get('https://api.covid19api.com/summary')
        .then(res =>{
            console.log(res.data)
            setData(res.data.Countries)
            setGlobaldata(res.data.Global)
            
        })
        .catch(err =>console.log(err))
    }, [])
  return (
    <Base>
    <h3 style={{position:'relative',top:'60px',left:'33px'}}>Worldwide cases</h3>
      <div className="cardview">
        <CardView title={"Total Confirmed"} count={globaldata.TotalConfirmed}   />
        <CardView title={"Total Active "} count={globaldata.TotalConfirmed-globaldata.TotalRecovered}  />
        <CardView title={"Total Recovered"} count={globaldata.TotalRecovered}  />
        <CardView title={"Total Deaths"} count={globaldata.TotalDeaths} />
      </div>
      
      {/* <div style={{border:'1px solid #eee',margin:'50px',textAlign:'center',color:"#eee"}}></div> */}
      <h3 style={{position:'relative',top:'20px',left:'33px'}}>CountryWise cases</h3>
      <div className="datatable">
      <DisplayTable data={data}/>
      </div>
    </Base>
  );
}
