import React from "react";
import sprite from "feather-icons/dist/feather-sprite.svg";
export const Icon = ({ name }) => {
  return (
    <svg
      className="feather-icon"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};
