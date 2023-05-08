
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
    const [data, setData] = React.useState(props.data);

    React.useEffect(() => {
    
 
        fetch("http://localhost:8080/person/" + props.focusedId)
          .then((response) => {
            
            return response.json();
          })
          .then((response) => {
            console.log(response)
            setData(response)
          });
      }, []);
    


    
     
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

  export default ViewEntry;