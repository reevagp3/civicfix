import React from "react";
/** Avatar — initials from `name`. */
export default function Avatar({ name = "?", className = "" }) {
  const initials = String(name).trim().split(/\s+/).map(s => s[0]).slice(0,2).join("").toUpperCase() || "?";
  return <div className={`cf-avatar ${className}`}>{initials}</div>;
}
