import React, { useState } from 'react'
import './Login.css'
import logo from '../../src/assets/logo.svg'
import api from '../services/api'

export default function Login({ history }) {
    const [username, setUsername] = useState('')

    async function RandomSubmit(e) {
        e.preventDefault()

        const resp = await api.post('/devs', { username, })
        console.log(resp)

        const { _id } = resp.data;


        history.push(`/dev/${_id}`)
    }


    return (
        <div className="login-container" >
            <form onSubmit={handlesubmit} >
                <img src={logo} alt="TindDev" />
                <input
                    placeholder="Insira o seu usuario do github"
                    value={username}
                    onChange={event => { setUsername(event.target.value) }}
                />
                <button type="submit" >Enviar</button>
            </form>
        </div>
    );


}
