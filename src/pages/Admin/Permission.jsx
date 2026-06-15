export default function Permission({ permissions, onToggle }) {
  if (!permissions || Object.keys(permissions).length === 0) {
    return <p>No permissions found</p>;
  }

  return (
    <table className="permissions-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Access</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(permissions).map((key) => (
          <tr key={key}>
            <td>{key.replace(/_/g, " ").toUpperCase()}</td>
            <td>
              <button
                className={permissions[key] ? "on" : "off"}
                onClick={() => onToggle(key)}
              >
                {permissions[key] ? "ON" : "OFF"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
