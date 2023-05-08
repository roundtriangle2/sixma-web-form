
import React from "react";
import PersonEntry from "./PersonEntry";
import { Paper } from "@mui/material";
const defaultList = [{id: 0, name: "", last_name: "", middle_name: "", second_las_name: ""}]
function ListPeople(props) {


  const [peopleList, setPeopleList] = React.useState(defaultList);
  React.useEffect(() => {
    
 
    fetch("http://localhost:8080/shortlist")
      .then((response) => {
        
        return response.json();
      })
      .then((response) => {
        setPeopleList(response)
      });
  }, []);



  const viewEntry = (id) =>{
    props.setFocusdId(id);
    props.changeContent(2);

  };
  return (
    <div className="people-list">
      <button onClick={() => props.changeContent(3)}>Create user</button>
      {peopleList.map(person => 
        <Paper>

          
        <PersonEntry key={person.id} person={person} chanteToView={() =>{viewEntry(person.id)}}></PersonEntry ></Paper>
        
        
        )}

        {/* <PersonDetails></PersonDetails> */}




        
    </div>
  );
}

export default ListPeople;
