import React, { useEffect, useState } from 'react';
import Logo from '../../images/logo1.png';
import './AdminIndex.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminIndex =()  =>{
    const [showLink, setShowLink] = useState(false);
    const [agent, setAgent] = useState([]);

    const toggleLinks = () => {
        setShowLink(!showLink);
    };

    useEffect(() => {
        getAllAgentDetails();
    }, []);

    const PostUser = (agentId,id) => {
        const approveUrl = `https://localhost:7117/api/TravelAgentRegister/register`;
    
        const postData = {
            name: agent[agentId].name,
            username: agent[agentId].username,
            email: agent[agentId].email,
            phone: agent[agentId].phone,
            aadharnumber : agent[agentId].aadharnumber,
            role: 'Agent',
            password: agent[agentId].password
        };
    
  
        console.log('Sending POST request with data:', postData);
    
        axios.post(approveUrl, postData, {
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you may need, such as authorization headers
            },
        })
            .then(response => {
                console.log('Response:', response);
                if (response.status === 200) {
                    toast.success('Agent added');
                    return response.data;

                } else {
                    // throw new Error('Failed to approve user');
                    toast.error('error');
                }
            })
            .then(data => {
                console.log('User approved:', data);
                const updatedAgents = agent.filter((_, index) => index !== agentId);
                DeleteAgent(id);
                setAgent(updatedAgents);
            })
            .catch(error => {
                console.error('Error approving Agent:', error);
            });
    };
    const DeleteAgent = (agentId) => {
        const deleteUrl = `https://localhost:7117/api/AdminUser?id=${agentId}`;

        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you may need, such as authorization headers
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log('Agent deleted successfully');
                    window.location.reload();
                } else {
                    throw new Error('Failed to delete agent');
                }
            })
            .catch(error => {
                console.error('Error deleting agent:', error);
            });
    };

    const getAllAgentDetails = () => {
        fetch('https://localhost:7117/api/TravelAgentRegister', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you may need, such as authorization headers
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch agent details');
                }
            })
            .then(data => {
                console.log('Agent details:', data);
                setAgent(data);
            })
            .catch(error => {
                console.error('Error fetching agent details:', error);
            });
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img className='image-logo' src={Logo} alt="Logo" />
                </div>
                <div className={`navbar-toggle ${showLink ? 'active' : ''}`} onClick={toggleLinks}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={`navbar-links ${showLink ? 'active' : ''}`}>
                    <li>Home</li>
                    <li>Image Gallery</li>
                    <Link to={'/'}><p style={{color:'black'}}>Logout</p></Link>
                </ul>
            </nav>

            <div className='totaldiv'>
                <div className='leftnav'>
                    <div>Approval List</div>
                    <div>Add Images</div>
                    <div>Available Agencies</div>
                </div>
                <h3 className="card-title" style={{ marginLeft: '320px' }}>Agent Approval List</h3>
                <div className="approvallist">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                {/* <th>Password</th> */}
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agent.map((agents, index) => (
                                <tr key={index}>
                                    
                                    <td>{agents.username}</td>
                                    <td>{agents.name}</td>
                                    <td>{agents.phone}</td>
                                    <td>{agents.email}</td>
                                    {/* <td>{agents.password}</td> */}
                                    <td><button onClick={() => PostUser(index,agents.id)}>Accept</button></td>
                                    <td><button onClick={() => DeleteAgent(agents.id)}>Reject</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminIndex