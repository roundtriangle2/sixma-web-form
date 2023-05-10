
import React from "react";
import PersonEntry from "./PersonEntry";
import { Paper } from "@mui/material";
import {Button} from "@mui/material";

//default value to prevent error when first loading in
const defaultList = [{id: 0, name: "", last_name: "", middle_name: "", second_las_name: ""}]



/**
 * Component responisble for fetching and rendering a list of users from the database.
 * This is done via  a call to the spring server that only retunrs the necessary information
 * to display and select users. This components also contains a button directs users to a 
 * screen where new users can be addded
 */
function ListPeople(props) {

  const [peopleList, setPeopleList] = React.useState(defaultList);


  //Population of users list on first load
  React.useEffect(() => { 
    fetch("http://localhost:8080/shortlist")
      .then((response) => {
        
        return response.json();
      })
      .then((response) => {
        setPeopleList(response)
      });
  }, []);




  /*Callback used to select a specific user and 
    switch to the component that displays or edits user details

  */
  const viewEntry = (id) =>{
    props.setFocusdId(id);
    props.changeContent(2);

  };
  return (
    <>
    <div className="people-list">
      <div className="buttonContainer">
      <Button color="success" variant="outlined" onClick={() => props.changeContent(3)}>Crear usuario</Button>
      </div >
      <div className="listContainer">
      <ul>
      {peopleList.map(person => 
        <Paper key={person.id}>

        
        <PersonEntry key={person.name} person={person} chanteToView={() =>{viewEntry(person.id)}}></PersonEntry >
        
        
        </Paper>
        
        
        )}
</ul>

        </div>

        
    </div>
    </>
  );
}

export default ListPeople;
