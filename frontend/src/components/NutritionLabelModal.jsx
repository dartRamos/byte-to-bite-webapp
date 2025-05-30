import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import "../styling/NutritionLabelModal.css";

const NutritionLabelModal = ({ recipeId, onClose }) => {
  const [labelHtml, setLabelHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const contentRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetch(`https://byte-to-bite-webapp.onrender.com/api/spoonacular/NutritionLabel/${recipeId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch nutrition label");
        return res.text();
      })
      .then(html => {
        setLabelHtml(html);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [recipeId]);

  const handleOverlayClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="nutrition-modal-overlay" onClick={handleOverlayClick}>
      <div className="nutrition-modal-content" ref={contentRef}>
        <button onClick={onClose} className="nutrition-modal-close-btn">
          <X size={40} />
        </button>
        {loading && <p className="nutrition-text-center">Loading...</p>}
        {error && <p className="nutrition-text-center" style={{color: "red"}}>{error}</p>}
        {!loading && !error && (
          <div dangerouslySetInnerHTML={{ __html: labelHtml }} />
        )}
      </div>
    </div>
  );
};

export default NutritionLabelModal;