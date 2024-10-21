import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen h-screen">
      <div className="dot-spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loading;
