"use client"

import { useEffect } from "react"
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import '../../styles/HomeStyle.css';

const Homepage = () => {
  // Tawk.to chat widget integration
  useEffect(() => {
    var Tawk_API = Tawk_API || {}
    var Tawk_LoadStart = new Date()

    const script = document.createElement("script")
    script.async = true
    script.src = "https://embed.tawk.to/6809abb64667bd190d1c3bc3/1ipisdgds"
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")
    document.body.appendChild(script)

    // Cleanup
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero_section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} md={10}>
              <div className="hero_text text-center">
                <h1>OED: ORDER EAT DELIVERY</h1>
                <h2>Delicious Food at Your Doorstep</h2>
                <p className="pt-2 pb-4">
                  OED is the platform where you can order delicious food, donate to those in need, and share your
                  favorite recipes.
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/menu" className="btn-primary me-3">
                    Order Now
                  </Button>
                  <Button as={Link} to="/donation" className="btn-outline-light">
                    Donate Food
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features_section">
        <Container>
          <h2 className="text-center">Our Services</h2>
          <p className="para text-center">Discover what makes OED special and how we can serve you better.</p>

          <Row className="mt-5">
            <Col lg={3} md={6} className="mb-4">
              <div className="feature_box text-center">
                <div className="feature_icon">
                  <i className="bi bi-truck"></i>
                </div>
                <h3>Fast Delivery</h3>
                <p>Get your favorite food delivered to your doorstep in minutes, not hours.</p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div className="feature_box text-center">
                <div className="feature_icon">
                  <i className="bi bi-heart"></i>
                </div>
                <h3>Food Donation</h3>
                <p>Donate food to those in need through our partnership with local NGOs.</p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div className="feature_box text-center">
                <div className="feature_icon">
                  <i className="bi bi-journal-richtext"></i>
                </div>
                <h3>Recipe Sharing</h3>
                <p>Share your favorite recipes with our community and discover new ones.</p>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <div className="feature_box text-center">
                <div className="feature_icon">
                  <i className="bi bi-star"></i>
                </div>
                <h3>Quality Food</h3>
                <p>We partner with the best restaurants to ensure you get top-quality meals.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about_section">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center">
              <h2>The only food delivery app where you can order hassle-free</h2>
              <p>
                In OED we provide users a user-friendly interface so that they can easily place their orders and get
                them delivered at their home. Also, we have tied up with NGOs to donate food if they want. They can also
                share their recipes and read articles about food and nutrition.
              </p>
              <Button as={Link} to="/about" className="btn-primary mt-3">
                Learn More About Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how_it_works_section">
        <Container>
          <h2 className="text-center">How It Works</h2>
          <p className="para text-center">Order your favorite food in just a few simple steps.</p>

          <Row className="mt-5">
            <Col md={4} className="mb-4">
              <div className="step_box text-center">
                <div className="step_number">1</div>
                <h3>Choose Your Food</h3>
                <p>Browse our extensive menu and select your favorite dishes from top restaurants.</p>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="step_box text-center">
                <div className="step_number">2</div>
                <h3>Place Your Order</h3>
                <p>Customize your order, add special instructions, and proceed to checkout.</p>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="step_box text-center">
                <div className="step_number">3</div>
                <h3>Enjoy Your Meal</h3>
                <p>Sit back and relax as we deliver your delicious meal right to your doorstep.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Popular Menu Section */}
      <section className="popular_menu_section">
        <Container>
          <h2 className="text-center">Popular Menu Items</h2>
          <p className="para text-center">Discover our most ordered and highly rated dishes.</p>

          <Row className="mt-4">
            <Col lg={4} md={6} className="mb-4">
              <Card className="menu_card">
                <div className="menu_image">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Pizza"
                  />
                  <div className="menu_badge">Bestseller</div>
                </div>
                <Card.Body>
                  <div className="menu_rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                    <span>5</span>
                  </div>
                  <Card.Title>Margherita Pizza</Card.Title>
                  <Card.Text>Fresh tomatoes, mozzarella cheese, basil, and our special sauce.</Card.Text>
                  <div className="menu_price_action">
                    <div className="menu_price">NPR1000.00
                    </div>
                    <Button as={Link} to="/menu" className="btn-sm btn-primary">
                      Order Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <Card className="menu_card">
                <div className="menu_image">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Burger"
                  />
                  <div className="menu_badge">Popular</div>
                </div>
                <Card.Body>
                  <div className="menu_rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                    <span>4.0</span>
                  </div>
                  <Card.Title>Spicy Chicken Burger</Card.Title>
                  <Card.Text>Juicy Chicken patty, cheddar cheese, lettuce, tomato, and special sauce.</Card.Text>
                  <div className="menu_price_action">
                    <div className="menu_price">NPR450.00</div>
                    <Button as={Link} to="/menu" className="btn-sm btn-primary">
                      Order Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <Card className="menu_card">
                <div className="menu_image">
                  <img
                    src="https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Pasta"
                  />
                  <div className="menu_badge">New</div>
                </div>
                <Card.Body>
                  <div className="menu_rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <span>5.0</span>
                  </div>
                  <Card.Title>Creamy Alfredo Pasta</Card.Title>
                  <Card.Text>Fettuccine pasta with creamy alfredo sauce, grilled chicken, and parmesan.</Card.Text>
                  <div className="menu_price_action">
                    <div className="menu_price">NPR699</div>
                    <Button as={Link} to="/menu" className="btn-sm btn-primary">
                      Order Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button as={Link} to="/menu" className="btn-primary">
              View Full Menu
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials_section">
        <Container>
          <h2 className="text-center">What Our Customers Say</h2>
          <p className="para text-center">Don't just take our word for it. Here's what our customers have to say.</p>

          <Carousel className="testimonial_carousel mt-5">
            <Carousel.Item>
              <div className="testimonial_item">
                <div className="testimonial_content">
                  <div className="testimonial_rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    "OED has completely changed how I order food. The app is so easy to use, and I love that I can
                    contribute to food donation initiatives. The delivery is always on time!"
                  </p>
                  <div className="testimonial_author">
                    {/* <img
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Customer"
                      className="testimonial_author_image"
                    /> */}
                    <div>
                      <h5>SATYAM POKHAREL</h5>
                      <p>Regular Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="testimonial_item">
                <div className="testimonial_content">
                  <div className="testimonial_rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>
                  <p>
                    "I've tried many food delivery apps, but OED stands out because of its social mission. Being able to
                    share recipes and read articles about food makes it more than just a delivery service."
                  </p>
                  <div className="testimonial_author">
                    {/* <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Customer"
                      className="testimonial_author_image"
                    /> */}
                    <div>
                      <h5> SWIKRITI BANIYA  </h5>
                      <p>Food Enthusiast</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="testimonial_item">
                <div className="testimonial_content">
                  <div className="testimonial_rating">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                  </div>
                  <p>
                    "What sets OED apart is their commitment to giving back. I've donated food through their platform
                    several times, and the process is seamless. The variety of restaurants available is impressive!"
                  </p>
                  <div className="testimonial_author">
                    {/* <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Customer"
                      className="testimonial_author_image"
                    /> */}
                    <div>
                      <h5> SANSKAR KAFLE </h5>
                      <p>Loyal Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* App Download Section
      <section className="app_download_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="app_content">
                <h2>Download Our Mobile App</h2>
                <p>
                  Get the full OED experience on your mobile device. Order food, donate, share recipes, and more - all
                  from our convenient mobile app.
                </p>
                <div className="app_buttons">
                  <a href="#" className="app_button">
                    <i className="bi bi-apple"></i>
                    <div>
                      <span>Download on the</span>
                      <strong>App Store</strong>
                    </div>
                  </a>
                  <a href="#" className="app_button">
                    <i className="bi bi-google-play"></i>
                    <div>
                      <span>GET IT ON</span>
                      <strong>Google Play</strong>
                    </div>
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="app_image">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Mobile App"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Call to Action Section */}
      <section className="cta_section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2>Ready to Order Delicious Food?</h2>
              <p>Join thousands of satisfied customers who enjoy our hassle-free food delivery service.</p>
              <div className="cta_buttons">
                <Button as={Link} to="/menu" className="btn-primary me-3">
                  Order Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Scroll to Top Button */}
      <div className="scroll_top" onClick={scrollToTop}>
        <i className="bi bi-arrow-up"></i>
      </div>
    </>
  )
}

export default Homepage
