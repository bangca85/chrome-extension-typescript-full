import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type ResultsModalProps = {
  selectedText: string;
  onClose: () => void;
};

const ResultsModal: React.FC<ResultsModalProps> = ({
  selectedText,
  onClose,
}) => {
  const [content, setContent] = useState<string>("Loading...");
  const modalRef = React.useRef<HTMLDivElement>(null);

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "0 0 10px 10px",
    zIndex: 1001,
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    maxHeight: "80vh",
    overflowY: "auto",
    color: "#404040",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "sticky",
    top: "-5px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "11px",
    color: "#333",
    textAlign: "right",
    width: "98%",
  };

  const contentStyle: React.CSSProperties = {
    padding: "0 10px 0 15px",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { 
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    async function fetchData() {
      try {
        // Replace callAPI with your actual API call function
        // // const apiResult = await callAPI(selectedText);
        // if (apiResult) {
        //   setContent(apiResult);
        // } else {
        //   setContent("Failed to load content.");
        // }
      } catch (error) {
        console.error("Error calling API:", error);
        setContent("Error loading content.");
      }
    }
    fetchData();
  }, [selectedText, modalRef, onClose]);


  const handleCloseClick = (event: React.SyntheticEvent) => {
    console.log("Closing handleCloseClick modal");
    event.stopPropagation();
    onClose();
  };
  

  return (
    <div ref={modalRef} style={modalStyle}>
      <button style={closeButtonStyle} onClick={handleCloseClick}>
        X
      </button>
      <div
        style={contentStyle}
        dangerouslySetInnerHTML={{
          __html:
            "{selectedText} <br /> This is the content that will be displayed in the modal.",
        }}
      />
    </div>
  );
};

export default ResultsModal;
