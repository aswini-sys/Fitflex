import React, { useState } from 'react';
import { trainers } from '../../mockData/data'; // Mock data of trainers
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import v2 from '../../assets/v2.mp4'; // Background video
import './Trainer.css'; // Ensure CSS file is properly set

const Trainer = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null); // State to track selected trainer
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Opens the modal and sets the selected trainer
  const handleClick = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  // Closes the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrainer(null);
  };

  return (
    <div className="trainer-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src={v2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="trainer-heading">Meet Our Trainers</h1>
      <motion.div 
        className="trainer-grid"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {trainers.map(trainer => (
          <motion.div 
            key={trainer.id}
            className="trainer-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(trainer)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: trainer.id * 0.1 }}
          >
            <div className="trainer-header">
              <img src={trainer.image} alt={trainer.name} className="trainer-image" />
              <div className="trainer-info">
                <h2 className="trainer-name">{trainer.name}</h2>
                <span className="trainer-category">{trainer.category}</span><br></br>
                <button className="trainer-btn">See Details</button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {isModalOpen && selectedTrainer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              <img src={selectedTrainer.image} alt={selectedTrainer.name} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedTrainer.name}</h2>
                <span className="modal-category">{selectedTrainer.category}</span>
              </div>
            </div>
            <div className="modal-body">
              <p><strong>About:</strong> {selectedTrainer.about}</p>
              <p><strong>Availability:</strong> {selectedTrainer.time}</p>
              <p><strong>Contact:</strong> {selectedTrainer.contact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainer;
