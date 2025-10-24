import React, { useEffect, useState } from "react";
import'./trainee.css';
import Button from "./Button";
import AddPopup from "./AddPopup";
import EditPopup from "./EditPopup";

interface Trainee {
id: number;
name: string;
age: number;
email: string;
department: string;
stipend: number;
}

const Trainees: React.FC = () => {
const [trainees, setTrainees] = useState<Trainee[]>([]);
const [showAddPopup, setShowAddPopup] = useState(false);
const [showEditPopup, setShowEditPopup] = useState(false);
const [editingTrainee, setEditingTrainee] = useState<Trainee | null>(null);

const getFetchData = async () => {
  try {
    const response = await fetch("http://localhost:8080/Trainee/training", {
      method: "GET", // ✅ this line makes it a GET request
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json(); // ✅ backend JSON data received here
    setTrainees(responseData); // ✅ store backend data into state
  } catch (error) {
    console.error("Error fetching trainees:", error);
  }
};

useEffect(() => {
    getFetchData();
  }, []);

const handleAddTrainee = (newTrainee: Omit<Trainee, "id">) => {
setTrainees([...trainees, { id: Date.now(), ...newTrainee }]);
setShowAddPopup(false);
};

const handleDelete = (id: number) => {
setTrainees(trainees.filter((t) => t.id !== id));
};

const handleEdit = (trainee: Trainee) => {
setEditingTrainee(trainee);
setShowEditPopup(true);
};

const handleUpdateTrainee = (updatedTrainee: Trainee) => {
setTrainees(
trainees.map((t) => (t.id === updatedTrainee.id ? updatedTrainee : t))
);
setShowEditPopup(false);
};

return (
     <div className="trainees-container"> 
     <div className="header">
<Button text="Add Trainee" onClick={() => setShowAddPopup(true)} /> 


  <table className="trainees-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Department</th>
        <th>stipend</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {trainees.length > 0 ? (
        trainees.map((t) => (
          <tr key={t.id}>
            <td>{t.name}</td>
            <td>{t.age}</td>
            <td>{t.email}</td>
            <td>{t.department}</td>
            <td>{t.stipend}</td>
            <td>
              <Button text="Edit" type="edit" onClick={() => handleEdit(t)} />
              <Button text="Delete" type="delete" onClick={() => handleDelete(t.id)} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>No trainees found.</td>
        </tr>
      )}
    </tbody>
  </table>

  {showAddPopup && (
    <AddPopup onClose={() => setShowAddPopup(false)} onAdd={handleAddTrainee} />
  )}

  {showEditPopup && editingTrainee && (
    <EditPopup
      trainee={editingTrainee}
      onClose={() => setShowEditPopup(false)}
      onUpdate={handleUpdateTrainee}
    /> )
  }
    </div>
</div>
 );
 };

export default Trainees;
