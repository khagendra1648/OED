"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "../../styles/Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const login = "http://localhost:10000/auth/login/" // Backend API URL for login

      const response = await fetch(login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      })

      if (response.status === 400) {
        setError("Invalid credentials. Please try again.")
      } else {
        const body = await response.json()

        if (response.status === 200) {
          // Show success message
          alert("Login Successful")

          // Check role and redirect
          if (body.role === "admin") {
            alert("Admin Logged in successfully")
            // Redirect to admin dashboard
          } else {
            window.location = "http://localhost:3000/"
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />

      <div className="login-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <div className="container-login">
                <div className="header-login">
                  <div className="text-login">Login</div>
                  <div className="underline-login"></div>
                </div>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="haveaccount-login mt-3">
                    Don't have an account?
                    <Link to="/Registration">
                      <span>Register</span>
                    </Link>
                  </div>

                  <Button type="submit" className="btn btn-primary btn-block mt-4" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </>
  )
}

export default Login
