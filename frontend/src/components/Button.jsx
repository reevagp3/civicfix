import React from "react";

/**
 * Button
 * Props: variant ("primary"|"secondary"|"ghost"|"danger"|"success"),
 *        size ("sm"|"md"|"lg"), block, leftIcon, rightIcon, ...rest
 */
export default function Button({
  variant = "primary",
  size = "md",
  block = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "cf-btn",
    `cf-btn--${variant}`,
    size === "sm" ? "cf-btn--sm" : size === "lg" ? "cf-btn--lg" : "",
    block ? "cf-btn--block" : "",
    className,
  ].join(" ").trim();
  return (
    <button className={cls} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
