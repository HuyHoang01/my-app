import React from 'react'

export default ({ users, handleDelete, editRow }) => {
    
    return (
        <>
            <h2>Users table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.phone}
                                </td>
                                <td>
                                    <button onClick={() => {editRow(user)}}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        if(!window.confirm('Are you sure you want to delete this?')) return
                                        handleDelete(user.id)
                                        }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
        
    )
}