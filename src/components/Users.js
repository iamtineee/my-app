import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Users() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res);
                setData(res.data);
                setFilteredUsers(res.data); // Initialize filteredUsers with all users
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                const newData = data.filter(user => user._id !== id);
                setData(newData);
                setFilteredUsers(newData); // Update filteredUsers after deletion
            })
            .catch(err => console.log(err));
    };

    const handleSearch = () => {
        const filtered = data.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredUsers(filtered);
    };

    const handleClearSearch = () => {
        setSearchTerm(""); // Clear search term
        setFilteredUsers(data); // Reset filtered users to all users
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success btn-sm">Add +</Link>
                <div style={{float: 'right'}}>
                <div className="input-group mt-3 mb-3">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}><i className="fas fa-search"></i> </button>
                    <button className="btn btn-outline-secondary" type="button" onClick={handleClearSearch}><i className="fas fa-sync-alt"></i></button>
                </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
