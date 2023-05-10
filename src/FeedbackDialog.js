import { Dialog } from "@mui/material";
import {Alert} from "@mui/material";
function FeedbackDialog(props) 
{
    let message = resolveMessage(props.reason)
    let type = props.reason.result

/*
    This component renders a fullscreen dialog depending on
    the server response when a user sends data to the server.
    Clicking on the dialog will send the user to the user list
    regardless if there was an error or not.

*/
return (
 <>


<Dialog onClose={props.handleClose} open={props.open}>
     
    <Alert severity={type}>{message}</Alert>
    </Dialog>
 </>
 
 
    );

}



//Function for renderring the apropriate message given an action and the servers response or lack therof for that action
function resolveMessage(reasonObj)
{
    let message = ""
    if(reasonObj.action == "updating"){
        message = reasonObj.result ==  "success" ? "Se actualizo la informacion exitosamente" : "Error al actualizar la informacion de el usuario."

    }

    else if(reasonObj.action == "deleting"){
        message = reasonObj.result ==  "success" ? "Se elimino el usuario informacion exitosamente" : "Error al eliminar usuario."

    }
    else{
        message = reasonObj.result ==  "success" ? "Se añadio el usuario exitosamente" : "Error al añadir usuario."

    }
    return message;
   
}


export default FeedbackDialog;