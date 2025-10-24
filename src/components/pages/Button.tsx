import React from "react";
import "./Button.css";

interface ButtonProps {
text: string;
onClick: () => void;
type?: "default" | "edit" | "delete";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "default" }) => {
return (
<button className={`btn ${type}`} onClick={onClick}>
{text} </button>
);
};

export default Button;
