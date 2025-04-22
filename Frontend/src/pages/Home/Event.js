import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Event() {
  const [eventList, seteventList] = useState([]);

  const fetcheventList = () => {
    fetch("http://localhost:10000/Event/get_event")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          seteventList(data.data);
        } else {
          console.error("Unexpected response format:", data);
          seteventList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
        seteventList([]);
      });
  };

  useEffect(() => {
    fetcheventList();
  }, []);

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-around">
          {eventList.length > 0 ? (
            eventList.map((item, index) => (
              
              <Card key={index} style={{ width: "18rem", marginBottom: "2rem" }}>
                {console.log(item)}
                <Card.Body>
                  <img
                    width={200}
                    src={`http://localhost:10000/public/images/${item.event_Image}`}
                    alt={item.event_name}
                  />
                  <Card.Title>Event Name: {item.event_name}</Card.Title>
                  <Card.Text>Event Location: {item.event_location}</Card.Text>
                  <Card.Text>Event Time: {item.event_time}</Card.Text>
                  <Card.Text>Description: {item.event_description}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No events found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Event;
