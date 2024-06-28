// Spinner.js
import React from "react";

const Spinner = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Spinner;
