import { useState, useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import s from './index.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, FormControl } from 'react-bootstrap';
import { Row, Col, Button, ListGroup } from "react-bootstrap";

function MyToDoFun() {
    const [hidden, setHidden] = useState(false);
    const [value, setValue] = useState("");
    const [elArray, setElArray] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("elArray");
        setElArray(JSON.parse(data))
    }, []);

    useEffect(() => {
        localStorage.setItem("elArray", JSON.stringify(elArray))
    }, [elArray]);

    const changeArrFl = (id, flagNew) => {
        elArray[id].flag = flagNew;
        setElArray(elArray);
        localStorage.setItem("elArray", JSON.stringify(elArray))
    }

    const changeArrTxt = (id, textNew) => {
        elArray[id].text = textNew;
        setElArray(elArray);
        localStorage.setItem("elArray", JSON.stringify(elArray))
    }

    const handleClick = () => {
        let element = {
            id: elArray.length,
            text: value,
            flag: true,
        }
        addToSpisok(element);
        setValue("");
    }

    let isExist = false;

    const addToSpisok = (element) => {
        if (element.text == "") {
            isExist = true;
            alert("mistake, you cannot add empty value");
            return;
        }

        elArray.forEach(elements => {
            if (element.text == elements.text) {
                isExist = true;
                alert("mistake, this element already exist");
                return;
            }
        })

        if (!isExist) {
            setElArray(current => [...current, element]);
        }
    }

    const addAllTasks = () => {
        setHidden(true);
    }

    const hideTasks = () => {
        setHidden(false);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className={s.todo}>ToDo List</div>
                </Col>
            </Row>

            <Row>
                <Col className={s.root3}>
                    <FormControl type='text'
                     className={s.inputAdd}
                      placeholder='write here...' 
                      value={value} 
                      onChange={e => setValue(e.target.value)} 
                      />
                    <Button variant="danger" 
                    onClick={handleClick}
                     className={s.btn}>Add</Button>

                    <Button variant="danger" onClick={addAllTasks} className={s.btn}>AllTasks</Button>
                    <Button variant="danger" onClick={hideTasks} className={s.btn}>Hide</Button>
                </Col>
            </Row>
            <ul>
                {elArray.map((number) =>

                (<CreateLi
                    number={number}
                    key={number.id}
                    flagChan={changeArrFl}
                    textChan={changeArrTxt}
                    isHidden={hidden}
                />))}
            </ul>
        </Container>
    )
}

function CreateLi(props) {
    const [buttName, setButtName] = useState("edit");
    const [elText, setElText] = useState(props.number.text);
    const [rdonly, setRdonly] = useState(true)
    const [checked, setChecked] = useState(false);
    
    const handleClick = (e) => {
        setChecked(!checked);
        props.flagChan(props.number.id, !e.target.checked);
    }

    const butClick = () => {
        if (buttName == "edit") {
            setRdonly(false);
            setButtName("save");
        } else if (buttName == "save") {
            props.textChan(props.number.id, elText);
            setRdonly(true);
            setButtName("edit");
        }
    }
    return (
        <ListGroup className={s.lgroup}>
            <ListGroup.Item variant="info" 
                style={{
                    display: props.isHidden ? "block" : props.number.flag ? 'block' : 'none',
                }}>

                <input className={s.inputText2} type="text" value={elText} readOnly={rdonly} onChange={e => setElText(e.target.value)} />
                <input type="checkbox" checked={!props.number.flag} onChange={handleClick}  className={s.checkBox}/>
                <Button onClick={butClick} className={s.btn2}>{buttName}</Button>
            </ListGroup.Item>
        </ListGroup>
    )
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyToDoFun />);
