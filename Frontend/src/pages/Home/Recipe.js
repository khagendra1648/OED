import React, { useState, useEffect } from "react";
import { Button, Card } from 'react-bootstrap';
import { 
  MDBBtn, MDBContainer, MDBRow, MDBCol, 
  MDBCard, MDBCardBody, MDBInput, MDBTextArea 
} from 'mdb-react-ui-kit';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../styles/Recipe.css';

function Recipe() {
  const [post_name, setpostname] = useState("");
  const [posted_ingredients, setpostedingredients] = useState("");
  const [posted_by, setpostedby] = useState("");
  const [post_description, setpostdescription] = useState("");

  const [recipeList, setRecipeList] = useState([]);

  const handlePost = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('post_name', post_name);
    formData.append('posted_ingredients', posted_ingredients);
    formData.append('post_description', post_description);
    formData.append('posted_by', posted_by);

    let addPost = 'http://localhost:10000/post/create_post';

    let addPostResponse = await fetch(addPost, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    let parsedData = await addPostResponse.json();

    if (addPostResponse.status === 201) {
      alert('Recipe Posted successfully');
      setpostname('');
      setpostedingredients('');
      setpostdescription('');
      setpostedby('');
      fetchRecipeList(); // Refresh the list after successful post
    } else {
      if (parsedData.post_name) alert(parsedData.post_name);
      else if (parsedData.posted_ingredients) alert(parsedData.posted_ingredients);
      else if (parsedData.post_description) alert(parsedData.post_description);
      else if (parsedData.posted_by) alert(parsedData.posted_by);
    }
  };

  const fetchRecipeList = () => {
    fetch('http://localhost:10000/post/get_post')
      .then(response => response.json())
      .then(data => {
        setRecipeList(data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchRecipeList();
  }, []);

  return (
    <div>
      <Header />

      <MDBContainer fluid className="mdb-container">
        <MDBRow className='d-flex justify-content-center align-items-center'>
          <MDBCol lg='9' className='my-5'>
            <h1 className="text mb-4">Recipe</h1>
            <MDBCard className="mdb-card">
              <MDBCardBody className='px-4 mdb-card-body'>
                {/* Recipe Name */}
                <MDBRow className='align-items-center pt-4 pb-3 mdb-row'>
                  <MDBCol md='3' className='ps-5 mdb-col'>
                    <h6 className="mb-0">Recipe Name</h6>
                  </MDBCol>
                  <MDBCol md='9' className='pe-5 mdb-col'>
                    <MDBInput size='lg' id='form1' type='text' className='mdb-input' value={post_name} onChange={(e) => setpostname(e.target.value)} />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                {/* Ingredients */}
                <MDBRow className='align-items-center pt-4 pb-3 mdb-row'>
                  <MDBCol md='3' className='ps-5 mdb-col'>
                    <h6 className="mb-0">Recipe Ingredients</h6>
                  </MDBCol>
                  <MDBCol md='9' className='pe-5 mdb-col'>
                    <MDBInput size='lg' id='form2' type='text' className='mdb-input' value={posted_ingredients} onChange={(e) => setpostedingredients(e.target.value)} />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                {/* Posted By */}
                <MDBRow className='align-items-center pt-4 pb-3 mdb-row'>
                  <MDBCol md='3' className='ps-5 mdb-col'>
                    <h6 className="mb-0">Posted By</h6>
                  </MDBCol>
                  <MDBCol md='9' className='pe-5 mdb-col'>
                    <MDBInput size='lg' id='form3' type='email' className='mdb-input' value={posted_by} onChange={(e) => setpostedby(e.target.value)} />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                {/* Description */}
                <MDBRow className='align-items-center pt-4 pb-3 mdb-row'>
                  <MDBCol md='3' className='ps-5 mdb-col'>
                    <h6 className="mb-0">Recipe Description</h6>
                  </MDBCol>
                  <MDBCol md='9' className='pe-5 mdb-col'>
                    <MDBTextArea id='textAreaExample' rows={3} className='mdb-text-area' value={post_description} onChange={(e) => setpostdescription(e.target.value)} />
                  </MDBCol>
                </MDBRow>

                <MDBBtn className='my-4 mdb-btn' size='lg' onClick={handlePost}>Post Recipe</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Recipes List */}
      <div className="container-fluid">
        <div className="row justify-content-around">
          {recipeList.map((item, index) => (
            <Card key={index} style={{ width: '18rem', marginBottom: '2rem' }}>
              <Card.Body>
                <Card.Title>Recipe Name: {item.post_name}</Card.Title>
                <Card.Text>
                  <Card.Title>Recipe Description</Card.Title>
                  {item.post_description}
                </Card.Text>
                <Card.Text>
                  <Card.Title>Recipe Ingredients</Card.Title>
                  {item.posted_ingredients}
                </Card.Text>
                <Card.Text>
                  <Card.Title>Posted By</Card.Title>
                  {item.posted_by}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Recipe;
