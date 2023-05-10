
import { JsonForms } from '@jsonforms/react';
import React from 'react';
import uischema from './uischema.json';
import {State}  from 'country-state-city';
import FormAppBar from './FormAppBar';
import FeedbackDialog from './FeedbackDialog';
import {materialCells,materialRenderers, } from '@jsonforms/material-renderers';
import { Button } from '@mui/material';

import AjvErrors from "ajv-errors";
import { createAjv } from '@jsonforms/core';



/*
  Component for creating users 
  The CreateUser component mirrors the ViewEntry component with some  minor changes
  therefore the documentation is pretty much teh same for both
  
*/


const renderers = [...materialRenderers];
  const defaultPerson ={
    id:"",  name:"",  lastName:"",  middleName:"",  secondLastName:"",  suffix:"",  sex:"",  ssn:"",  birthdate:"",  visaType:"",  visaNumber:"",  birthCountry:"",  city:"",  state:"",  birthPlace:"",  dateOfDeath:undefined,  adfanHasBcertCpy:false,  hairColor:"",  eyeColor:"",  height:"",  weight:"",  particularMarkers:"ninguno",  mainLanguage:"",  religion:"",  needsInterpreter:false,  civilStatus:"",  secondLanguage:"",  prefix:"",  custodyType:"",  puertoRicoResident:false,  americanCitizen:false,  dfCustodian:false,deceased : false}
    


  

  function CreateUser(props) {
    const [data, setData] = React.useState(defaultPerson);
    const [hasErrors, setErrorFlag]    = React.useState(true)
    const [privateSchema, setPrivateSchema] = React.useState(props.privateSchema)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogReason, setDialogReason] = React.useState({action: "none", result: ""});

      

      const setAlert  = (reason) =>
      {
        setDialogReason(reason)
        setDialogOpen(true)
      }
      const closeDialog = () => {
        props.changeContent(1);
        setDialogOpen(false)
      }
    
    
    const changeErrorFlag = (count) => 
  {


    if(count == 0)
    {
      setErrorFlag(false)
    }
    else
    {
      setErrorFlag(true);
    }

  }
 
   


    return (

        <>
        <FeedbackDialog handleClose={closeDialog} open={dialogOpen} reason={dialogReason}></FeedbackDialog>
        <FormAppBar goBack={ () => props.changeContent(1)}title="Añadir usuario"></FormAppBar>
        <div className="userForm">
          <JsonForms
            schema={privateSchema}
            uischema={uischema}
            data={data}
            renderers={renderers}
            liveValidate={true}
          cells={materialCells}
            onChange={({ errors, data }) => {
              changeErrorFlag(errors.length)
              
              changeErrorFlag(errors.length)
              
              
              if(data.visaType == "Ninguna")
              {
                data.visaNumber = "00000000";
              }    
              
              var country =getSelectedcountryIdCode(data.birthCountry, props.countryNames)
              

               //Start of country management block
              //This block gets the id of teh selected country and
              //updates the state selection accordingly
              if(country != undefined){
                
                
                
                ///we haave to modify our validation schema to include the 
                //incoming state values after a country change
                ///first we copy our original schema
                let newSchema =JSON.parse(JSON.stringify(privateSchema));
                

                let states = State.getStatesOfCountry(country.isoCode)
                
                

                           
                if( states.length == 0 )
                {
                  states = ["nostate"];
                  
                  data.state = "nostate"
                   
  
                }
                else
                {
                  states = states.map( (cn) =>cn.name);
                  data.state = states[0];
                }
  
                
                   //Now that we have our new country list
                //our state enum is changed accordingly in our schema
                newSchema.properties.state.enum = states;   
                
                setPrivateSchema(newSchema) 

  
              }
               //End of country management block
              setData(data);
            }}
          />

          <div className='formButtonContainer'>

          <Button
          disabled={hasErrors}
                  
          color={hasErrors ? "error" : "success"} 
          variant="outlined"
          
            onClick={() => {
              
              adduser(data, setAlert)
            }}
          >
            Añadir
          </Button>
          </div>
        </div>
      </>

    );
    
  }


  function adduser(data, setAlert)
  {
    //Add user and get server response code for user feedback
    let response = 0;
    fetch('http://localhost:8080/addPerson', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              }).then(serverResponse =>  {
                if(serverResponse.status == 200)
                {
                  setAlert({action: "adding", result: "success"})
                }
                else
                {
                  setAlert({action: "adding", result: "error"})
                }
          
          
            }).catch(() =>  setAlert({action: "adding", result: "error"}));
  }


    //Helper function to get country conde of the selected country

  function getSelectedcountryIdCode(country_name, country_list)
  {
   let target_country = country_list.filter(obj => {
      return obj.name === country_name

    })
  
    return target_country[0];


  }


  export default CreateUser;