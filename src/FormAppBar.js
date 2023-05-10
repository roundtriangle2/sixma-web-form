import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";




/*
    Component responibkle for rendering an appbar in each of the forms.
    The appbar contains a back button to allow the user to 
    return to the user list and  also display a title to give context on the 
    form that is on screen

*/


function FormAppBar(props) 
{
return (

<>
<AppBar position="static" sx = {{marginBottom: "5%"}}>
  <Toolbar variant="dense">
    <IconButton onClick={props.goBack} edge="start" color="inherit"  sx={{ mr: 2 }}>
      <ArrowBack />
    </IconButton>
    <Typography >
      {props.title}
    </Typography>
  </Toolbar>
</AppBar>
 </>
    );






}




export default FormAppBar;