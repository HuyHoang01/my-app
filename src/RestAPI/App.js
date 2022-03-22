import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserTable from './UserTable'
import AddForm from './AddForm'
import EditForm from './EditForm'

export default () => {
    const currentUserState = {id: null, name: '', email: '', phone: ''}
    const [users, setUsers] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [currentUser, setCurrentUser] = useState(currentUserState)
    //fetchData
    useEffect(() => {
        axios.get('http://localhost:1234/users')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    }, [])
    
    //create user
    const handleCreate = (user) => {
        user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1
        setUsers([...users, user])
        console.log(user.id)

        axios.post('http://localhost:1234/users', user)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //update user
    const editRow = (user) => {
        setEditMode(true)

        setCurrentUser(user)
    }

    const handleUpdate = (id, updatedUser) => {
        setEditMode(false)
        console.log(users.map(user => {
            return user.id === id ? updatedUser : user
        }))
        setUsers(users.map(user => {
            return user.id === id ? updatedUser : user
        }))

        axios.put('http://localhost:1234/users/'+id, updatedUser)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //delete user
    const handleDelete = (id) => {
        setEditMode(false)
        setUsers(users.filter(user => user.id !== id))

        axios.delete('http://localhost:1234/users/'+id)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return(
        <>
            <h1>Rest API Demo</h1>
            <div className="flex-row">
                {
                    !editMode ? (
                        <div className="flex-large">
                            <AddForm handleCreate={handleCreate}/>
                        </div>
                    ):(
                        <div className="flex-large">
                            <EditForm handleUpdate={handleUpdate} currentUser={currentUser} setEditMode={setEditMode}/>
                        </div>
                    )
                }
                <div className="flex-large">
                    <UserTable users={users} handleDelete={handleDelete} editRow={editRow}/>
                </div>
            </div>
        </>
        
    )
}