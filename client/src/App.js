import React from 'react';
import {Container} from 'semantic-ui-react'
import "./App.css"
import ToDoList from './ToDoList';


function App(){
  return(
    <Container style={{marginTop: "10%"}}>
      <ToDoList/>
    </Container>
  )
}

export default App;