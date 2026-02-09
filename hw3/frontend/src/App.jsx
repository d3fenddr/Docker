import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(url)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Request failed");
        }
        return r.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Error");
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

function App() {
  const orders = useFetch("http://localhost:5310/api/Orders");
  const customers = useFetch("http://localhost:5320/api/Customers");

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16, display: "flex", gap: 32 }}>
      <div>
        <h1>Orders</h1>
        {orders.loading && <div>Loading...</div>}
        {orders.error && <div>Error: {orders.error}</div>}
        {!orders.loading && !orders.error && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.customer}</td>
                  <td>{x.product}</td>
                  <td>{x.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h1>Customers</h1>
        {customers.loading && <div>Loading...</div>}
        {customers.error && <div>Error: {customers.error}</div>}
        {!customers.loading && !customers.error && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.data.map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;


