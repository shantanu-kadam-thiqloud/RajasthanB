import React from "react";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="text-center">
        Kotak Bank &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
