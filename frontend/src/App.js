import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);

  const userId = "123";

  const fetchEntries = async () => {
    const res = await axios.get(`http://localhost:5000/api/journal/${userId}`);
    setEntries(res.data);
  };

  const fetchInsights = async () => {
    const res = await axios.get(`http://localhost:5000/api/journal/insights/${userId}`);
    setInsights(res.data);
  };

  const analyzeJournal = async () => {
    await axios.post("http://localhost:5000/api/journal/analyze", {
      userId,
      text
    });

    setText("");
    fetchEntries();
    fetchInsights();
  };

  useEffect(() => {
    fetchEntries();
    fetchInsights();
  }, []);

  return (
  <div className="container">

    <h1>AI-Assisted Journal System</h1>

    <div className="journal-box">

      <h3>Write a Journal Entry</h3>

      <select className="select">
        <option>forest</option>
        <option>ocean</option>
        <option>mountain</option>
      </select>

      <textarea
        placeholder="Write your journal..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />

      <button onClick={analyzeJournal}>
        Submit Journal
      </button>

    </div>


    <div className="grid">

      <div className="entries">

        <h3>Previous Entries</h3>

        {entries.map((entry)=>(
          <div key={entry._id} className="entry-card">
            <p>{entry.text}</p>

            <p><b>Emotion:</b> {entry.emotion}</p>
            <p><b>Keywords:</b> {entry.keywords?.join(", ")}</p>
            <p><b>Summary:</b> {entry.summary}</p>

          </div>
        ))}

      </div>


      <div className="insights">

        <h3>Insights</h3>

        {insights && (
          <>
          <p>Total Entries: {insights.totalEntries}</p>
          <p>Top Emotion: {insights.topEmotion}</p>
          <p>Most Used Ambience: {insights.mostUsedAmbience}</p>
          <p>Recent Keywords: {insights.recentKeywords.join(", ")}</p>
          </>
        )}

      </div>

    </div>

  </div>
);
}

export default App;