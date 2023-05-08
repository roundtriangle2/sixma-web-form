import React from "react";
import ListPeople from "./ListPeople";
import ViewEntry from "./ViewEntry"
function ContentResolver() {

  const [contentPage, setContentPage]  = React.useState(1);
  const [ focused , setFocused] = React.useState(0);



  switch (contentPage){
  case 1: 
    return <ListPeople changeContent={setContentPage}></ListPeople>
    break;
  case 2:
    return <ViewEntry focusedId={focused} changeContent={setContentPage}></ViewEntry> //view and or dit user user
    break;

    case 3:
    return <ListPeople changeContent={setContentPage}></ListPeople> // Create user
    break;
  default:
    return <ListPeople changeContent={setContentPage}></ListPeople>
  }
}

export default ContentResolver;
