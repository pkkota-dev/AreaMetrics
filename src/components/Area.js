import React,{useEffect,useState,map} from 'react';
//import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { Pie } from 'react-chartjs-2';
import config from '../config'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);




const Area=()=>{
   
     
    const [value, setValue] = React.useState('');
    const [areavalue, setareaValue] = React.useState('');
    const [selectedvalue, setSelectedValue] = React.useState('');

    function fetchAreaData(){
        fetch(`${config.url}/api/v1/area`).then(
            (response) => {
    
              var data1 = response.json();
              var p = Promise.resolve(data1);
              p.then(function(values) {
                 setValue(values);
              });
              
             
    
    
         });

    
    }
    function fetchareaDetails(region){
        fetch(`${config.url}/api/v1/metrics/getWastebyArea/`+region).then(
            (response) => {
    
              var data1 = response.json();
              var p = Promise.resolve(data1);
              p.then(function(values) {
                 setareaValue(values);
              });
              
             
    
    
         });

    }
    console.log(`${config.url}/api/v1/metrics/getWastebyArea`);


   
   



    
    useEffect(()=>{
        fetchAreaData();
        
        },[])  

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedValue(event.target.value);
            fetchareaDetails(event.target.value);
            
          };
       


     

    const data={
        labels:['Wet waste(kgs)','Dry waste(kgs)'],
        datasets:[
            {
                label:'Total Waste',
                data:[areavalue.wetwaste,areavalue.drywaste],
                backgroundColor: [
                    
                     'rgba(54, 162, 235, 0.2)',
                     'rgba(255, 206, 86, 0.2)',
                     
                  ],
                  borderColor: [
                   
                     'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    
                  ],
                  borderWidth: 1,
                height:300,
                width:300,
            }
           
        ]
    }

    const data1={
        labels:['Landfill (sq.ft)','Biogas(kgs)'],
        datasets:[
            {
                label:'Bio Gas Generated',
                data:[areavalue.landfill,areavalue.biogas],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                   
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    
                  ],
                  borderWidth: 1,
                height:300,
                width:300,
            }
           
        ]
    }
  
    const options={
        title:{
            display:true,
            text:'Biogas '
        }
    }
    return (
        <div>
            <div className='dropdown'>
            <p>Select Area : 
            <select value={selectedvalue} onChange={handleChange}>
            {value.data.map((option) => (
              <option value={option.area_name}>{option.area_name}</option>
            ))}
            
              </select>
              </p>
              

              </div>
             

              
            
       
   
     <h2>Total Waste</h2>  
    <Pie data={data} options={options}/>
    <h2>Recycling Details</h2>
    <Pie data={data1}/>
        </div>
        
    )
}


export default Area;