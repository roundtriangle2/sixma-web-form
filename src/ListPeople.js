import styles from "./style.css"
import React from "react";
import PersonEntry from "./PersonEntry";
import PersonDetails from "./PersonDetails"
const defaultList = [{id: 0, name: "", last_name: "", middle_name: "", second_las_name: ""}]
function ListPeople() {


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



  
  return (
    <div className="people-list">
      {/* {peopleList.map(person => 
        <PersonEntry key={person.id} person={person}></PersonEntry>
        
        
        )} */}

        <PersonDetails></PersonDetails>




        
    </div>
  );
}

export default ListPeople;
