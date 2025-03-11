import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styled from 'styled-components';
import a1 from '../../assets/a1.jpeg';
import a2 from '../../assets/a2.jpeg';
import a3 from '../../assets/a3.jpeg';

// Styled-components for text overlay
const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const SubText = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  font-weight: 300;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

const Banner = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
      style={{ height: '250px' }} // Inline style to set height
    >
      <ol className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner" style={{ height: '100%' }}> {/* Set inner height to 100% */}
        {/* First Slide */}
        <div className="carousel-item active position-relative" style={{ height: '100%' }}>
          <img className="d-block w-100" src={a1} alt="First slide" style={{ height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Second Slide */}
        <div className="carousel-item position-relative" style={{ height: '100%' }}>
          <img className="d-block w-100" src={a2} alt="Second slide" style={{ height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Third Slide */}
        <div className="carousel-item position-relative" style={{ height: '100%' }}>
          <img className="d-block w-100" src={a3} alt="Third slide" style={{ height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Banner;
