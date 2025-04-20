import React, { useState, useEffect } from "react";
import { Card, Button, Table } from "react-bootstrap";
import Footer from "../components/Footer";

function NgoDonation() {
  const [donateList, setdonateList] = useState([]);

  const fetchDonateList = () => {
    fetch("http://localhost:10000/donate/get_donate")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setdonateList(data.data);
        } else {
          console.error("Unexpected response format:", data);
          setdonateList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching donations:", error);
        setdonateList([]);
      });
  };

  useEffect(() => {
    fetchDonateList();
  }, []);

  const handleDelete = (Id) => {
    fetch(`http://localhost:10000/donate/delete_donate?id=${Id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchDonateList(); // Refresh the list
      })
      .catch((error) => {
        console.error("Error deleting donation:", error);
      });
  };

  return (
    <div>
      <div className="sidebar">
        <h3 className="sidebar-heading">Admin Panel</h3>
        <ul className="sidebar-menu">
                    <li><a href="/NgoDashboard">Ngo panel</a></li>
                    <li><a href="/NgoDonation">Donation</a></li>
                    <li><a href="/NgoArticle">Article</a></li>
                    <li><a href="/NgoDonation">Donations</a></li>
                </ul>
      </div>

      <div className="content">
        <div className="row justify-content-around">
          <h2 className="mt-5 mb-3 text-start">Donation Details</h2>

          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Donation Name</th>
                <th>Location</th>
                <th>Donated by</th>
                <th>Price</th>
                <th>Manage Donation</th>
              </tr>
            </thead>

            <tbody>
              {donateList.map((donation) => (
                <tr key={donation.Id}>
                  <td>{donation.Id}</td>
                  <td>{donation.donate_name}</td>
                  <td>{donation.donation_location}</td>
                  <td>{donation.donated_by}</td>
                  <td>{donation.donated_price}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(donation.Id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NgoDonation;
