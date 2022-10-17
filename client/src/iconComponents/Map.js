import * as React from "react";

const SvgMap = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // viewBox="0 0 60 60"
    viewBox="0 0 45 45"
    height="1.2em"
    width="1.2em"
    {...props}
  >
    <path d="m30.6 42-13.15-4.65L8.5 40.9q-.85.45-1.675-.05Q6 40.35 6 39.35v-27.9q0-.65.375-1.15.375-.5.975-.75L17.45 6l13.15 4.6 8.9-3.55q.85-.4 1.675.075Q42 7.6 42 8.6v28.25q0 .55-.375.95-.375.4-.925.6Zm-1.7-3.75V13l-9.8-3.3v25.25Zm3 0L39 35.9V10.3L31.9 13ZM9 37.65l7.1-2.7V9.7L9 12.05ZM31.9 13v25.25ZM16.1 9.7v25.25Z" />
  </svg>
);

export default SvgMap;
