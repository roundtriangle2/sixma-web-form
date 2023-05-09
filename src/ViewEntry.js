
import { JsonForms } from '@jsonforms/react';
import React from 'react';
import schema from "./schema"
import uischema from './uischema.json';

import {
    materialCells,
    materialRenderers,
  } from '@jsonforms/material-renderers';

  const renderers = [...materialRenderers];

function ViewEntry(props) {
    
    const [editDdata, setEditData] = React.useState({});
    const [originaData, setOriginaData] = React.useState({});
    const [isEditing, setIsEditing] = React.useState(false);
    React.useEffect(() => {
    
 
        fetch("http://localhost:8080/person/" + props.focusedId)
          .then((response) => {
            
            return response.json();
          })
          .then((response) => {
            console.log(response)
            setEditData(response)
            setOriginaData(response)
          });
      }, []);
    

      const setEditMode = () => 
      {


        if(isEditing)
        {
          setEditData(originaData) //when comming from edit mode reset dat to original data
        }
        
        setIsEditing(!isEditing);



      }
    
     
    return (

        <>
        <div className="userForm">
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={isEditing? editDdata: originaData}
            renderers={renderers}
          cells={materialCells}
          readonly={!isEditing}
          liveValidate={true}
            onChange={({ errors, data }) => {
              console.log(errors);
              console.log(data);
              setEditData(data);
            }}
          />

          <button onClick={() =>setEditMode()}> {isEditing ? "Descartar cambios" : "Editar"} </button>
          <button
            onClick={() => {
              fetch('http://localhost:8080/person/' + originaData.id, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(originaData),
              });
            }}
          >
            Submit
          </button>
        </div>
      </>

    );
    
  }

  export default ViewEntry;