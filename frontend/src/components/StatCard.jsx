import React from "react";

/**
 * StatCard
 * Props: label, value, icon?, variant? ("pending"|"progress"|"resolved"|"default"), trend?, trendDir? ("up"|"down")
 */
export default function StatCard({ label, value, icon, variant = "default", trend, trendDir }) {
  const cls = variant !== "default" ? `cf-stat cf-stat--${variant}` : "cf-stat";
  return (
    <div className={cls}>
      <div className="cf-stat-icon">{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div className="cf-stat-label">{label}</div>
        <div className="cf-stat-value">{value}</div>
        {trend && (
          <div className={"cf-stat-trend " + (trendDir === "up" ? "is-up" : trendDir === "down" ? "is-down" : "")}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
