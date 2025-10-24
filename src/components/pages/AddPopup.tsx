import React, { useState } from "react";
import "./AddPopup.css";

interface AddPopupProps {
  onClose: () => void;
  onAdd: (trainee: {
    name: string;
    age: number;
    email: string;
    department: string;
    stipend: number;
  }) => void;
}

const AddPopup: React.FC<AddPopupProps> = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    department: "",
    stipend: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      age: Number(form.age),
      email: form.email,
      department: form.department,
      stipend: Number(form.stipend),
    };

    try {
      const response = await fetch("http://localhost:8080/Trainee/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add trainee");
      }

      const data = await response.json();
      console.log("Backend response:", data);

      onAdd(payload);
      onClose();
    } catch (error) {
      console.error("Error adding trainee:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Add Trainee</h3>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="age" placeholder="Age" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="department" placeholder="Department" onChange={handleChange} />
        <input name="stipend" placeholder="Stipend" onChange={handleChange} />

        <div className="popup-actions">
          <button onClick={handleSubmit}>Add</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddPopup;
