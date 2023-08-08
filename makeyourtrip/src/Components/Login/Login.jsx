import React, { useState,useEffect } from 'react';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logn from '../../images/login.svg'
import image1 from '../../images/logo1.png'


const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };
    const nav = useNavigate('')

    const handleLogin = async () => {
        try {
            // Simulating a mock API call with a delay
            const response = await fetch('https://localhost:7117/api/AdminUser/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data)
                sessionStorage.setItem('accessToken', data.accessToken)
                sessionStorage.setItem('refreshToken', data.refreshToken);
                sessionStorage.setItem('role', data.role);
                sessionStorage.setItem('Id', data.id);
                // You can handle the authentication token or user data here
                // For now, let's just display a success toast message
                toast.success('Login successful!');
                if (data.role === 'Admin') {
                    return nav('/adminpage');
                }
                else if (data.role === 'TravelAgent') {
                    return nav('/agentmainpage');
                }
                else if (data.role === 'User'){
                    return nav ('/getallpacks');
                }
            } else {
                // Handle login failure
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Plese check login.');
        }
    };

    return (
        <div className='container'>
            <nav className="navbar position-fixed">
                <div className="navbar-logo">
                    <div className='combine'>
                        <div><img src={image1} alt="" className='logo' /></div>
                        <div className="brandname">MakeTrip</div>
                    </div>
                </div>

            </nav>
            <div className=" loginpgs">

                <div>
                    <img src={logn} alt="" srcset="" style={{ width: '100%', height: '400px', marginTop: '100px' }} />
                </div>
                <div className="login-container bg-white">
                    <div className="login-title">Login</div>
                    <div className="input-container">
                        <TextField
                            sx={{
                                width: '350px',
                                fontSize: '18px'
                            }}
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={loginInfo.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <TextField
                            sx={{
                                width: '350px'
                            }}
                            type="password"
                            label="Password"
                            variant="outlined"
                            name="password"
                            value={loginInfo.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="btncntr">
                        <div>
                            <button className='register' style={{ margin: '5px' }} onClick={handleLogin}>Login</button>

                        </div>
                        <div>
                            <Link to={'/register'}><button className='register' style={{ margin: '5px' }}>Sign-Up</button></Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
};

export default Login;