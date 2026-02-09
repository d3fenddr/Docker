import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://weather-api:8080/api/WeatherForecast")
      .then((r) => {
        if (!r.ok) {
          throw new Error("Request failed");
        }
        return r.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Error");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px" }}>
      <h1>Weather forecast</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature C</th>
            <th>Temperature F</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x, i) => (
            <tr key={i}>
              <td>{x.date}</td>
              <td>{x.temperatureC}</td>
              <td>{x.temperatureF}</td>
              <td>{x.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


