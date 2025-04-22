import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Donation() {
  const cookie = document.cookie;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const _name = getCookie('userName');
  const name = decodeURIComponent(_name);

  const [donate_name, setdonatename] = useState("");
  const [donated_price, setdonatedprice] = useState("");
  const [donation_location, setdonationlocation] = useState("");
  const [donated_by, setdonatedby] = useState(name); 

  const getInitialCount = () => {
    const savedCount = localStorage.getItem('count');
    return savedCount !== null ? Number(savedCount) : 0;
  };

  const [count, setCount] = useState(getInitialCount);

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  const handlePost = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("donate_name", donate_name);
    formData.append("donated_by", donated_by);
    formData.append("donated_price", donated_price);
    formData.append("donation_location", donation_location);

    let addDonate = "http://localhost:10000/donate/create_donate";

    let addDonateResponse = await fetch(addDonate, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let parsedData = await addDonateResponse.json();
    console.log(parsedData);

    if (addDonateResponse.status === 200) {
      alert("You have successfully donated the food. Our team will connect to you.");
      setCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount === 3) {
          alert('Count is 3');
          return 0;
        }
        return newCount;
      });
      window.location.reload();
    } else {
      if (parsedData.donate_name) {
        alert(parsedData.donate_name);
      } else if (parsedData.donated_by) {
        alert(parsedData.donated_by);
      } else if (parsedData.donation_location) {
        alert(parsedData.donation_location);
      } else if (parsedData.donated_price) {
        alert(parsedData.donated_price);
      }
    }
  };

  const [donateList, setdonateList] = useState([]);
  const fetchDonateList = () => {
    fetch("http://localhost:10000/donate/get_donate")
      .then((response) => response.json())
      .then((data) => {
        setdonateList(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchDonateList();
  }, []);

  return (
    <div>
      <Header />

      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" className="my-5">
            <h1 className="text mb-4">Donation</h1>
            <p>Donate Food, Save Life</p>

            <MDBCard>
              <MDBCardBody className="px-4">
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Food Name</h6>
                  </MDBCol>
                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      type="text"
                      value={donate_name}
                      onChange={(e) => setdonatename(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Donation Location</h6>
                  </MDBCol>
                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      type="text"
                      value={donation_location}
                      onChange={(e) => setdonationlocation(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Donate Price</h6>
                  </MDBCol>
                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      type="number"
                      value={donated_price}
                      onChange={(e) => setdonatedprice(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Donated By</h6>
                  </MDBCol>
                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      type="text"
                      value={donated_by}
                      onChange={(e) => setdonatedby(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <button className="btn btn-primary btn-block" onClick={handlePost}>
                  Donate
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Footer />
    </div>
  );
}

export default Donation;
