import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Updateprofile = (props) => {

    const navigate = useNavigate();
    const cityRef = useRef();
    const fullnameRef = useRef();
    const usernameRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const imageRef = useRef();

    const updatehandler=async(event)=>{

        event.preventDefault();
        const details={
            id:props.user._id,
            fullname: fullnameRef.current.value,
            username: usernameRef.current.value,
            city: cityRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            email: emailRef.current.value,
            image_url:imageRef.current.value
        }
        
         axios.post('http://localhost:5000/users/update-profile',details)

        navigate('/');
    }

   

    

  return (
    <>
      <Navbar/>
      <br/>
          <b><h1>Update profile</h1></b>
          <br/>
          <form onSubmit={updatehandler}>
              <input
                  type="text"
                  placeholder="Name"
                  defaultValue={props.user.fullname}
                  id="name"
                  ref={fullnameRef}
                  name="name"
                  className="input"
                  autoComplete="off"
                  required></input>
              <input
                  type="text"
                  placeholder="Name"
                  defaultValue={props.user.username}
                  id="username"
                  ref={usernameRef}
                  name="username"
                  className="input"
                  autoComplete="off"
                  required></input>
              <input
                  type="text"
                  defaultValue={props.user.city}
                  id="city"
                  name="city"
                  className="input"
                  ref={cityRef}
                  autoComplete="off"
                  required></input>
              <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  className="input"
                  defaultValue={props.user.email}
                  ref={emailRef}
                  autoComplete="off"
                  required></input>
              <input
                  type="text"
                  placeholder="Phone"
                  id="phone"
                  name="phone"
                  className="input"
                  ref={phoneNumberRef}
                  defaultValue={props.user.phone_number}
                  autoComplete="off"
              />
              <input
                  type="text"
                  placeholder="image url"
                  id="imageurl"
                  name="imageurl"
                  className="input"
                  defaultValue={props.user.image_url}
                  ref={imageRef}
                  autoComplete="off"
                  ></input>
              <br />
              <br />
              <button type="submit" className="submit">
                  Submit
              </button>
          </form>
    </>
  )
}

export default Updateprofile
