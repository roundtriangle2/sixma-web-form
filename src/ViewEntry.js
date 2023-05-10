
import { JsonForms } from '@jsonforms/react';
import React from 'react';
import {State}  from 'country-state-city';
import FormAppBar from './FormAppBar';
import {materialCells,materialRenderers,} from '@jsonforms/material-renderers';
import { Button } from '@mui/material';
import FeedbackDialog from './FeedbackDialog';
const renderers = [...materialRenderers];


/*
  Component for viewing, updating or deleting a selected user.
  The CreateUser component mirrors this component with some changes

*/


function ViewEntry(props) {
    
    const [editDdata, setEditData] = React.useState({});
    const [originaData, setOriginaData] = React.useState({});
    const [isEditing, setIsEditing] = React.useState(false);
    const [privateSchema, setPrivateSchema] = React.useState(props.privateSchema)
    const [privateUiSchema, setPrivateUiSchema] = React.useState(props.privateUiSchema)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogReason, setDialogReason] = React.useState({action: "none", result: ""});
    //Dinamycally change schema given country list
    // Schema must now become a props since it will change dynamically and the json forme elemetn must be rerendered accordingky
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

    const setAlert  = (reason) =>
    {
      setDialogReason(reason)
      setDialogOpen(true)
    }
    const closeDialog = () => {
      props.changeContent(1);
      setDialogOpen(false)
    }
  
    React.useEffect(() => {
    
 
        fetch("http://localhost:8080/person/" + props.focusedId)
          .then((response) => {
            
            return response.json();
          })
          .then((response) => {
            if(response.dateOfDeath == null)
            {
              response.dateOfDeath = undefined
            }
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
        <FeedbackDialog handleClose={closeDialog} open={dialogOpen} reason={dialogReason}></FeedbackDialog>
        <FormAppBar goBack={ () => props.changeContent(1)}title="Ver o actualizar usuario"></FormAppBar>
        <div className="userForm">


          {/* /
            We use jsonforms to take care of form generation and object field update on user input
          / */}
          <JsonForms
            schema={privateSchema}
            uischema={privateUiSchema}
            data={isEditing? editDdata: originaData}
            renderers={renderers}
            cells={materialCells}
            readonly={!isEditing}
            liveValidate={true}
            onChange={({ errors, data }) => 
            {
              changeErrorFlag(errors.length)
             
              let country =getSelectedcountryIdCode(data.birthCountry, props.countryNames)
              

              //With our schema when the visa value is set like so
              //the number is no longer a required field
              if(data.visaType == "Ninguna")
              {
                data.visaNumber = "00000000";
              }  


              //Start of country management block
              //This block gets the id of teh selected country and
              //updates the state selection accordingly
              if(country != undefined){
                
              


                ///we haave to modify our validation schema to include the 
                //incoming state values after a country change
                ///first we copy our original schema
                let newSchema =JSON.parse(JSON.stringify(privateSchema));
           


                //Using the helper  library we get the states of the selected country
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
              setEditData(data);
            }}
          />


            <div className='formButtonContainer'>


              {/* Button for editing user or discarding change */}
            <Button            sx={props.formButtonStyle}
          variant="outlined" onClick={() =>setEditMode()}> {isEditing ? "Descartar cambios" : "Editar"} </Button>

          {/* Button for applying changes */}
          <Button 
                    
          color={hasErrors ? "error" : "success"} 
          variant="outlined"
          disabled={hasErrors}
          sx = {!isEditing? {display: "none"} : props.formButtonStyle}
            onClick={() => updatePerson(editDdata, setAlert)}
          >
            Actualizar
          </Button>


          {/* Button for deleting a user changes */}
          <Button 
          sx={props.formButtonStyle}
          variant="outlined" 
          color="error"
                    
          onClick={() =>deletePerson(originaData.id, setAlert)}> Eliminar </Button>
            </div>

        </div>
      </>

    );
    
  }





  //Helper function to get country conde of the selected country
  function getSelectedcountryIdCode(country_name, country_list)
  {
   let target_country = country_list.filter(obj => {
      return obj.name === country_name

    })
  
    return target_country[0];


  }


   //Delete user and get server response code for user feedback dialog
  function deletePerson(id, setAlert)
  {
    fetch('http://localhost:8080/person/' + id, {
      method: 'DELETE'
     
    }).then(serverResponse =>  {
      if(serverResponse.status == 200)
      {
        setAlert({action: "deleting", result: "success"})
      }
      else
      {
        setAlert({action: "deleting", result: "error"})
      }


  }).catch(() =>  setAlert({action: "deleting", result: "error"}));;
  }




   //modify user and get server response code for user feedback dialog
  function updatePerson(data, setAlert) {
    
     let response = 0;
    fetch('http://localhost:8080/person', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(serverResponse =>  {
        if(serverResponse.status == 200)
        {
          setAlert({action: "updating", result: "success"})
        }
        else
        {
          setAlert({action: "updating", result: "error"})
        }


    }).catch(() =>  setAlert({action: "updating", result: "error"}));
 
  }

  export default ViewEntry;