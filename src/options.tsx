import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Options = () => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Load options from chrome.storage.sync when the component mounts
    chrome.storage.sync.get(["displayOption"], function (result) {
      if (result.displayOption) {
        setSelectedOption(result.displayOption);
      } else {
        // Set a default value if nothing is saved
        setSelectedOption("iconClick"); // or any default you prefer
      }
    });
  }, []);
  
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    console.log("Selected Option:", selectedOption);
    chrome.storage.sync.set({ displayOption: selectedOption }, function () {
      if (chrome.runtime.lastError) {
        console.error("Error saving options:", chrome.runtime.lastError);
      } else {
        console.log("Options saved:", selectedOption);
      }
    });
  };

  return (
    <div className="settings-container">
      <div className="title-heading">
        <h1>Example extension</h1>
        <div className="options-title-heading">Chrome Extension Options</div>
      </div>

      <div className="settings-row">
        <div className="settings-column-title">Pop-up display</div>
        <div className="settings-column-value">
          <label>
            <input
              type="radio"
              name="displayOption"
              value="iconClick"
              checked={selectedOption === "iconClick"}
              onChange={handleOptionChange}
            />
            Display icon that I can click to show a pop-up
          </label>
          <label>
            <input
              type="radio"
              name="displayOption"
              value="displayPopup"
              checked={selectedOption === "displayPopup"}
              onChange={handleOptionChange}
            />
            Immediately display the popup
          </label>
          <label>
            <input
              type="radio"
              name="displayOption"
              value="noDisplay"
              checked={selectedOption === "noDisplay"}
              onChange={handleOptionChange}
            />
            Don't display icon or pop-up
          </label>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-column-title"></div>
        <div className="settings-column-value">
          <button id="saveButton" onClick={saveOptions}>
            Save
          </button>
          <button id="saveReset">Reset</button>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
