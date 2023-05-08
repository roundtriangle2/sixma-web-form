
import { JsonForms } from '@jsonforms/react';
import React from 'react';
import schema from "./schema"
import uischema from './uischema.json';

import {
    materialCells,
    materialRenderers,
  } from '@jsonforms/material-renderers';

  const renderers = [...materialRenderers];
  const defaultPerson ={
    id:"",  name:"",  lastName:"",  middleName:"",  secondLastName:"",  suffix:"",  sex:"",  ssn:"",  birthdate:[""],  visaType:"",  visaNumber:"",  birthCountry:"",  city:"",  state:"",  birthPlace:"",  dateOfDeath:"",  adfanHasBcertCpy:"",  hairColor:"",  eyeColor:"",  height:"",  weight:"",  particularMarkers:"",  mainLanguage:"",  religion:"",  needsInterpreter:"",  civilStatus:"",  secondLanguage:"",  prefix:"",  custodyType:"",  puertoRicoResident:"",  americanCitizen:"",  dfCustodian:""
  }
function CreateUser(props) {
    const [data, setData] = React.useState(defaultPerson);
    
     
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
              console.log(errors);
              console.log(data);
              setData(data);
            }}
          />
          <button
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