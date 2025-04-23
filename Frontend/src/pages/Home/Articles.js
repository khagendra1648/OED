"use client"

import { useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

function Articles() {
  const [articleList, setArticleList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchArticleList = () => {
    setIsLoading(true)
    fetch("http://localhost:10000/article/get_article")
      .then((response) => response.json())
      .then((data) => {
        setArticleList(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchArticleList()
  }, [])

  return (
    <div className="articles-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">Discover Our Latest Articles</h1>
          <p className="lead mb-4">Explore insightful content curated just for you</p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="light" className="fw-semibold">
              Popular Topics
            </Button>
            <Button variant="outline-light">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {articleList.length > 0 && (
        <section className="featured-article py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0">
                {articleList[0] && articleList[0].article_Image ? (
                  <div className="featured-image">
                    <img
                      src={`http://localhost:10000/public/images/${articleList[0].article_Image}`}
                      alt={articleList[0].article_name}
                      className="img-fluid rounded"
                    />
                  </div>
                ) : (
                  <div className="featured-image bg-light rounded" style={{ height: "400px" }}></div>
                )}
              </div>
              <div className="col-md-6">
                <div className="featured-badge mb-2">
                  <span className="badge bg-primary-subtle text-primary">Featured</span>
                </div>
                <h2 className="fw-bold mb-3">{articleList[0] ? articleList[0].article_name : "Featured Article"}</h2>
                <p className="text-secondary mb-3">
                  {articleList[0] ? articleList[0].article_description : "Loading article description..."}
                </p>
                <div className="d-flex gap-3 text-muted small mb-4">
                  {articleList[0] && articleList[0].posted_by && <span>By {articleList[0].posted_by}</span>}
                  {articleList[0] && articleList[0].article_publisheddate && (
                    <span>{new Date(articleList[0].article_publisheddate).toLocaleDateString()}</span>
                  )}
                  <span>5 min read</span>
                </div>
               
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="articles-grid py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">All Articles</h2>
            <div className="d-flex gap-2">
              
            </div>
          </div>

          {isLoading ? (
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="col-md-6 col-lg-4 mb-4" key={i}>
                  <Card className="h-100 shadow-sm">
                    <div className="bg-light" style={{ height: "200px" }}></div>
                    <Card.Body>
                      <div className="placeholder-glow">
                        <span className="placeholder col-7 mb-2"></span>
                        <span className="placeholder col-4 mb-3"></span>
                        <span className="placeholder col-12 mb-1"></span>
                        <span className="placeholder col-12 mb-1"></span>
                        <span className="placeholder col-8"></span>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {articleList.map((article, index) => (
                <div className="col-md-6 col-lg-4 mb-4" key={article.id || index}>
                  <Card className="h-100 article-card shadow-sm">
                    <div className="article-image-container">
                      {article.article_Image ? (
                        <img
                          src={`http://localhost:10000/public/images/${article.article_Image}`}
                          alt={article.article_name}
                          className="card-img-top article-image"
                        />
                      ) : (
                        <div className="bg-light" style={{ height: "200px" }}></div>
                      )}
                      <Button variant="light" size="sm" className="bookmark-btn" aria-label="Bookmark">
                        <i className="bi bi-bookmark"></i>
                      </Button>
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="fw-bold">{article.article_name}</Card.Title>
                      </div>
                      {article.article_topic && (
                        <span className="badge bg-secondary-subtle text-secondary mb-2">{article.article_topic}</span>
                      )}
                      <Card.Text className="text-secondary article-description">
                        {article.article_description}
                      </Card.Text>

                      <Card.Text className="text-secondary article-type">
                        {article.article_type}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-3 text-muted small">
                        <span>
                          <i className="bi bi-eye me-1"></i>
                          {Math.floor(Math.random() * 1000)}
                        </span>
                        <span>
                          <i className="bi bi-hand-thumbs-up me-1"></i>
                          {Math.floor(Math.random() * 100)}
                        </span>
                      </div>
                      <Button variant="light" size="sm" className="p-1" aria-label="Share">
                        <i className="bi bi-share"></i>
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {articleList.length > 9 && (
            <div className="text-center mt-4">
              <Button variant="outline-primary">Load More Articles</Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section
      <section className="newsletter-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 text-center">
              <h2 className="fw-bold mb-3">Stay Updated</h2>
              <p className="text-secondary mb-4">
                Subscribe to our newsletter to receive the latest articles and updates
              </p>
              <div className="input-group mb-2">
                <input type="email" className="form-control" placeholder="Enter your email" aria-label="Email" />
                <Button variant="primary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}

export default Articles
