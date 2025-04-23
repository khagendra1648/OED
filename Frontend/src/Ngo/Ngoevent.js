import React, { useState, useEffect } from 'react';
import '../admin/AdminDashboard.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function MenuDash() {
    const [event_name, seteventname] = useState("");
    const [event_location, seteventlocation] = useState("");
    const [event_time, seteventtime] = useState("");
    const [event_descripion, seteventdescription] = useState("");
    const [event_Image, seteventImage] = useState("");
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [eventList, seteventList] = useState([]);
    const [editEventId, setEditEventId] = useState(null);

    const closeModal = () => {
        setModelIsOpen(false);
        setEditEventId(null);
    };

    const openModal = (event) => {
        seteventname(event.event_name);
        seteventImage(event.event_Image);
        seteventdescription(event.event_descripion);
        seteventlocation(event.event_location);
        seteventtime(event.event_time);
        setEditEventId(event.Id);
        setModelIsOpen(true);
    };

    const handleEvent = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (event_Image && event_Image.length > 0) {
            formData.append('event_Image', event_Image[0]);
        } else {
            formData.append('event_Image', event_Image);
        }

        formData.append('event_name', event_name);
        formData.append('event_location', event_location);
        formData.append('event_time', event_time);
        formData.append('event_description', event_descripion);

        const addEvent = 'http://localhost:10000/event/create_event';

        let addEventResponse = await fetch(addEvent, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        let parsedData = await addEventResponse.json();

        if (addEventResponse.status === 201) {
            alert('Event Added Successfully');
            seteventname('');
            seteventImage('');
            seteventdescription('');
            seteventlocation('');
            seteventtime('');
            fetcheventList();
        } else {
            alert(parsedData.message || "Error adding event");
        }
    };

    const handleEdit = async () => {
        if (!editEventId) return;

        const updateEventURL = `http://localhost:10000/event/put_event/${editEventId}/`;
        const updatedData = {
            event_name,
            event_location,
            event_time,
            event_description: event_descripion,
            event_Image
        };

        const response = await fetch(updateEventURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert("Event updated successfully");
            fetcheventList();
            closeModal();
        } else {
            alert("Failed to update event");
        }
    };

    const handleDelete = (Id) => {
        fetch(`http://localhost:10000/event/delete_event?id=${Id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetcheventList();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const fetcheventList = () => {
        fetch('http://localhost:10000/event/get_event')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.data)) {
                    seteventList(data.data);
                } else {
                    seteventList([]);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                seteventList([]);
            });
    };

    useEffect(() => {
        fetcheventList();
    }, []);

    return (
        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Ngo Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="/NgoDashboard">Ngo panel</a></li>
                    <li><a href="/NgoDonation">Donation</a></li>
                    <li><a href="/NgoArticle">Article</a></li>
                    <li><a href="/NgoDonation">Donations</a></li>
                </ul>
            </div>

            <div className="content">
                <h2 className='mb-3 text-start'>Add Event</h2>

                <Form onSubmit={handleEvent}>
                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter event Name" value={event_name} onChange={(e) => seteventname(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Event Image</label>
                            <input className="form-control" type="file" id="formFile" onChange={(e) => seteventImage(e.target.files[0])} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event description</Form.Label>
                                <Form.Control type="text" placeholder="Enter event description" value={event_descripion} onChange={(e) => seteventdescription(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event location</Form.Label>
                                <Form.Control type="text" placeholder="Enter your event Location" value={event_location} onChange={(e) => seteventlocation(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event time</Form.Label>
                                <Form.Control type="text" placeholder="Enter event time" value={event_time} onChange={(e) => seteventtime(e.target.value)} />
                            </Form.Group>
                        </div>
                    </div>

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

                <h2 className='mt-5 mb-3 text-start'>Event Details</h2>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Event Name</th>
                            <th>Event description</th>
                            <th>Event Location</th>
                            <th>Event time</th>
                            <th>Event Image</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(eventList) && eventList.map((event) => (
                                <tr key={event.Id}>
                                    <td>{event.Id}</td>
                                    <td>{event.event_name}</td>
                                    <td>{event.event_descripion}</td>
                                    <td>{event.event_location}</td>
                                    <td>{event.event_time}</td>
                                    <td>
                                        <img width={100} src={`http://localhost:10000/public/images/${event.event_Image}`} alt="event" />
                                    </td>
                                    <td><Button variant="primary" onClick={() => openModal(event)}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={() => handleDelete(event.Id)}>Delete</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <Modal show={modelIsOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event Name </Form.Label>
                                <Form.Control type="text" placeholder="Enter event name" value={event_name} onChange={(e) => seteventname(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter event description" value={event_descripion} onChange={(e) => seteventdescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event time</Form.Label>
                                <Form.Control type="text" placeholder="Enter event time" value={event_time} onChange={(e) => seteventtime(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Event location</Form.Label>
                                <Form.Control type="text" placeholder="Enter event location" value={event_location} onChange={(e) => seteventlocation(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" onClick={handleEdit}>Update event</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default MenuDash;
