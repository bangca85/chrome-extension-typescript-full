import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import FloatingIcon from "./component/FloatingIcon";
import ResultsModal from "./component/ResultsModal";

const ExtensionApp = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rects = range.getClientRects();
        const lastRect = rects[rects.length - 1];
        console.log("Selection:handleSelectionChange", selection);
        if (lastRect) {
          setSelectedText(selection.toString());
          setIconPosition({ x: lastRect.right, y: lastRect.bottom });
          setShowIcon(true);
          setIsSelecting(true);
        }
      } else {
        setShowIcon(false);
        setIsSelecting(false);
      }
    };

    const handleMouseUp = async () => {
      const data = await getExtensionSettings();
      const selection = window.getSelection(); 
      console.log("Selection:handleMouseUp", selection);
      console.log("Selection:isSelecting", isSelecting);
      console.log("Selection:showIcon", showIcon);
      console.log("Selection:showModal", showModal);
      console.log("Selection:data", data);
      if (!isSelecting) return;
      if (selection && selection.toString().trim().length > 0) {
        if (data.displayOption === "iconClick" && !showModal) {
          setShowIcon(true);
          setShowModal(false); 
        } 
        if (data.displayOption === "displayPopup" || showModal) {
          setShowModal(true);
          setShowIcon(false);
          setIsSelecting(false);
        }
      } else {
        setShowIcon(false);
        setShowModal(false);
        setIsSelecting(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [showIcon, showModal,isSelecting]);

  const handleIconClick = (event: React.MouseEvent) => {
    console.log("handleIconClick");
    event.stopPropagation(); // Stop event from propagating to document
    setShowModal(true);
    setShowIcon(false);
  };

  const handleCloseModal = () => { 
    setIsSelecting(false); 
    setShowModal(false); 
  };

  return (
    <>
      {showIcon && (
        <FloatingIcon
          x={iconPosition.x}
          y={iconPosition.y}
          onClick={(e) => handleIconClick(e)}
          selectedText={selectedText}
        />
      )}
      {showModal && (
        <ResultsModal selectedText={selectedText} onClose={handleCloseModal} />
      )}
    </>
  );
};

async function getExtensionSettings(): Promise<{ displayOption: string }> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["displayOption"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving settings:", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve(result as { displayOption: string });
      }
    });
  });
}

// Mount the root component to the DOM
const rootContainer = document.createElement("div");
document.body.appendChild(rootContainer);
const root = createRoot(rootContainer);
root.render(<ExtensionApp />);
