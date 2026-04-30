import React from "react";
export default function Textarea({ className = "", ...rest }) {
  return <textarea className={`cf-textarea ${className}`} {...rest} />;
}
