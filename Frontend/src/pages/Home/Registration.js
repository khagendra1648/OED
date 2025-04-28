// Registration.js
import React, { useState } from 'react';
import '../../styles/Registration.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

function Registration() {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error messages
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    number: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const role = 'user';

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrors({
      first_name: '',
      last_name: '',
      number: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
    });

    // Validation: Check if any required field is empty
    if (!first_name || !last_name || !number || !email || !address || !password || !confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        first_name: !first_name ? 'First name is required' : '',
        last_name: !last_name ? 'Last name is required' : '',
        number: !number ? 'Phone number is required' : '',
        email: !email ? 'Email is required' : '',
        address: !address ? 'Address is required' : '',
        password: !password ? 'Password is required' : '',
        confirmPassword: !confirmPassword ? 'Confirm password is required' : '',
      }));
      return;
    }

    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
      return;
    }

    const registerUrl = 'http://localhost:10000/auth/register/';

    try {
      const response = await fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, number, email, address, password, confirmPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const body = await response.json();

      if (response.ok) {
        alert('User created successfully!');
        navigate("/Login");
      } else {
        if (body?.message) {
          alert(body.message);
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCard>
          <MDBCardBody className='px-4'>
            <div className="header-login mb-3">
              <div className="text-login">Register</div>
              <div className="underline-login"></div>
            </div>

            <MDBRow>
              <MDBCol md='6'>
                <label>First Name</label>
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  size='lg'
                  type='text'
                  placeholder='Enter Your First Name'
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
              </MDBCol>

              <MDBCol md='6'>
                <label>Last Name</label>
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  size='lg'
                  type='text'
                  placeholder='Enter Your Last Name'
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md='6'>
                <label>Email</label>
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  size='lg'
                  type='email'
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </MDBCol>

              <MDBCol md='6'>
                <label>Phone</label>
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  size='lg'
                  type='number'
                  placeholder='Enter Your Phone'
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                {errors.number && <small className="text-danger">{errors.number}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md='6'>
                <label>Address</label>
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  size='lg'
                  type='text'
                  placeholder='Enter Your Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <small className="text-danger">{errors.address}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md='6'>
                <label>Password</label>
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  size='lg'
                  type='password'
                  placeholder='Enter Your Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </MDBCol>

              <MDBCol md='6'>
                <label>Confirm Password</label>
                <MDBInput
                  required
                  wrapperClass='mb-4'
                  size='lg'
                  type='password'
                  placeholder='Confirm Your Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </MDBCol>
            </MDBRow>

            <button type='submit' className="btn btn-primary btn-block" onClick={handleRegister}>Register</button>

            <div className="haveaccount-login mt-5" style={{ textAlign: "center" }}>
              Already have an account?{' '}
              <Link to="/Login">
                <span>Login</span>
              </Link>
            </div>

          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default Registration;
