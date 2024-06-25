import React from "react";

const TopicCard = ({ title, description }) => {
  return (
    // <div className="topic-card">
    //   <h3>{title}</h3>
    //   <p>{description}</p>
    // </div>
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default TopicCard; // Ensure you are exporting the component like this