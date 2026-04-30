import React from "react";
export default function Input({ className = "", ...rest }) {
  return <input className={`cf-input ${className}`} {...rest} />;
}
