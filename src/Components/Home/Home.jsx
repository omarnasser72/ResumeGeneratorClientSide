import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/ResumeGeneration?LinkedInProfile=${searchTerm}`)
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <h3 className='text-center m-3'>Resume Generator</h3>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter your linkedIn profile url..."
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="primary" 
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Home;