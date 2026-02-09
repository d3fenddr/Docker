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

const layoutStyle = {
  minHeight: "100vh",
  margin: 0,
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  background: "linear-gradient(135deg, #0f172a 0%, #020617 60%, #111827 100%)",
  color: "#e5e7eb",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  padding: "32px 16px"
};

const shellStyle = {
  width: "100%",
  maxWidth: 1120,
  display: "flex",
  gap: 24,
  borderRadius: 24,
  background: "rgba(15,23,42,0.9)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.65)",
  border: "1px solid rgba(148,163,184,0.3)",
  overflow: "hidden"
};

const sidebarStyle = {
  width: 320,
  borderRight: "1px solid rgba(51,65,85,0.9)",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  background: "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 55%)"
};

const mainStyle = {
  flex: 1,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 16
};

const chipRowStyle = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap"
};

const chipStyle = (active) => ({
  padding: "6px 12px",
  borderRadius: 999,
  border: active ? "1px solid rgba(251,191,36,0.9)" : "1px solid rgba(51,65,85,0.9)",
  background: active ? "rgba(251,191,36,0.08)" : "rgba(15,23,42,0.9)",
  color: active ? "#facc15" : "#e5e7eb",
  fontSize: 12,
  letterSpacing: 0.4,
  textTransform: "uppercase",
  cursor: "pointer"
});

const searchInputStyle = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid rgba(51,65,85,0.9)",
  background: "rgba(15,23,42,0.85)",
  color: "#e5e7eb",
  fontSize: 14,
  outline: "none"
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  overflowY: "auto"
};

const cardStyle = (active) => ({
  padding: 10,
  borderRadius: 12,
  border: active ? "1px solid rgba(59,130,246,0.9)" : "1px solid rgba(30,64,175,0.7)",
  background: active
    ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(15,23,42,0.95))"
    : "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.9))",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  cursor: "pointer",
  transition: "transform 120ms ease-out, box-shadow 120ms ease-out, border-color 120ms ease-out",
  boxShadow: active ? "0 10px 40px rgba(37,99,235,0.55)" : "0 4px 20px rgba(15,23,42,0.9)"
});

const cardNameStyle = {
  fontSize: 14,
  fontWeight: 600
};

const cardEmailStyle = {
  fontSize: 12,
  color: "#9ca3af"
};

const tableWrapStyle = {
  flex: 1,
  borderRadius: 16,
  border: "1px solid rgba(31,41,55,0.9)",
  background: "radial-gradient(circle at top, rgba(30,64,175,0.45), rgba(15,23,42,0.98) 60%)",
  padding: 12,
  overflow: "hidden"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13
};

const thStyle = {
  textAlign: "left",
  padding: "8px 10px",
  borderBottom: "1px solid rgba(30,64,175,0.9)",
  fontWeight: 500,
  color: "#9ca3af",
  textTransform: "uppercase",
  fontSize: 11,
  letterSpacing: 0.6
};

const trStyle = {
  borderBottom: "1px solid rgba(31,41,55,0.8)"
};

const tdStyle = {
  padding: "8px 10px"
};

const tagStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 8px",
  borderRadius: 999,
  background: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(55,65,81,0.9)",
  fontSize: 11,
  color: "#9ca3af"
};

const dotStyle = {
  width: 6,
  height: 6,
  borderRadius: 999,
  background: "#22c55e"
};

function App() {
  const orders = useFetch("http://localhost:5310/api/Orders");
  const customers = useFetch("http://localhost:5320/api/Customers");
  const [selectedCustomer, setSelectedCustomer] = useState("all");
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.data.filter((x) =>
    x.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleOrders =
    selectedCustomer === "all"
      ? orders.data
      : orders.data.filter((o) => o.customer === selectedCustomer);

  return (
    <div style={layoutStyle}>
      <div style={shellStyle}>
        <aside style={sidebarStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 12, color: "#9ca3af", letterSpacing: 0.4 }}>Dashboard</div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Microservices overview</div>
          </div>
          <div style={chipRowStyle}>
            <button
              style={chipStyle(selectedCustomer === "all")}
              onClick={() => setSelectedCustomer("all")}
            >
              All customers
            </button>
            <div style={tagStyle}>
              <span style={dotStyle} />
              {orders.data.length} orders
            </div>
          </div>
          <input
            style={searchInputStyle}
            placeholder="Search customers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ fontSize: 12, color: "#9ca3af" }}>Customers</div>
          <div style={listStyle}>
            {customers.loading && <div>Loading customers...</div>}
            {customers.error && <div>Error: {customers.error}</div>}
            {!customers.loading &&
              !customers.error &&
              filteredCustomers.map((c) => (
                <button
                  key={c.id}
                  style={cardStyle(selectedCustomer === c.name)}
                  onClick={() => setSelectedCustomer(c.name)}
                >
                  <div style={cardNameStyle}>{c.name}</div>
                  <div style={cardEmailStyle}>{c.email}</div>
                </button>
              ))}
            {!customers.loading && !customers.error && filteredCustomers.length === 0 && (
              <div style={{ fontSize: 12, color: "#6b7280" }}>No customers</div>
            )}
          </div>
        </aside>
        <main style={mainStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>Orders</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>
                {selectedCustomer === "all" ? "All customers" : selectedCustomer}
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: 12, color: "#9ca3af" }}>
              <div>Services:</div>
              <div>orders-api · customers-api · microservices-client</div>
            </div>
          </div>
          <div style={tableWrapStyle}>
            {orders.loading && <div>Loading orders...</div>}
            {orders.error && <div>Error: {orders.error}</div>}
            {!orders.loading && !orders.error && (
              <table style={tableStyle}>
                <thead>
                  <tr style={trStyle}>
                    <th style={thStyle}>Order</th>
                    <th style={thStyle}>Customer</th>
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleOrders.map((x) => (
                    <tr key={x.id} style={trStyle}>
                      <td style={tdStyle}>#{x.id}</td>
                      <td style={tdStyle}>{x.customer}</td>
                      <td style={tdStyle}>{x.product}</td>
                      <td style={tdStyle}>{x.quantity}</td>
                    </tr>
                  ))}
                  {!visibleOrders.length && (
                    <tr>
                      <td style={tdStyle} colSpan={4}>
                        No orders for this customer
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;