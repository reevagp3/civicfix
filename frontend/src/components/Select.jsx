import React from "react";
/** Select — pass <option> children. */
export default function Select({ className = "", children, ...rest }) {
  return <select className={`cf-select ${className}`} {...rest}>{children}</select>;
}
