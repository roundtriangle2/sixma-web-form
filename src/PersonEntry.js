
function PersonEntry(props) {


  
 
  
  return (
   <li  className="entry" onClick={props.chanteToView}> 
   
   {prettyPrintName(props.person)}
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
