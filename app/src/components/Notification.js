import React from "react";

export function Notification({ lastAddedItem }) {
    return (
      <div className="notification">
        <p>Item {lastAddedItem} has been added.</p>
      </div>
    );
  }