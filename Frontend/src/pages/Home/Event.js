import React, { useState, useEffect } from "react"
import { Card, Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import '../../styles/Event.css';

function Event() {
  const [eventList, setEventList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const fetchEventList = () => {
    setIsLoading(true)
    setError(null)
    
    fetch("http://localhost:10000/Event/get_event")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setEventList(data.data)
        } else {
          console.error("Unexpected response format:", data)
          setEventList([])
          setError("Unexpected data format received from server")
        }
      })
      .catch((error) => {
        console.error("Error fetching event data:", error)
        setEventList([])
        setError("Failed to load events. Please try again later.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchEventList()
  }, [])

  // Format date for display
  // const formatEventDate = (dateString) => {
  //   if (!dateString) return "Date TBA"
    
  //   try {
  //     const date = new Date(dateString)
  //     return date.toLocaleDateString("en-US", {
  //       weekday: "long",
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     })
  //   } catch (e) {
  //     console.error("Date parsing error:", e)
  //     return dateString
  //   }
  // }

  // Format time for display
  const formatEventTime = (timeString) => {
    if (!timeString) return "Time TBA"
    return timeString
  }

  // Get unique event categories
  const getEventCategories = () => {
    const categories = new Set(eventList.map(event => event.event_category || "Other"))
    return ["All", ...Array.from(categories)]
  }

  // Filter events by category
  const filteredEvents = activeCategory === "All" 
    ? eventList 
    : eventList.filter(event => (event.event_category || "Other") === activeCategory)

  return (
    <div className="events-page">
      <Header />
      
      {/* Hero Section */}
      <div className="event-hero">
        <Container>
          <div className="hero-content">
            <h1>Upcoming Events</h1>
            <p>Join us for exciting events and experiences</p>
            {/* <Button variant="light" className="hero-button">View Calendar</Button> */}
          </div>
        </Container>
      </div>

      <Container className="main-content">
        {/* Category Filters */}
        {!isLoading && !error && eventList.length > 0 && (
          <div className="category-filters">
            {getEventCategories().map(category => (
              <Button 
                key={category}
                variant={activeCategory === category ? "primary" : "outline-primary"}
                className="category-button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading events...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container text-center my-5">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <Button variant="primary" onClick={fetchEventList}>Try Again</Button>
          </div>
        )}

        {/* No Events State */}
        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="no-events text-center my-5">
            <div className="no-events-icon">📅</div>
            <h3>No events found</h3>
            <p>There are no upcoming events in this category at the moment.</p>
            {activeCategory !== "All" && (
              <Button variant="outline-primary" onClick={() => setActiveCategory("All")}>
                View All Events
              </Button>
            )}
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && !error && filteredEvents.length > 0 && (
          <Row className="events-grid">
            {filteredEvents.map((event, index) => (
              <Col key={event.id || index} lg={4} md={6} className="mb-4">
                <Card className="event-card h-100">
                  <div className="event-image-container">
                    <img
                      src={`http://localhost:10000/public/images/${event.event_Image}`}
                      alt={event.event_name}
                      className="event-image"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/300x200?text=Event"
                      }}
                    />
                    {event.event_category && (
                      <Badge bg="primary" className="event-category-badge">
                        {event.event_category}
                      </Badge>
                    )}
                  </div>
                  <Card.Body>
                    <Card.Title className="event-title">{event.event_name}</Card.Title>
                    
                    <div className="event-details">
                      <div className="event-detail">
                        <i className="bi bi-geo-alt"></i>
                        <span>{event.event_location || "Location TBA"}</span>
                      </div>
                      
                      <div className="event-detail">
                        <i className="bi bi-clock"></i>
                        <span>{formatEventTime(event.event_time)}</span>
                      </div>
                    </div>
                    
                    <Card.Text className="event-description">
                      {event.event_description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0">
                    {/* <Button variant="primary" className="w-100">View Details</Button> */}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Featured Events Section */}
        {!isLoading && !error && eventList.length > 0 && (
          <div className="featured-events-section">
            <h2 className="section-title">Featured Events</h2>
            <Row>
              {eventList.slice(0, 3).map((event, index) => (
                <Col key={`featured-${event.id || index}`} md={4} className="mb-4">
                  <div className="featured-event">
                    <div className="featured-event-image">
                      <img
                        src={`http://localhost:10000/public/images/${event.event_Image}`}
                        alt={event.event_name}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "https://via.placeholder.com/300x200?text=Featured+Event"
                        }}
                      />
                    </div>
                    <div className="featured-event-content">
                      <h3>{event.event_name}</h3>
                      <p className="featured-event-date">
                        {} • {formatEventTime(event.event_time)}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Newsletter Section */}
        {/* <div className="newsletter-section">
          <Row className="align-items-center">
            <Col lg={6}>
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter to receive updates about upcoming events and special offers.</p>
            </Col>
            <Col lg={6}>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" className="form-control" />
                <Button variant="primary">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </div> */}
      </Container>

      <Footer />
    </div>
  )
}

export default Event
