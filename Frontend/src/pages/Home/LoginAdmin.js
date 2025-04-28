import React, { useState } from 'react';
import '../../styles/Login.css';
import { useNavigate, Link } from 'react-router-dom';

function LoginAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        let login = 'http://localhost:10000/auth/LoginAdmin/'  // Backend API URL for admin login 

        fetch(login, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include'
        }).then(data => {
            
            if (data.status == 400) {
                alert('Invalid admin credentials');
            }
            else{
                data.json().then(body => {
                    if (data.status === 200) {
                        if(body.role === "admin"){
                            alert("Admin Logged in successfully");
                            window.location="http://localhost:3000/Admindashboard/"  // Redirect to admin dashboard
                        } else {
                            alert("You are not authorized as admin");
                        }
                    }
                })
            }
   
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className='container-login'>
            <div className="header-login">
                <div className="text-login">Admin Login</div>
                <div className="underline-login"></div>
            </div>

            <form>
                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form1Example1">Admin Email</label>
                    <input required type="email" id="form1Example1" class="form-control" placeholder='Enter Admin Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form1Example2">Password</label>
                    <input required type="password" id="form1Example2" class="form-control" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div class="row mb-4">
                    <div className="haveaccount-login mt-3">
                        Regular user? 
                        <Link to="/login">
                            <span> User Login</span>
                        </Link>
                    </div>
                </div>

                <button type='submit' class="btn btn-primary btn-block" onClick={handleLogin}>Admin Sign in</button>
            </form>
        </div>
    );
}

export default LoginAdmin;