import React from 'react'
import RegisterForm from '../components/Login_Signup/RegisterForm'
import '../components/Login_Signup/signup_css.css';
import RegisterFooter from '../components/Login_Signup/RegisterFooter'

const Register = (props) => {
  return (
    <>
    {/* props.onRegister = onRegister (App.js) */}
      <RegisterForm onSubmitForm = {props.onRegister}/>
      <RegisterFooter />
    </>
  )
}

export default Register
