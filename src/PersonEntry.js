import { Typography } from "@mui/material";

function PersonEntry(props) {


  
//  Short component that formates and displays a user entry
  
  return (
   <li  key={props.person.id} className="entry" onClick={props.chanteToView}> 
   
    <Typography>    {prettyPrintName(props.person)}</Typography>
   </li>
  );
}






function prettyPrintName(person)
{
  let visiblename = person.name

  if(person.middleName != "NMN")
  {
    visiblename+= " " + person.middleName
  }
  visiblename += " " + person.lastName

  if(person.secondLastName  != "NLN")
  {
    visiblename+= " " + person.secondLastName
  }
  return visiblename;


}




export default PersonEntry;
