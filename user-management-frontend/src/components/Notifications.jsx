import React from "react";

export default function Notifications({ notifications = [] }) {
  return (
    <div className="card shadow-sm p-3 mb-3">
      <h5>Notifications</h5>
      <ul className="list-group">
        {notifications.length === 0 ? (
          <li className="list-group-item text-muted">No notifications</li>
        ) : (
          notifications.map((note, i) => (
            <li key={i} className="list-group-item">
              {note}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
