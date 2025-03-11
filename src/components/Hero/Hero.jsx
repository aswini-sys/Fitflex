import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { ClipLoader } from "react-spinners"; // For loading spinner

// ✅ GitHub JSON URL for free-exercise-db
const EXERCISE_DB_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const IMAGE_BASE_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

// ✅ Styled Components
const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background: 
              url('/image1.png'); /* Add background image from public folder */
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const Navigation = styled.nav`
  position: absolute;
  top: 20px;
  left: 20px;

  a {
    text-decoration: none;
    color: white;
    font-size: 1.2rem;
    background: rgba(50, 35, 35, 0.2);
    padding: 10px 20px;
    border-radius: 8px;
    transition: 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.2);
`;

const DropdownContainer = styled.div`
  margin-top: 20px;

  select {
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 8px;
    border: 1px solid white;
    background-color: rgba(245, 252, 252, 0.1);
    color: black;
    cursor: pointer;
    outline: none;
    transition: 0.3s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const WorkoutsContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  max-width: 1200px;
  text-align: center;
  margin-top: 40px;
  color: white;
  width: 90%;
`;

const WorkoutsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const WorkoutCard = styled.div`
  background: rgba(30, 28, 28, 0.1);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const WorkoutImage = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
  display: block;
  background: rgba(255, 255, 255, 0.1); // Fallback background
`;

// ✅ Popup Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  text-align: left;
  position: relative;
  color: black;
  animation: fadeIn 0.3s ease-in-out;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 50%;
  cursor: pointer;
`;

// ✅ Hero Component
const Hero = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await fetch(EXERCISE_DB_URL);
      if (!response.ok) throw new Error("Failed to load exercises");

      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (exerciseName, index) => {
    const formattedName = exerciseName.replace(/\s+/g, "_");
    return `${IMAGE_BASE_URL}${formattedName}/${index}.jpg`;
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    const filtered = category === ""
      ? [] // Show nothing if no category is selected
      : exercises.filter((ex) => {
          const imageUrl = getImageUrl(ex.name, 0);
          return ex.category?.toLowerCase() === category.toLowerCase() && imageUrl;
        });

    setFilteredExercises(filtered);
    setSelectedExercise(null);
  };

  const openModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  return (
    <HeroSection>
      <Navigation>
        <Link to="/">🏠 Home</Link>
      </Navigation>

      <Title>Unleash Your Inner Hero. Elevate Your Fitness.</Title>

      <DropdownContainer>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Choose Exercise Type</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="stretching">Stretching</option>
        </select>
      </DropdownContainer>

      <WorkoutsContainer>
        <WorkoutsList>
          {filteredExercises.map((exercise) => (
            <WorkoutCard key={exercise.id} onClick={() => openModal(exercise)}>
              <WorkoutImage
                src={getImageUrl(exercise.name, 0)}
                alt={exercise.name}
                onError={(e) => {
                  e.target.style.display = "none"; // Hide the image if it fails to load
                }}
              />
              <p>{exercise.name}</p>
            </WorkoutCard>
          ))}
        </WorkoutsList>
      </WorkoutsContainer>

      {showModal && selectedExercise && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal} aria-label="Close modal">&times;</CloseButton>
            <h2>{selectedExercise.name}</h2>
            <p><b>Instructions:</b></p>
            <ul>
              {selectedExercise.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </ModalContent>
        </ModalOverlay>
      )}
    </HeroSection>
  );
};

export default Hero;