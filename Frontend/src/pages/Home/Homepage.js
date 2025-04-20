import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <section className="hero_section">
            <Container>
                <Row>

                    <Col lg={5}>
                        <div className="hero_text text-center">
                            <h1 className="text-black">OED:ORDER EAT DELIVERY</h1>
                            <h2 className="text-black">Order</h2>
                            <p className="text-black pt-2 pb-5">
                                OED is the platform where you can order,donate.
                            </p>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Homepage;