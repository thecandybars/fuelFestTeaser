import * as React from "react";

const SvgTransferable = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M13.65 40 4 30.35l9.65-9.65 2.1 2.1-6.05 6.05h15.8v3H9.7l6.05 6.05Zm20.7-12.7-2.1-2.1 6.05-6.05H22.5v-3h15.8l-6.05-6.05 2.1-2.1L44 17.65Z" />
  </svg>
);

export default SvgTransferable;
