import React, { useState } from "react";
import SeatSelection from "./SeatSelection";
import "./StadiumMap.css"; // CSS for the stadium UI

const stadiumSections = [
  { id: "A", name: "Block A", price: 2000 },
  { id: "B", name: "Block B", price: 2500 },
  { id: "C", name: "Block C", price: 3000 },
  { id: "D", name: "Block D", price: 3500 },
];

const StadiumMap = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="stadium-container">
      <h2>Select a Section</h2>
      <div className="stadium-map">
        {stadiumSections.map((section) => (
          <div
            key={section.id}
            className={`stadium-section section-${section.id}`}
            onClick={() => setSelectedSection(section)}
          >
            {section.name}
          </div>
        ))}
      </div>

      {selectedSection && (
        <SeatSelection
          section={selectedSection}
          onClose={() => setSelectedSection(null)}
        />
      )}
    </div>
  );
};

export default StadiumMap;
