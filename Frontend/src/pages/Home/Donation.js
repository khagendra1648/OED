"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import '../../styles/Donation.css';

function Donation() {
  // State for form fields
  const [donate_name, setDonateName] = useState("")
  const [donated_price, setDonatedPrice] = useState("")
  const [donation_location, setDonationLocation] = useState("")
  const [donated_by, setDonatedBy] = useState("")

  // State for UI
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donateList, setDonateList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [donationStats, setDonationStats] = useState({
    totalDonations: 0,
    totalValue: 0,
    topLocations: [],
  })

  // Get user name from cookie
  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop().split(";").shift()
    }

    const _name = getCookie("userName")
    if (_name) {
      const name = decodeURIComponent(_name)
      setDonatedBy(name)
    }
  }, [])

  // Get donation count from localStorage
  const getInitialCount = () => {
    const savedCount = localStorage.getItem("count")
    return savedCount !== null ? Number(savedCount) : 0
  }

  const [count, setCount] = useState(getInitialCount)

  // Update localStorage when count changes
  useEffect(() => {
    localStorage.setItem("count", count)
  }, [count])

  // Handle form submission
  const handlePost = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const formData = new FormData()
      formData.append("donate_name", donate_name)
      formData.append("donated_by", donated_by)
      formData.append("donated_price", donated_price)
      formData.append("donation_location", donation_location)

      const addDonate = "http://localhost:10000/donate/create_donate"

      const addDonateResponse = await fetch(addDonate, {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const parsedData = await addDonateResponse.json()

      if (addDonateResponse.status === 200) {
        setSuccessMessage("You have successfully donated the food. Our team will connect to you.")

        // Update count and check if it's 3
        setCount((prevCount) => {
          const newCount = prevCount + 1
          if (newCount === 3) {
            setTimeout(() => {
              alert("Congratulations! You've made 3 donations. Thank you for your generosity!")
            }, 500)
            return 0
          }
          return newCount
        })

        // Reset form
        setDonateName("")
        setDonatedPrice("")
        setDonationLocation("")

        // Refresh donation list
        fetchDonateList()
      } else {
        if (parsedData.donate_name) {
          setError(parsedData.donate_name)
        } else if (parsedData.donated_by) {
          setError(parsedData.donated_by)
        } else if (parsedData.donation_location) {
          setError(parsedData.donation_location)
        } else if (parsedData.donated_price) {
          setError(parsedData.donated_price)
        } else {
          setError("An error occurred while submitting your donation. Please try again.")
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setError("An error occurred while submitting your donation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fetch donation list
  const fetchDonateList = () => {
    setIsLoading(true)
    fetch("http://localhost:10000/donate/get_donate")
      .then((response) => response.json())
      .then((data) => {
        setDonateList(data.data)

        // Calculate donation statistics
        if (data.data && data.data.length > 0) {
          const totalDonations = data.data.length
          const totalValue = data.data.reduce((sum, donation) => sum + Number(donation.donated_price || 0), 0)

          // Get top locations
          const locationCounts = {}
          data.data.forEach((donation) => {
            const location = donation.donation_location
            if (location) {
              locationCounts[location] = (locationCounts[location] || 0) + 1
            }
          })

          const topLocations = Object.entries(locationCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([location, count]) => ({ location, count }))

          setDonationStats({
            totalDonations,
            totalValue,
            topLocations,
          })
        }

        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        setIsLoading(false)
        setError("Failed to load donation data. Please try again later.")
      })
  }

  useEffect(() => {
    fetchDonateList()
  }, [])

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="donation-page">
      <Header />

      {/* Hero Section */}
      <div className="donation-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start">
              <h1>Donate Food, Save Lives</h1>
              <p className="lead">Your donation can make a difference in someone's life today</p>
              <div className="donation-counter">
                <div className="counter-label">Your donation streak:</div>
                <div className="counter-value">{count}/3</div>
                <div className="counter-progress">
                  <div className="progress-bar" style={{ width: `${(count / 3) * 100}%` }}></div>
                </div>
                <div className="counter-text">
                  {count === 0
                    ? "Start donating today!"
                    : count === 1
                      ? "Great start! Keep going!"
                      : count === 2
                        ? "Almost there! One more to go!"
                        : "Amazing! You're making a difference!"}
                </div>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Food Donation"
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="main-content">
        <Row>
          {/* Donation Form */}
          <Col lg={6} className="mb-5">
            <Card className="donation-form-card">
              <Card.Body>
                <h2 className="section-title">Make a Donation</h2>

                {successMessage && (
                  <Alert variant="success" className="mb-4">
                    {successMessage}
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handlePost}>
                  <Form.Group className="mb-3">
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter food name"
                      value={donate_name}
                      onChange={(e) => setDonateName(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Please specify the type and quantity of food you're donating
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Donation Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter pickup location"
                      value={donation_location}
                      onChange={(e) => setDonationLocation(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">Where should our team pick up the donation?</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Estimated Value</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter estimated value"
                      value={donated_price}
                      onChange={(e) => setDonatedPrice(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">Approximate value in dollars</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={donated_by}
                      onChange={(e) => setDonatedBy(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 donate-button" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Processing...</span>
                      </>
                    ) : (
                      "Donate Now"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Donation Stats */}
          <Col lg={6}>
            <div className="donation-stats-container">
              <h2 className="section-title">Donation Impact</h2>

              {isLoading ? (
                <div className="text-center my-5">
                  <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="mt-3">Loading donation data...</p>
                </div>
              ) : (
                <>
                  <Row className="stats-cards">
                    <Col md={6} className="mb-4">
                      <Card className="stat-card total-donations">
                        <Card.Body>
                          <div className="stat-icon">
                            <i className="bi bi-box2-heart"></i>
                          </div>
                          <div className="stat-value">{donationStats.totalDonations}</div>
                          <div className="stat-label">Total Donations</div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                      <Card className="stat-card total-value">
                        <Card.Body>
                          <div className="stat-icon">
                            <i className="bi bi-cash-stack"></i>
                          </div>
                          <div className="stat-value">{formatCurrency(donationStats.totalValue)}</div>
                          <div className="stat-label">Total Value</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Card className="recent-donations-card">
                    <Card.Body>
                      <h3 className="card-title">Recent Donations</h3>
                      {donateList.length > 0 ? (
                        <div className="recent-donations-list">
                          {donateList.slice(0, 5).map((donation, index) => (
                            <div key={donation.id || index} className="donation-item">
                              <div className="donation-item-header">
                                <div className="donation-name">{donation.donate_name}</div>
                                <div className="donation-price">{formatCurrency(donation.donated_price || 0)}</div>
                              </div>
                              <div className="donation-details">
                                <div className="donation-location">
                                  <i className="bi bi-geo-alt"></i> {donation.donation_location}
                                </div>
                                <div className="donation-by">
                                  <i className="bi bi-person"></i> {donation.donated_by}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-donations text-center py-4">
                          <div className="no-donations-icon">🍽️</div>
                          <p>No donations yet. Be the first to donate!</p>
                        </div>
                      )}
                    </Card.Body>
                  </Card>

                  {donationStats.topLocations.length > 0 && (
                    <Card className="top-locations-card mt-4">
                      <Card.Body>
                        <h3 className="card-title">Top Donation Locations</h3>
                        <div className="top-locations-list">
                          {donationStats.topLocations.map((item, index) => (
                            <div key={index} className="location-item">
                              <div className="location-name">{item.location}</div>
                              <div className="location-count">{item.count} donations</div>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>

        {/* How It Works Section */}
        <div className="how-it-works-section">
          <h2 className="section-title text-center">How It Works</h2>
          <Row className="mt-4">
            <Col md={4} className="mb-4">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Fill the Form</h3>
                <p>Provide details about the food you want to donate, including pickup location and estimated value.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>We Collect</h3>
                <p>Our team will contact you to arrange pickup of your donation at the specified location.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>We Distribute</h3>
                <p>Your donated food will be distributed to those in need through our network of community partners.</p>
              </div>
            </Col>
          </Row>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h2 className="section-title text-center">What Donors Say</h2>
          <Row className="mt-4">
            <Col md={6} lg={4} className="mb-4">
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-quote">
                    "I'm glad I could help those in need. The process was simple and the team was very responsive."
                  </div>
                  <div className="testimonial-author">- Sarah Johnson</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-quote">
                    "Donating excess food from our restaurant has been a rewarding experience. It's a win-win for
                    everyone."
                  </div>
                  <div className="testimonial-author">- Michael Chen, Local Restaurant Owner</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="testimonial-quote">
                    "The donation process is straightforward and efficient. I appreciate knowing my contribution is
                    making a difference."
                  </div>
                  <div className="testimonial-author">- David Williams</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      <Footer />
    </div>
  )
}

export default Donation
