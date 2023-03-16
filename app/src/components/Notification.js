import React from "react";

export function Notification({ lastAddedItem }) {
    return (
      <div id="notification">
        <p>{lastAddedItem} added.</p>
      </div>
    );
  }