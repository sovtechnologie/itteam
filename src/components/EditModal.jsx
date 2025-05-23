// EditModal.jsx
import React from 'react';

const EditModal = ({ isOpen, onClose, candidate, onChange, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Candidate Info</h2>
        <input
          type="text"
          name="name"
          value={candidate.name}
          onChange={onChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="designation"
          value={candidate.designation}
          onChange={onChange}
          placeholder="Designation"
        />
        <input
          type="text"
          name="company"
          value={candidate.company}
          onChange={onChange}
          placeholder="Company"
        />
        <div className="modal-actions">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
