import React, { useState } from 'react'

export default ({ handleCreate }) => {
    const userInitialState = {id: null, name: '', email: '', phone: ''}
    const [user, setUser] = useState(userInitialState)

    const handleNameChange = (value) => {
        setUser({...user, name: value})
    }

    const handleEmailChange = (value) => {
        setUser({...user, email: value})
    }

    const handlePhoneChange = (value) => {
        setUser({...user, phone: value})
    }

    return (
        <>
            <h2>Add User Form</h2>
            <form onSubmit={(e) => {
                e.preventDefault()

                if(!user.name || !user.email || !user.phone) return
                handleCreate(user)
                setUser(userInitialState)
            }}>
                <label>Name</label>
                <br/>
                <input type="text" value={user.name} onChange={e => handleNameChange(e.target.value)}/>
                <br/>
                <label>Email</label>
                <br/>
                <input type="text" value={user.email} onChange={e => handleEmailChange(e.target.value)}/>
                <br/>
                <label>Phone</label>
                <br/>
                <input type="phone" value={user.phone} onChange={e => handlePhoneChange(e.target.value)}/>
                <br/>
                <button>Add</button>
            </form>
        </>
    )
}