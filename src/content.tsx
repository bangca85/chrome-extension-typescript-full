import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import FloatingIcon from "./component/FloatingIcon";
import ResultsModal from "./component/ResultsModal";

const ExtensionApp = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalOpenRequested = useRef(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rects = range.getClientRects();
        const lastRect = rects[rects.length - 1];
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
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (modalOpenRequested.current) {
        modalOpenRequested.current = false;
        return; // Exit early
      }
      const data = await getExtensionSettings();
      const selection = window.getSelection();

      if (selection && selection.toString().trim().length > 0) {
        if (data.displayOption === "iconClick") {
          setShowIcon(true);
          setShowModal(false);
        } else if (data.displayOption === "displayPopup") {
          setShowModal(true);
          setShowIcon(false);
        } else {
          setShowIcon(false);
          setShowModal(false);
        }
      } else {
        setShowIcon(false);
        setShowModal(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [showIcon, showModal, isSelecting]);

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    modalOpenRequested.current = true;
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
