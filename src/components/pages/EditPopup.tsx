import React, { useState } from "react";
import "./EditPopup.css";

interface Trainee {
id: number;
name: string;
age: number;
email: string;
department: string;
stipend: number;
}

interface EditPopupProps {
trainee: Trainee;
onClose: () => void;
onUpdate: (trainee: Trainee) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ trainee, onClose, onUpdate }) => {
const [form, setForm] = useState(trainee);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = () => {
onUpdate({
...form,
age: Number(form.age),
stipend: Number(form.stipend),
});
}

return (
     <div className="popup-overlay">
     <div className="popup">
         <h3>Edit Trainee</h3> 
         <input name="name" value={form.name} onChange={handleChange} />
          <input name="age" value={form.age} onChange={handleChange} /> 
          <input name="email" value={form.email} onChange={handleChange} /> 
          <input name="department" value={form.department} onChange={handleChange} /> 
          <input name="stipend" value={form.stipend} onChange={handleChange} />

    <div className="popup-actions">
      <button onClick={handleSubmit}>Update</button>
      <button onClick={onClose} className="cancel">Cancel</button>
    </div>
  </div>
</div>

)}

export default EditPopup;
