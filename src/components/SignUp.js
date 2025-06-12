import React from 'react';

import { useState,useEffect } from 'react';

import { validate } from './validate';
import { notify } from "./toast";
import styles from "./signUp.module.css"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom"

const SignUp = () => {
    
    const [data,setData] = useState({
        name : '',
        email : '',
        password : '',
        confirmPassword : '',
        isAccepted : false
    })

    const [errors,setErrors] = useState({});
    const [touched,setTouched] = useState({});

    const changeHandeler = (event) => {
        if(event.target.name === "isAccepted") {
            setData({...data, [event.target.name] : event.target.checked })
        } else {
            setData({...data, [event.target.name] : event.target.value})
        }
    }

    const focusHandeler = (event) => {
        setTouched({...touched, [event.target.name] : true})
    }

    const submitHandeler = (event) =>{
        event.preventDefault()
        if (!Object.keys(errors).length) {
            notify("You signed in successfully", "success")
        } else {
            notify("Invalid data!", "error")
            setTouched({
                name : true,
                email : true,
                password : true,
                confirmPassword : true,
                isAccepted : true
            })
        }
    }
    
    useEffect(() => {
        setErrors(validate(data,"signup"))
    },[data,touched])

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandeler} className={styles.formContainer}>
                <h2 className={styles.header}>SignUp</h2>
                <div className={styles.formField} >
                    <label>Name</label> 
                    <input className={(errors.name && touched.name) ? styles.uncompleted : styles.formInput} type='text' name='name' value={data.name } onChange={changeHandeler} onFocus={focusHandeler}/>
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formField} >
                    <label>Email</label>
                    <input className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput} type='text' name='email' value={data.email } onChange={changeHandeler} onFocus={focusHandeler}/>
                    {errors.email && touched.email &&<span>{errors.email}</span>}
                </div>
                <div className={styles.formField} >
                    <label>Password</label>
                    <input className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput} type='password' name='password' value={data.password } onChange={changeHandeler} onFocus={focusHandeler}/>
                    {errors.password && touched.password &&<span>{errors.password}</span>}
                </div>
                <div className={styles.formField} >
                    <label>ConfirmPassword</label>
                    <input className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput} type='password' name='confirmPassword' value={data.confirmPassword } onChange={changeHandeler} onFocus={focusHandeler}/>
                    {errors.confirmPassword && touched.confirmPassword &&<span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField} >
                    <div className={styles.checkBoxContainer}>
                        <label>I accept of privacy policy</label>
                        <input type='checkbox' name='isAccepted' value={data.isAccepted } onChange={changeHandeler} onFocus={focusHandeler}/>
                        {errors.isAccepted && touched.isAccepted &&<span>{errors.isAccepted}</span>}
                    </div>
                </div>
                <div className={styles.formButtons}>
                    <Link to="/login">Login</Link>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;