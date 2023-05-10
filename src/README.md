webapp for interacting with spring rest api

The webapp consists of a "Content resolver " component that
renders the appropriate component according to user input.

By default the ListPeople component is displayed,
then when a user entry is clicked the ViewEntry
component is rendered instead.

The ListPeople component also contains a button
that when clicked renders the CreateUser component, were
new usser data can be input and sent to the server

Small custom components that wrap  UI components were used in order to reduce overall component
size and to further specialize the responsabilities of each component.

A future improvement could merge the VIewEntry and CreateUser into one component,
this would not reduce component count however, and the component used to generalize
the form logic could end up bing more complex than the one found in each of the separate
form components. This implementation meets the demonstration requirements so it is left as is.

Another imporvement tht can be made is the localization of validation errors according the users language,
and modify them to be more user friendly

