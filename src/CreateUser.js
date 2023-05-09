
import { JsonForms } from '@jsonforms/react';
import React from 'react';
import schema from "./schema"
import uischema from './uischema.json';




import {materialCells,materialRenderers, } from '@jsonforms/material-renderers';

  const renderers = [...materialRenderers];
  const defaultPerson ={
    id:"",  name:"",  lastName:"",  middleName:"",  secondLastName:"",  suffix:"",  sex:"",  ssn:"",  birthdate:"",  visaType:"",  visaNumber:"",  birthCountry:"",  city:"",  state:"",  birthPlace:"",  dateOfDeath:"",  adfanHasBcertCpy:false,  hairColor:"",  eyeColor:"",  height:"",  weight:"",  particularMarkers:"ninguno",  mainLanguage:"",  religion:"",  needsInterpreter:false,  civilStatus:"",  secondLanguage:"",  prefix:"",  custodyType:"",  puertoRicoResident:false,  americanCitizen:false,  dfCustodian:false,deceased : false}
    


  

  function CreateUser(props) {
    const [data, setData] = React.useState(defaultPerson);
    const [hasErrors, setErrorFlag]    = React.useState(true)

    
    
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
        <div className="userForm">
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={renderers}
          cells={materialCells}
            onChange={({ errors, data }) => {
              changeErrorFlag(errors.length)
              console.log(errors);
              console.log(data);
              setData(data);
            }}
          />
          <button
          disabled={hasErrors}
            onClick={() => {
              fetch('http://localhost:8080/addPerson', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
            }}
          >
            Submit
          </button>
        </div>
      </>

    );
    
  }

  export default CreateUser;