import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function About() {
    return (
        
        <>
        <Header />
          
            <section className="about_section">
           
                <Container>
                  
                    <Row>
                        <Col lg={{ span: 8, offset: 2 }} className="text-center">
                            <h2>The only food delivery appp where you can order hassle free</h2>
                            <p>
                                In OED we provide users a user friendly interface so that they can  easily place their orders and get them delivered at their home.Also we have tied up with ngo to donate the food if they want.They can also share thier recipe and read the articles.
                            </p>

                        </Col>
                    </Row>
                </Container>
            </section>

<Footer />

        </>
    );
}

export default About;