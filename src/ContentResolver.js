import React from "react";
import ListPeople from "./ListPeople";
import ViewEntry from "./ViewEntry"
import CreateUser from "./CreateUser"
import { Country}  from 'country-state-city';
import schema from "./schema"
import uischema from './uischema.json';

const formButtonStyle = {marginRight : "5%"}


/* Component responsible for rendering the appropriate screen
  according to user input.

*/



function ContentResolver() {


  const [contentPage, setContentPage]  = React.useState(1);
  const [ focused , setFocused] = React.useState(0);
  
  
  //Get the list of countries at startup adn add them to our schema
  let countryNames =  Country.getAllCountries()
  schema.properties.birthCountry.enum =countryNames.map( (cn) =>cn.name)



  //Callback for switching screen from within child components
  const setFocusdId = (newId)  => {setFocused(newId)}
  
  
  switch (contentPage){
  case 1: 

    //List users
    return <ListPeople setFocusdId={setFocusdId} changeContent={setContentPage}></ListPeople>

    //View a specific user
    case 2:
    return <ViewEntry  formButtonStyle={formButtonStyle} privateUiSchema={uischema} privateSchema={schema} countryNames={countryNames} focusedId={focused} changeContent={setContentPage}></ViewEntry> //view and or dit user user

      // Create user
    case 3:
    return <CreateUser formButtonStyle={formButtonStyle} countryNames={countryNames} privateSchema={schema} changeContent={setContentPage}></CreateUser> 

  default:
    return <ViewEntry  formButtonStyle={formButtonStyle} privateUiSchema={uischema} privateSchema={schema} countryNames={countryNames} focusedId={focused} changeContent={setContentPage}></ViewEntry> //view and or dit user user
  }
}

export default ContentResolver;
