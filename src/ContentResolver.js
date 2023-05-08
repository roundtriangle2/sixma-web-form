import React from "react";
import ListPeople from "./ListPeople";
import ViewEntry from "./ViewEntry"
import CreateUser from "./CreateUser"
function ContentResolver() {

  const [contentPage, setContentPage]  = React.useState(1);
  const [ focused , setFocused] = React.useState(0);

  const setFocusdId = (newId)  => {setFocused(newId)}

  switch (contentPage){
  case 1: 
    return <ListPeople setFocusdId={setFocusdId} changeContent={setContentPage}></ListPeople>
    break;
  case 2:
    return <ViewEntry focusedId={focused} changeContent={setContentPage}></ViewEntry> //view and or dit user user
    break;

    case 3:
    return <CreateUser changeContent={setContentPage}></CreateUser> // Create user
    break;
  default:
    return <ListPeople changeContent={setContentPage}></ListPeople>
  }
}

export default ContentResolver;
