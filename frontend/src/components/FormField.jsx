import React from "react";
/** FormField wrapper: label + child input + help/error */
export default function FormField({ label, htmlFor, help, error, children }) {
  return (
    <div className="cf-field">
      {label && <label className="cf-label" htmlFor={htmlFor}>{label}</label>}
      {children}
      {error ? <div className="cf-error">{error}</div>
            : help ? <div className="cf-help">{help}</div> : null}
    </div>
  );
}
