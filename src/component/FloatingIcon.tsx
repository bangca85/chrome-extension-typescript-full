import React, { useEffect, useState } from "react";

interface FloatingIconProps {
  x: number;
  y: number;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void; 
  selectedText: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({
  x,
  y,
  onClick,
  selectedText,
}) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(chrome.runtime.getURL("icons/research-icon-24.png"))
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setIconUrl(url);
      })
      .catch((error) => console.error("Error loading icon:", error));
  }, []);

  if (!iconUrl) {
    return null;
  }

  const iconStyle: React.CSSProperties = {
    cursor: "pointer",
    zIndex: 1000,
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: "24px",
    height: "24px",
  };

  return (
    <img
      src={iconUrl}
      style={iconStyle}
      onClick={onClick}
      alt="Floating icon"
    />
  );
};

export default FloatingIcon;
