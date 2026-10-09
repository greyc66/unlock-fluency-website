import React, { useEffect } from "react";

export const DISCOVERY_CALL_URL = "https://theunlockfluencymethod.setmore.com/services/9273b47e-a6d3-4413-8922-d4ccb8b666e7";

function loadSetmoreScript() {
  if (document.getElementById("setmore_script")) return;
  const script = document.createElement("script");
  script.id = "setmore_script";
  script.type = "text/javascript";
  script.src = "https://assets.setmore.com/integration/static/setmoreIframeLive.js";
  document.head.appendChild(script);
}

// Setmore's script only attaches its popup to buttons that exist when it first loads, which misses
// buttons rendered after moving between pages. Calling its global setmorePopup on click works for
// every button; if the script hasn't loaded yet, the link simply opens the booking page.
export default function BookingLink({ href, className = "", children }) {
  useEffect(loadSetmoreScript, []);

  const handleClick = (e) => {
    if (typeof window.setmorePopup === "function") {
      window.setmorePopup(e.nativeEvent, href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
