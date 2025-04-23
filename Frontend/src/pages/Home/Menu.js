
import { useState, useEffect, useRef } from "react"
import { Button, Card, Table, Container, Row, Col, Badge } from "react-bootstrap"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { StarFill } from "react-bootstrap-icons"
import Header from "../../components/Header"
import '../../styles/Menu.css';

function Menu() {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [menuList, setMenuList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [location, setLocation] = useState([27.70770481291534, 85.32522362345625])
  const [address, setAddress] = useState("")
  const mapRef = useRef(null)

  // Add to cart function
  function addToCart(data) {
    setCart([...cart, data])
  }

  // Remove from cart function
  function removeFromCart(index) {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  // Calculate total price
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((acc, item) => acc + Number.parseFloat(item.menu_price), 0)
      setTotalPrice(total.toFixed(2))
    }
    calculateTotalPrice()
  }, [cart])

  // Fetch menu items
  const fetchMenuList = () => {
    setIsLoading(true)
    fetch("http://localhost:10000/menu/get_menu")
      .then((response) => response.json())
      .then((data) => {
        setMenuList(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchMenuList()
  }, [])

  // // Handle location change
  // const mapRef = useRef(null);
  // const [location, setLocation] = useState([
  //   27.70770481291534, 85.32522362345625,
  // ]);
  // // Send location variable in place of location in the database
  // const [address, setAddress] = useState("");

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
  // Create order
  const createOrder = async (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checkout.")
      return
    }

    try {
      const addOrder = "http://localhost:10000/Order/create_order"
      const addOrderResponse = await fetch(addOrder, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          order_items: cart.map((item) => item.Id),
          order_locations: address,
        }),
      })

      const addOrderJson = await addOrderResponse.json()
      if (addOrderJson.message) {
        alert("Order placed successfully!")
        setCart([])
      } else {
        alert("Failed to place order. Please try again.")
      }

      return addOrderJson
    } catch (error) {
      console.error("Error creating order:", error)
      alert("An error occurred while placing your order.")
    }
  }

  // Get unique categories
  const categories = ["All", ...new Set(menuList.map((item) => item.menu_type))]

  // Filter menu items by category
  const filteredMenu =
    activeCategory === "All" ? menuList : menuList.filter((item) => item.menu_type === activeCategory)

  // Render loading skeleton
  const renderSkeleton = () => {
    return Array(6)
      .fill()
      .map((_, index) => (
        <Col key={index} md={6} lg={4} className="mb-4">
          <Card className="menu-card skeleton">
            <div className="skeleton-img"></div>
            <Card.Body>
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-button"></div>
            </Card.Body>
          </Card>
        </Col>
      ))
  }

  return (
    <div className="menu-page">
      <Header />

      {/* Hero Section */}
      <div className="menu-hero">
        <Container>
          <h1>Our Menu</h1>
          <p>Discover delicious food for delivery or pickup</p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Category Filters */}
        <div className="category-filters mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "primary" : "outline-primary"}
              className="me-2 mb-2"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <h2 className="section-title mb-4">{activeCategory === "All" ? "All Items" : activeCategory}</h2>

        <Row>
          {isLoading
            ? renderSkeleton()
            : filteredMenu.map((item) => (
                <Col key={item.id} md={6} lg={4} className="mb-4">
                  <Card className="menu-card h-100">
                    <div className="menu-img-container">
                      <img
                        src={`http://localhost:10000/public/images/${item.menu_Image}`}
                        alt={item.menu_name}
                        className="menu-img"
                      />
                      <Badge bg="primary" className="menu-type-badge">
                        {item.menu_type}
                      </Badge>
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <Card.Title className="menu-title">{item.menu_name}</Card.Title>
                        <div className="menu-rating">
                          <StarFill className="text-warning me-1" />
                          {item.menu_rating || "4.5"}
                        </div>
                      </div>
                      <Card.Text className="menu-description">
                        {item.menu_description || "Delicious food prepared with fresh ingredients."}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="menu-price">NPR{Number.parseFloat(item.menu_price).toFixed(2)}</div>
                        <Button variant="primary" onClick={() => addToCart(item)} className="add-to-cart-btn">
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>

        {/* Cart Section */}
        <div className="cart-section mt-5">
          <h2 className="section-title mb-4">Your Order</h2>

          {cart.length === 0 ? (
            <div className="empty-cart text-center py-5">
              <i className="bi bi-cart text-muted" style={{ fontSize: "3rem" }}></i>
              <p className="mt-3 text-muted">Your cart is empty. Add some delicious items!</p>
            </div>
          ) : (
            <div className="cart-table-container">
              <Table responsive className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem, index) => (
                    <tr key={`${cartItem.id}-${index}`}>
                      <td>
                        <img
                          width={80}
                          height={60}
                          src={`http://localhost:10000/public/images/${cartItem.menu_Image}`}
                          alt={cartItem.menu_name}
                          className="cart-item-img"
                        />
                      </td>
                      <td>{cartItem.menu_name}</td>
                      <td>${Number.parseFloat(cartItem.menu_price).toFixed(2)}</td>
                      <td>
                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(index)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-end fw-bold">
                      Total:
                    </td>
                    <td colSpan="2" className="fw-bold">
                      ${totalPrice}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          )}
        </div>

        {/* Delivery Section */}
        <div className="delivery-section mt-5">
          <h2 className="section-title mb-4">Delivery Details</h2>

          <Row>
            <Col lg={8} className="mb-4 mb-lg-0">
              <div className="map-container">
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
              </div>
            </Col>

            <Col lg={4}>
              <div className="delivery-form">
                <div className="mb-3">
                  <label htmlFor="deliveryAddress" className="form-label">
                    Delivery Location
                  </label>
                  <input id="deliveryAddress" className="form-control" value={address} type="text" disabled />
                  <div className="form-text">This address will be used for your delivery</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="deliveryNotes" className="form-label">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="deliveryNotes"
                    className="form-control"
                    rows="3"
                    placeholder="Any special instructions for delivery?"
                  ></textarea>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 checkout-btn"
                  onClick={createOrder}
                  disabled={cart.length === 0}
                >
                  Checkout (mrp{totalPrice})
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Menu
