import React from "react";
import error from "../../Assets/images/error.jpg";
const Error500 = () => {
  return (
    <>
      <div className="row p-2 mt-4 text-center">
        <h3>500 Internal server error ! </h3>
        <div className="error-container p-2">
          <img src={error} alt="Error" className="error-img" />
        </div>
      </div>
      <div>
        <button
          className="btn BackBtn me-2"
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Error500;
