import React, { useState } from 'react';

const GenderSelector = ({ handleGender }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGenderSelection = (gender) => {
    handleGender(gender);
    closeModal();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Please Select Your Gender :</h2><br/>
            <button onClick={() => handleGenderSelection('Male')}>Male</button>
            <button onClick={() => handleGenderSelection('Female')}>Female</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenderSelector;
