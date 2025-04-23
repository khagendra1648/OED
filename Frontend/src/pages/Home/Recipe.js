"use client"

import { useState, useEffect } from "react"
import { Button, Card, Container, Row, Col, Form, Spinner, Badge } from "react-bootstrap"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import '../../styles/Recipe.css';

function Recipe() {
  const [post_name, setPostName] = useState("")
  const [posted_ingredients, setPostedIngredients] = useState("")
  const [posted_by, setPostedBy] = useState("")
  const [post_description, setPostDescription] = useState("")
  const [recipeList, setRecipeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  // Handle form submission
  const handlePost = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let formData = new FormData()
      formData.append("post_name", post_name)
      formData.append("posted_ingredients", posted_ingredients)
      formData.append("post_description", post_description)
      formData.append("posted_by", posted_by)

      let addPost = "http://localhost:10000/post/create_post"

      let addPostResponse = await fetch(addPost, {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      let parsedData = await addPostResponse.json()

      if (addPostResponse.status <= 201) {
        showSuccessMessage("Recipe posted successfully!")
        resetForm()
        fetchRecipeList() // Refresh the list after successful post
      } else {
        if (parsedData.post_name) showErrorMessage(parsedData.post_name)
        else if (parsedData.posted_ingredients) showErrorMessage(parsedData.posted_ingredients)
        else if (parsedData.post_description) showErrorMessage(parsedData.post_description)
        else if (parsedData.posted_by) showErrorMessage(parsedData.posted_by)
        else showErrorMessage("Failed to post recipe. Please try again.")
      }
    } catch (error) {
      console.error("Error posting recipe:", error)
      showErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message
  const showSuccessMessage = (message) => {
    alert(message) // You can replace this with a toast or custom notification
  }

  // Show error message
  const showErrorMessage = (message) => {
    alert(message) // You can replace this with a toast or custom notification
  }

  // Reset form fields
  const resetForm = () => {
    setPostName("")
    setPostedIngredients("")
    setPostDescription("")
    setPostedBy("")
  }

  // Fetch recipes
  const fetchRecipeList = () => {
    setIsLoading(true)
    fetch("http://localhost:10000/post/get_post")
      .then((response) => response.json())
      .then((data) => {
        setRecipeList(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchRecipeList()
  }, [])

  // Get unique recipe categories (for demonstration - you might want to add a category field to your form)
  const getCategories = () => {
    const categories = new Set(
      recipeList.map((recipe) => {
        // This is just a simple categorization based on ingredients
        // You might want to add an actual category field to your form
        if (recipe.posted_ingredients.toLowerCase().includes("chicken")) return "Chicken"
        if (recipe.posted_ingredients.toLowerCase().includes("beef")) return "Beef"
        if (recipe.posted_ingredients.toLowerCase().includes("fish")) return "Seafood"
        if (recipe.posted_ingredients.toLowerCase().includes("vegetable")) return "Vegetarian"
        return "Other"
      })
    )
    return ["all", ...Array.from(categories)]
  }

  // Filter recipes
  const filteredRecipes =
    activeFilter === "all"
      ? recipeList
      : recipeList.filter((recipe) => {
          const ingredients = recipe.posted_ingredients.toLowerCase()
          switch (activeFilter) {
            case "Chicken":
              return ingredients.includes("chicken")
            case "Beef":
              return ingredients.includes("beef")
            case "Seafood":
              return ingredients.includes("fish")
            case "Vegetarian":
              return ingredients.includes("vegetable")
            default:
              return true
          }
        })

  return (
    <div className="recipe-page">
      <Header />

      {/* Hero Section */}
      <div className="recipe-hero">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h1>Share Your Recipes</h1>
              <p>Discover and share delicious recipes with our community</p>
            </Col>
            <Col md={6} className="d-none d-md-block">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Cooking"
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="main-content">
        <Row>
          {/* Recipe Form */}
          <Col lg={5} className="mb-5">
            <div className="recipe-form-container">
              <h2 className="section-title">Add a New Recipe</h2>
              <Form onSubmit={handlePost}>
                <Form.Group className="mb-3">
                  <Form.Label>Recipe Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter recipe name"
                    value={post_name}
                    onChange={(e) => setPostName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="List ingredients separated by commas"
                    value={posted_ingredients}
                    onChange={(e) => setPostedIngredients(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">Example: 2 eggs, 1 cup flour, 1/2 cup sugar</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={posted_by}
                    onChange={(e) => setPostedBy(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Recipe Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Describe how to prepare the recipe"
                    value={post_description}
                    onChange={(e) => setPostDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Posting...</span>
                    </>
                  ) : (
                    "Post Recipe"
                  )}
                </Button>
              </Form>
            </div>
          </Col>

          {/* Recipes List */}
          <Col lg={7}>
            <div className="recipes-list-container">
              <h2 className="section-title">Community Recipes</h2>

              {/* Category Filters */}
              {!isLoading && recipeList.length > 0 && (
                <div className="category-filters mb-4">
                  {getCategories().map((category) => (
                    <Button
                      key={category}
                      variant={activeFilter === category ? "primary" : "outline-primary"}
                      className="me-2 mb-2 category-button"
                      onClick={() => setActiveFilter(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
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
                  <p className="mt-3">Loading recipes...</p>
                </div>
              )}

              {/* No Recipes State */}
              {!isLoading && filteredRecipes.length === 0 && (
                <div className="no-recipes text-center my-5">
                  <div className="no-recipes-icon">🍽️</div>
                  <h3>No recipes found</h3>
                  <p>
                    {activeFilter === "all"
                      ? "Be the first to share a recipe!"
                      : `No ${activeFilter} recipes found. Try a different category or add your own!`}
                  </p>
                </div>
              )}

              {/* Recipes Grid */}
              {!isLoading && filteredRecipes.length > 0 && (
                <Row className="recipes-grid">
                  {filteredRecipes.map((recipe, index) => (
                    <Col key={recipe.id || index} md={6} className="mb-4">
                      <Card className="recipe-card h-100">
                        <Card.Body>
                          <div className="recipe-card-header">
                            <Card.Title className="recipe-title">{recipe.post_name}</Card.Title>
                            <Badge
                              bg="primary"
                              className="recipe-category"
                            >
                              {recipe.posted_ingredients.toLowerCase().includes("chicken")
                                ? "Chicken"
                                : recipe.posted_ingredients.toLowerCase().includes("beef")
                                ? "Beef"
                                : recipe.posted_ingredients.toLowerCase().includes("fish")
                                ? "Seafood"
                                : recipe.posted_ingredients.toLowerCase().includes("vegetable")
                                ? "Vegetarian"
                                : "Other"}
                            </Badge>
                          </div>

                          <div className="recipe-meta">
                            <span className="recipe-author">
                              <i className="bi bi-person"></i> {recipe.posted_by}
                            </span>
                          </div>

                          <div className="recipe-section">
                            <h6 className="recipe-section-title">Ingredients:</h6>
                            <ul className="ingredients-list">
                              {recipe.posted_ingredients.split(",").map((ingredient, i) => (
                                <li key={i}>{ingredient.trim()}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="recipe-section">
                            <h6 className="recipe-section-title">Instructions:</h6>
                            <p className="recipe-instructions">{recipe.post_description}</p>
                          </div>
                        </Card.Body>
                        <Card.Footer className="bg-white border-0">
                          <div className="recipe-actions">
                            {/* <Button variant="outline-primary" size="sm">
                              <i className="bi bi-bookmark"></i> Save
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              <i className="bi bi-share"></i> Share
                            </Button> */}
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>

        {/* Featured Recipes Section */}
        {!isLoading && recipeList.length >= 3 && (
          <div className="featured-recipes-section">
            <h2 className="section-title">Featured Recipes</h2>
            <Row>
              {recipeList.slice(0, 3).map((recipe, index) => (
                <Col key={`featured-${recipe.id || index}`} md={4} className="mb-4">
                  <div className="featured-recipe">
                    <div className="featured-recipe-content">
                      <h3>{recipe.post_name}</h3>
                      <p className="featured-recipe-author">By {recipe.posted_by}</p>
                      <Button variant="light" size="sm">
                        View Recipe
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <Row className="align-items-center">
            <Col lg={6}>
              <h2>Get Weekly Recipe Ideas</h2>
              <p>Subscribe to our newsletter to receive weekly recipe inspiration and cooking tips.</p>
            </Col>
            {/* <Col lg={6}>
              <div className="newsletter-form">
                <Form.Control type="email" placeholder="Your email address" />
                <Button variant="primary">Subscribe</Button>
              </div>
            </Col> */}
          </Row>
        </div>
      </Container>

      <Footer />
    </div>
  )
}

export default Recipe

