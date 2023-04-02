import React, { useState } from 'react'
import classes from "./Auth.module.css"
import { Link, useNavigate } from 'react-router-dom'
import Inputs from '../../components/Inputs'
import Buttons from '../../components/Buttons'
import axios from 'axios'
import { toast } from 'react-toastify'

interface Prors {
    GetToken: Function
}

const Login: React.FC<Prors> = ({ GetToken }) => {
    const [email, SetEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const LoginHandler = async (e: any) => {
        e.preventDefault()
        if (email && password) {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_URL}/api/login`, {
                email,
                password
            })
                .then(res => {
                    window.sessionStorage.setItem("token", res.data.token)
                    toast.success("Success✔")
                    GetToken()
                    navigate('/')
                })
                .catch(err => {
                    toast.error("Error!")
                })
            setLoading(false)
        } else {
            toast.error("Error!")
        }
    }

    return (
        <div className={classes.Register}>
            <div className={classes.register_form}>
                <h2>Login</h2>
                <form>
                    <Inputs type={"email"} classes={classes.FormControl} title={"Email Address"} value={email} setValue={SetEmail} />
                    <Inputs type={"password"} classes={classes.FormControl} title={"Password"} value={password} setValue={SetPassword} />

                    <Buttons classes={classes.btn} title={"Login"} OnClick={LoginHandler} loading={loading} />
                    <p className={classes.form_footer}>
                        Don't have an account? <Link to={"/register"}>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login