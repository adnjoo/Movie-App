import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { backendURL } from "./sharedVariables";

const Profile = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState('')

  async function getName() {
    try {
      const response = await fetch(`${backendURL}dashboard/`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();

      console.log(parseRes);
      //set name
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  // const logout = (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem("token");
  //   setAuth(false);
  //   toast.success("Logged out successfully.");
  // };

  useEffect(() => {
    getName();
  }, []);

  //form will trigger this function to change name
  const changeName =  async (e) => {
    e.preventDefault()
    const body = {
      name: newName
    };
    // console.log("changeName", newName);
    const response = await fetch(`${backendURL}dashboard/changeName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    console.log(parseRes);
    //update new name
    getName();
  };

  return (
    <Container className='my-5 registerloginbox'>
      <h2>Welcome {name}</h2>
      <h3>Dashboard</h3>
      <Form
        onSubmit={(e) => {
          console.log('test')
          changeName(e);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="name" 
          value={newName} 
          placeholder={name}
          onChange={e=>setNewName(e.target.value)} />
        </Form.Group>
      <Button variant="primary" type="submit">
        Save changes
      </Button>
      </Form>
      <br></br>
      {/* <button className={"btn btn-primary mt-5"} onClick={(e) => logout(e)}>
        <Logout></Logout>
      </button> */}
    </Container >
  );
};

export default Profile;