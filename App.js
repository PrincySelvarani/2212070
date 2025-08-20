// src/App.js
import React, { useState, useEffect } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortName, setShortName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [urls, setUrls] = useState([]);

  const shortenUrl = () => {
    if (!longUrl.trim() || !shortName.trim()) {
      alert("Please enter both Long URL and Short Name");
      return;
    }

    const validity = minutes ? parseInt(minutes, 10) : 30; // default 30 minutes
    const expiryTime = Date.now() + validity * 60 * 1000; // convert minutes to ms

    const newUrl = {
      longUrl,
      shortName,
      remainingTime: validity * 60, // in seconds
      expiryTime,
    };

    setUrls([newUrl, ...urls]);

    // Clear inputs
    setLongUrl("");
    setShortName("");
    setMinutes("");
  };

  // Countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setUrls((prevUrls) =>
        prevUrls.map((url) => {
          const remaining = Math.max(Math.floor((url.expiryTime - Date.now()) / 1000), 0);
          return { ...url, remainingTime: remaining };
        }).filter((url) => url.remainingTime > 0) // remove expired
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🔗 Simple URL Shortener with Expiry</h1>

      {/* Input Section */}
      <input
        type="text"
        placeholder="Enter Long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px", borderRadius: "5px", border: "1px solid gray" }}
      />
      <input
        type="text"
        placeholder="Enter Short Name"
        value={shortName}
        onChange={(e) => setShortName(e.target.value)}
        style={{ padding: "10px", width: "200px", marginRight: "10px", borderRadius: "5px", border: "1px solid gray" }}
      />
      <input
        type="number"
        placeholder="Validity (minutes)"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        style={{ padding: "10px", width: "150px", marginRight: "10px", borderRadius: "5px", border: "1px solid gray" }}
      />
      <button
        onClick={shortenUrl}
        style={{ padding: "10px 20px", border: "none", borderRadius: "5px", backgroundColor: "blue", color: "white", cursor: "pointer" }}
      >
        Shorten URL
      </button>

      {/* Output Section */}
      <div style={{ marginTop: "30px", textAlign: "left" }}>
        {urls.length === 0 ? (
          <p>No URLs shortened yet or all expired.</p>
        ) : (
          <pre style={{ background: "#f4f4f4", padding: "15px", borderRadius: "8px", overflowX: "auto" }}>
            {JSON.stringify(
              urls.map((url) => ({
                longUrl: url.longUrl,
                shortName: url.shortName,
                remainingMinutes: (url.remainingTime / 60).toFixed(2),
              })),
              null,
              2
            )}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
