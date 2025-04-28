"use client"

import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import '../../styles/About.css';

function About() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start">
              <h1>About OED</h1>
              <p className="lead">
                The only food delivery app where you can order hassle-free and make a difference
              </p>
              <div className="hero-buttons">
                <Button variant="primary" as={Link} to="/menu" className="me-3">
                  Explore Menu
                </Button>
                <Button variant="outline-primary" as={Link} to="/donation">
                  Donate Food
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Delicious Food"
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="story-image-container">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                  alt="Our Restaurant"
                  className="story-image"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="section-content">
                <h6 className="section-subtitle">Our Story</h6>
                <h2 className="section-title">How We Started</h2>
                <p>
                  OED began with a simple idea: to create a food delivery service that not only provides delicious meals
                  but also makes a positive impact on the community. Founded in 2025, we've grown from a small startup to
                  a beloved service that connects people with great food and meaningful causes.
                </p>
                <p>
                  Our journey started when a group of food enthusiasts and tech innovators came together with a shared
                  vision of revolutionizing the food delivery experience. We wanted to create a platform that was not
                  only user-friendly but also socially responsible.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h6 className="section-subtitle">Our Purpose</h6>
              <h2 className="section-title">Mission & Vision</h2>
              <p className="section-description">
                We're committed to providing exceptional service while making a positive impact on our community.
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-4">
              <Card className="mission-card h-100">
                <Card.Body>
                  <div className="card-icon">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>
                    To provide a seamless food delivery experience that connects people with delicious meals while
                    empowering them to contribute to social causes. We strive to make food ordering hassle-free and
                    impactful.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="vision-card h-100">
                <Card.Body>
                  <div className="card-icon">
                    <i className="bi bi-eye"></i>
                  </div>
                  <Card.Title>Our Vision</Card.Title>
                  <Card.Text>
                    To become the leading food delivery platform that not only satisfies hunger but also nourishes
                    communities. We envision a world where every meal ordered can potentially help someone in need.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* What We Offer Section */}
      <section className="what-we-offer-section">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h6 className="section-subtitle">Our Services</h6>
              <h2 className="section-title">What We Offer</h2>
              <p className="section-description">
                At OED, we provide more than just food delivery. Explore our unique offerings that set us apart.
              </p>
            </Col>
          </Row>

          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-truck"></i>
                </div>
                <h3>Food Delivery</h3>
                <p>
                  Order delicious meals from your favorite restaurants and have them delivered right to your doorstep.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-heart"></i>
                </div>
                <h3>Food Donation</h3>
                <p>
                  Partner with NGOs to donate food to those in need. Make a difference with every meal you share.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-journal-richtext"></i>
                </div>
                <h3>Recipe Sharing</h3>
                <p>
                  Share your favorite recipes with our community and discover new culinary inspirations from others.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-newspaper"></i>
                </div>
                <h3>Food Articles</h3>
                <p>
                  Read informative articles about food, nutrition, cooking tips, and the latest culinary trends.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section
      <section className="team-section">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h6 className="section-subtitle">Our People</h6>
              <h2 className="section-title">Meet Our Team</h2>
              <p className="section-description">
                The passionate individuals behind OED who work tirelessly to bring you the best experience.
              </p>
            </Col>
          </Row>

          <Row>
            <Col lg={3} md={6} className="mb-4">
              <Card className="team-card">
                <div className="team-image-container">
                  <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Team Member"
                    className="team-image"
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>Sarah Johnson</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Founder & CEO</Card.Subtitle>
                  <div className="social-icons">
                    <a href="#" className="social-icon">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <Card className="team-card">
                <div className="team-image-container">
                  <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Team Member"
                    className="team-image"
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>Michael Chen</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">CTO</Card.Subtitle>
                  <div className="social-icons">
                    <a href="#" className="social-icon">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <Card className="team-card">
                <div className="team-image-container">
                  <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Team Member"
                    className="team-image"
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>Emily Rodriguez</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Head of Operations</Card.Subtitle>
                  <div className="social-icons">
                    <a href="#" className="social-icon">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <Card className="team-card">
                <div className="team-image-container">
                  <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Team Member"
                    className="team-image"
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>David Williams</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Marketing Director</Card.Subtitle>
                  <div className="social-icons">
                    <a href="#" className="social-icon">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="bi bi-envelope"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h6 className="section-subtitle">What People Say</h6>
              <h2 className="section-title">Customer Testimonials</h2>
              <p className="section-description">
                Don't just take our word for it. Here's what our customers have to say about their experience with OED.
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card h-100">
                <Card.Body>
                  <div className="testimonial-rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <Card.Text className="testimonial-text">
                    "OED has completely changed how I order food. The app is so easy to use, and I love that I can
                    contribute to food donation initiatives. The delivery is always on time, and the food is delicious!"
                  </Card.Text>
                  <div className="testimonial-author">
                    {/* <img
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Customer"
                      className="testimonial-author-image"
                    /> */}
                    <div>
                      <h5 className="testimonial-author-name">SATYAM POKHAREL</h5>
                      <p className="testimonial-author-title">Regular Customer</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="testimonial-card h-100">
                <Card.Body>
                  <div className="testimonial-rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <Card.Text className="testimonial-text">
                    "I've tried many food delivery apps, but OED stands out because of its social mission. Being able to
                    share recipes and read articles about food makes it more than just a delivery service. Highly
                    recommend!"
                  </Card.Text>
                  <div className="testimonial-author">
                    {/* <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Customer"
                      className="testimonial-author-image"
                    /> */}
                    <div>
                      <h5 className="testimonial-author-name">SWIKRITI BANIYA</h5>
                      <p className="testimonial-author-title">Food Enthusiast</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="testimonial-card h-100">
                <Card.Body>
                  <div className="testimonial-rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>
                  <Card.Text className="testimonial-text">
                    "What sets OED apart is their commitment to giving back. I've donated food through their platform
                    several times, and the process is seamless. The variety of restaurants available is impressive, and
                    the service is reliable."
                  </Card.Text>
                  <div className="testimonial-author">
                    {/* <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Customer"
                      className="testimonial-author-image"
                    /> */}
                    <div>
                      <h5 className="testimonial-author-name">SANSKAR KAFLE</h5>
                      <p className="testimonial-author-title">Loyal Customer</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2>Ready to Experience OED?</h2>
              <p className="lead">
                Join thousands of satisfied customers who enjoy delicious meals while making a positive impact.
              </p>
              <div className="cta-buttons">
                <Button variant="primary" as={Link} to="/menu" className="me-3">
                  Order Now
                </Button>
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default About

