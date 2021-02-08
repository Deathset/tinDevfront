import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import './Main.css';
import api from '../services/api'
import logo from '../../src/assets/logo.svg'
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'
import itsamatch from '../assets/match/itsamatch.png'



export default function Main({ match }) {

    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)
    useEffect(() => {
        async function loadUsers() {
            const resp = await api.get('/devs', {
                headers: { user: match.params.id }
            })

            setUsers(resp.data)
        }
        loadUsers()
    }, [match.params.id])

    useEffect(() => {
        const socket = io('http://0:0:0>0:3333', {
            query: { user: match.params.id }
        })
        socket.on('match', dev => setMatchDev(dev))
    }, [match.params.id])


    async function handleLiketoUser(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        })
        setUsers(users.filter(user => user._id !== id))
    }  

    return (
        <div className="main_container" >
            <Link to="/" >
                <img src={logo} alt="Tindev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (<li key={user._id}>
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>

                        <div className="buttons">
                            <button type="button" onClick={() => handleLiketoUser(user._id)}>
                                <img src={dislike} />
                            </button> 
                        </div>
                    </li>)

                    )}
                </ul>
            ) : (
                    <div className="empty"> Acabou!!! :(</div>
                )}

            { matchDev && (
                <div className="match_container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={matchDev.avatar} alt="avatar" />
                    <strong> {matchDev.name} </strong>
                    <p>{matchDev.bio}</p>
                    <button type='button' onClick={() => setMatchDev(null)}>Fechar!</button>
                </div>
            )

            }
        </div>
    )
}