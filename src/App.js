import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5'
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './components/data.json'
import Listing from "./components/Listing";

function App() {

  const [listings, setListings] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [filterTags, setFilterTags] = useState([])
  const [newResults, setNewResults] = useState([])

  useEffect(() => {
    setListings(data)
    setFilteredResults(data)
  },[listings])

  const handleClick = (e) => {
		e.preventDefault();
    const tags = [...filterTags, e.target.innerText]
    let dedupeTags = [...new Set(tags)]
    setFilterTags(dedupeTags)
    filterByTag(dedupeTags);
	}

  const filterByTag = (tags) => {
    let results = listings
    tags.forEach(tag => {
      results = results.filter(listing => {
        const filterRole = listing.role.includes(tag),
        filterLevel = listing.level.includes(tag),
        filterLanguages = listing.languages.includes(tag),
        filterTools = listing.tools&&listing.tools.includes(tag)
        return filterRole || filterLevel || filterLanguages || filterTools
		  })
    })
    setFilteredResults(results)
  }

  const handleDelete = (e, tagName) => {
    e.preventDefault();
    const removeTag = filterTags.filter(tag => tag !== tagName)
    setFilterTags(removeTag)
    filterByTag(removeTag);
  }

  const handleClear = () => {
    setFilteredResults(listings)
    setFilterTags([])
  }

  return (
    <Container className="App position-relative px-0" fluid>
      <div className={`header ${filterTags.length ? "mb-0" : "mb-5"}`}>
        <img src="./images/bg-header-desktop.svg" alt="header"/>
      </div>
      {filterTags.length ?
        <Container className="filter-tags-container position-relative">
            <Row className='filter-tags m-md-4 my-3 mx-0'>
              <Col className='d-flex flex-wrap' md={11} xs={12}>
              {filterTags.map((tag, id) => <div key={id} className="d-flex me-3 mb-md-0 mb-3"><span className="tag py-1 px-2">{tag}</span><span className='delete d-flex align-items-center justify-content-center' onClick={(e) => handleDelete(e, tag)}><IoClose size={20}/></span></div>)}
              </Col>
              <Col onClick={handleClear} className="clear align-self-center text-md-end" md={1}>Clear</Col>
            </Row>  
        </Container> : null
      }
      <Listing filterTags={filterTags} setFilterTags={setFilterTags} listings={listings} filteredResults={filteredResults} setFilteredResults={setFilteredResults} newResults={newResults} setNewResults={setNewResults} handleClick={handleClick}/>
		</Container>
  );
}

export default App;
