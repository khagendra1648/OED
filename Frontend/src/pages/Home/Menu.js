import Button from "react-bootstrap/Button";
import Header from "../../components/Header";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Table from "react-bootstrap/Table";

function Menu() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function addToCart(data) {
    setCart([...cart, data]);
  }

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce(
        (acc, item) => acc + parseFloat(item.menu_price),
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cart]);

  const [menuList, setmenuList] = useState([]);
  const fetchmenuList = () => {
    fetch("http://localhost:10000/menu/get_menu")
      .then((response) => response.json())
      .then((data) => {
        setmenuList(data.data);
        console.log(menuList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchmenuList();
  }, []);

  const mapRef = useRef(null);
  const [location, setLocation] = useState([
    27.70770481291534, 85.32522362345625,
  ]);
  // Send location variable in place of location in the database
  const [address, setAddress] = useState("");

  const onLocationChange = (location) => {
    setLocation(location);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        console.log("Fetching address for location:", location);  // Log the coordinates being used
        
        // Nominatim API for Geocoding (OpenStreetMap)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${location[0]}&lon=${location[1]}&format=json`
        );
        const data = await response.json();
        
        // Log the full response to inspect the API data structure
        console.log("API Response:", data);

        if (data.address) {
          const locationName = `${data.address.road}, ${data.address.city}, ${data.address.country}`;
          setAddress(locationName);
        } else {
          console.error("No results found for the given location.");
          setAddress("Location not found.");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address.");
      }
    };

    fetchAddress();
  }, [location]);

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      mapInstance.on("moveend", () => {
        const center = mapInstance.getCenter();
        setLocation([center.lat, center.lng]);
        onLocationChange([center.lat, center.lng]);
      });
    }
  }, [onLocationChange]);

  const [order, setOrder] = useState([]);

  const createOrder = async (e) => {
    e.preventDefault();
    let addOrder = 'http://localhost:10000/Order/create_order';
    let addOrderResponse = await fetch(addOrder, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        order_items: cart.map(car => car.Id),
        order_locations: address
      }),
    });
    let addOrderJson = await addOrderResponse.json();
    return addOrderJson;
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-around ">
          {menuList.map((item) => (
            <Card style={{ width: "18rem", marginBottom: "2rem" }}>
              <Card.Body>
                <>
                  <img
                    width={200}
                    src={`http://localhost:10000/public/images/${item.menu_Image}`}
                  />
                </>
                <Card.Title>{item.menu_name}</Card.Title>
                <Card.Text>{item.menu_type}</Card.Text>
                <Card.Text>{item.menu_price}</Card.Text>
                <Card.Text>{item.menu_rating}</Card.Text>
                <Card.Text>{item.menu_}</Card.Text>

                <Button
                  variant="primary"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        <h1>Cart</h1>
        <Table responsive style={{ marginTop: "5rem" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name of Menus</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((cartItem) => {
              return (
                <tr key={cartItem.id}>
                  <td>{cartItem.id}</td>
                  <td>{cartItem.menu_name}</td>
                  <td>{cartItem.menu_price}</td>
                  <td>
                    <img
                      width={100}
                      src={`http://localhost:10000/public/images/${cartItem.menu_Image}`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3"></td>
              <td>Total Price: {totalPrice}</td>
            </tr>
          </tfoot>
        </Table>

        <div className="container">
          <div className="row">
            <div className="col-8">
              <MapContainer
                center={location}
                zoom={12}
                style={{ height: "50vh" }}
                ref={mapRef}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {location && (
                  <Marker position={location}>
                    <Popup>{address}</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            <div className="col">
              <label htmlFor="" className="form-text">
                Delivery Location
              </label>
              <br />
              <input
                className="form-control"
                value={address}
                type="text"
                disabled
              />

              <br />

              <button className="btn btn-primary" onClick={createOrder}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
