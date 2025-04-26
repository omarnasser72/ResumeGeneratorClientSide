import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from "../../axios";
import { useSearchParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

const ResumeGeneration = () => {
  const [searchParams] = useSearchParams();
  const linkedInProfileLink = searchParams.get('LinkedInProfile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    experiences: [{
      position: '',
      companyName: '',
      startDate: '',
      endDate: ''
    }],
    educations: [{
      college: '',
      degree: '',
      startYear: '',
      endYear: ''
    }]
  });

  const [loading, setLoading] = useState(false);

  const getUserDataAsync = async ()=>{
    try {
      setLoading(true);
      const res = await axios.get(`/GetLinkedInData`,{params:{linkedInProfileLink}});
      const data = res?.data;
      console.log(data);
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getUserDataAsync();
  },[])

  const handleInputChange = (section, index, field, value) => {
    const newData = [...formData[section]];
    newData[index][field] = value;
    setFormData(prev => ({ ...prev, [section]: newData }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        position: '',
        companyName: '',
        startDate: '',
        endDate: ''
      }]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      educations: [...prev.educations, {
        college: '',
        degree: '',
        startYear: '',
        endYear: ''
      }]
    }));
  };

  const removeExperience = (index) => {
    const newExperiences = formData.experiences.filter((exp, ind) => ind !== index);
    setFormData(prev => ({ ...prev, experiences: newExperiences }));
  };

  const removeEducation = (index) => {
    const newEducations = formData.educations.filter((edu, ind) => ind !== index);
    setFormData(prev => ({ ...prev, educations: newEducations }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      // Send formData as the body, and configure axios to expect a blob response:
      const response = await axios.post(
        '/GetResumeFile',      // URL
        formData,              // <-- raw DTO fields here
        { responseType: 'blob' }  // <-- axios config
      );
  
      // Trigger download
      saveAs(
        new Blob([response.data], { type: 'application/pdf' }),
        `${formData.firstName}_${formData.lastName}_Resume.pdf`
      );
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container py-5">
      {loading?
      <img 
      src='https://res.cloudinary.com/omarnasser/image/upload/v1745693057/k1hla6kwuhyl0juquid9.gif' 
      alt="Loading..."
      className="w-100 vh-50 position-fixed top-0 start-0"
      style={{ 
        objectPosition: 'center',
      }}
    />
      :<>
      <h2 className="mb-4">Profile Form</h2>
      <Form onSubmit={handleSubmit}>
        <div className="mb-5 p-4 border rounded">
          <h4 className="mb-4">Personal Information</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="mb-5 p-4 border rounded">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Work Experience</h4>
            <Button variant="outline-primary" onClick={addExperience}>
              Add Experience
            </Button>
          </div>
          
          {formData.experiences.map((experience, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      value={experience.position}
                      onChange={(e) => handleInputChange('experiences', index, 'position', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={experience.companyName}
                      onChange={(e) => handleInputChange('experiences', index, 'companyName', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={experience.startDate}
                      onChange={(e) => handleInputChange('experiences', index, 'startDate', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={experience.endDate}
                      onChange={(e) => handleInputChange('experiences', index, 'endDate', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {formData.experiences.length > 0 && (
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => removeExperience(index)}
                >
                  Remove Experience
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="mb-5 p-4 border rounded">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Education</h4>
            <Button variant="outline-primary" onClick={addEducation}>
              Add Education
            </Button>
          </div>

          {formData.educations.map((edu, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>College/University</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.college}
                      onChange={(e) => handleInputChange('educations', index, 'college', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleInputChange('educations', index, 'degree', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.startYear}
                      onChange={(e) => handleInputChange('educations', index, 'startYear', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Year</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.endYear}
                      onChange={(e) => handleInputChange('educations', index, 'endYear', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {formData.educations.length > 0 && (
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  Remove Education
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" type="submit">
            Submit Profile
          </Button>
        </div>
      </Form>
      </>}
    </div>
  );
};

export default ResumeGeneration;