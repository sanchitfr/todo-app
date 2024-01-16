import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Header, Form, Input, Icon, Button, Container} from 'semantic-ui-react';

let endpoint = "http://localhost:9000"

function ToDoList(){
    const [task, setTask] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        getTasks()
    }, [])

    const handleSubmit = () => {
        if(task){
            axios.post(endpoint + "/api/task",
            JSON.stringify({"task": task}),
            {
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded",
                },
            }).then(res => {
                getTasks();
                setTask("");
            })
        }
    }

    const handleInputChange = (event) => {
        setTask(event.target.value)
    }

    const getTasks = async () => {
        let res = await axios.get(endpoint + "/api/task")
        if(res.data == null) setItems([])
        if(res.data){
            setItems(res.data)
        }
    }

    const undoTask = async (id) => {
        let res = await axios.put(endpoint + "/api/undoTask/" + id,{
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
        })

        console.log(res);
        getTasks();
    }

    const deleteTask = async (id) => {
        await axios.delete(endpoint + "/api/deleteTask/" + id, {
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })

        getTasks();
    }

    const updateTask = async (id) => {
        await axios.put(endpoint + "/api/task/" + id, {
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })

        getTasks();
    }

    return(
        <Container>
            <Header className='header' as='h1' textAlign='center' color="orange">
                TO DO LIST
            </Header>
            <div className="row">
                <Form onSubmit={handleSubmit}>
                    <Input
                    type="text"
                    name="task"
                    onChange={(e) => handleInputChange(e)}
                    value={task}
                    fluid
                    placeholder="create task"
                    />
                    <Button style={{marginTop:"2%", marginBottom: "2%"}} fluid> Create Task </Button>
                </Form>
            </div>
            <div className="row">
                <Card.Group>
                    {
                        items.map( item =>
                                <Card key={item._id} color='red' fluid className='taskcard'>
                                    <Card.Header textAlign="left">
                                        <div className={item.status ? "completed tasktext" : "tasktext"}>{item.task}</div>
                                    </Card.Header>
                                    <Card.Meta textAlign='right'>
                                        <Icon style={{margin:"auto 0"}} size='large' name="check circle" color="green" onClick={() => updateTask(item._id)} />
                                        <Icon size='large' name="undo" color="yellow" onClick={() => undoTask(item._id)} />
                                        <Icon size='large' name="delete" color="red" onClick={() => deleteTask(item._id)} />
                                    </Card.Meta>
                                </Card>
                        )
                    } 
                </Card.Group>
            </div>
        </Container>
    )
}

export default ToDoList;