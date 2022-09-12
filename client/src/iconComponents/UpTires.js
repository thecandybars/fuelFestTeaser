import * as React from "react";

const SvgUpTires = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70 70"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M2.92 32.89c.37-1.8.63-3.63 1.14-5.39C8.27 13.07 24.03 5.07 38.18 10.11c.96.34 1.33.8 1.27 1.84-.1 1.55-.03 3.12-.03 4.89-5.77-2.88-11.56-3.39-17.48-1.17-4.02 1.51-7.25 4.1-9.68 7.64-4.97 7.23-4.88 16.67.23 23.76 3.06 4.25 7.16 7.03 12.28 8.17 5.03 1.12 9.88.44 14.65-2.06 0 2.04.06 3.84-.05 5.62-.02.37-.62.87-1.06 1.04-10.03 3.84-22.13.62-29.07-7.7-3.43-4.11-5.55-8.8-6.11-14.15-.03-.28-.14-.54-.22-.82v-4.28ZM67.08 36.02c-2.87 1.92-5.74 3.84-8.61 5.75-.38.26-.77.51-1.41.92 0-2.79-.03-5.37.04-7.94 0-.35.48-.77.84-1.01 3.03-2.11 6.09-4.19 9.13-6.28v8.56ZM67.08 48.86c-2.68 1.79-5.35 3.58-8.03 5.37-.58.39-1.17.77-1.99 1.31 0-2.72-.02-5.21.03-7.69 0-.3.3-.69.58-.87 3.13-2.15 6.27-4.26 9.41-6.38v8.27ZM67.08 22.9c-3.24 2.19-6.48 4.39-10.01 6.78 0-2.77-.01-5.29.02-7.8 0-.22.25-.51.46-.65 3.08-2.11 6.17-4.21 9.26-6.31.06-.04.18 0 .27 0v7.99ZM67.08 59.7c-.74 2.7-2.26 4.76-5.11 5.31-1.5.29-3.11.05-4.89.05 0-1.48-.03-3.02.03-4.56 0-.25.33-.55.58-.72 3.12-2.13 6.26-4.24 9.39-6.36v6.27ZM53.2 42.73c-2.95-2.02-5.63-3.95-8.42-5.7-1.29-.81-1.77-1.7-1.66-3.21.14-2.01.04-4.04.04-6.34 1.45.98 2.7 1.81 3.93 2.65 1.72 1.18 3.48 2.31 5.13 3.57.47.36.91 1.09.93 1.67.1 2.35.04 4.71.04 7.35ZM53.2 55.58c-3.35-2.29-6.43-4.38-9.48-6.52-.29-.2-.53-.68-.54-1.03-.05-2.41-.02-4.82-.02-7.52.8.54 1.45.97 2.09 1.41 2.34 1.6 4.72 3.17 7 4.84.47.35.88 1.1.91 1.68.1 2.27.04 4.54.04 7.13ZM53.2 29.7c-3.43-2.34-6.55-4.46-9.65-6.63-.24-.17-.37-.64-.38-.98-.03-2.37-.02-4.74-.02-7.32.48.28.84.45 1.16.68 2.62 1.79 5.22 3.63 7.87 5.37.78.51 1.05 1.07 1.02 1.97-.06 2.18-.02 4.36-.02 6.9ZM57.11 16.89V5.12c4.61-.78 7.56 0 9.37 3.56.46.91.46 1.57-.56 2.23-2.9 1.87-5.72 3.87-8.8 5.98ZM53.11 4.89v11.93c-1.3-.87-2.42-1.61-3.53-2.37-1.84-1.25-3.69-2.48-5.48-3.8-.33-.25-.63-.94-.53-1.32.64-2.44 3.12-4.35 5.65-4.44 1.27-.04 2.53 0 3.89 0ZM43.17 53.33c3.32 2.27 6.41 4.36 9.46 6.5.29.2.53.67.54 1.03.06 1.36.03 2.73.03 4.17-1.74 0-3.42.24-5-.05-2.9-.55-4.83-3.02-5.01-6.12-.1-1.74-.02-3.49-.02-5.53Z" />
    <path d="M18.61 21.96c2.63-2.1 5.44-3.37 8.83-3.71 0 3.25.03 6.37-.02 9.49-.01.89-1.46 1.5-2.1.88-2.24-2.17-4.44-4.39-6.72-6.66ZM16.28 45.76c-2.14-2.64-3.33-5.47-3.75-8.86h6.99c.81 0 1.63-.09 2.41.04.39.07.82.5 1 .88.16.33.17.98-.04 1.21-2.15 2.26-4.37 4.47-6.62 6.73ZM31.25 18.28c3.02.26 5.57 1.28 7.82 2.99.27.2.27 1.28 0 1.57-1.83 1.98-3.76 3.87-5.69 5.75-.65.63-2.09.06-2.11-.84-.05-3.11-.02-6.22-.02-9.47ZM27.45 51.78c-3.21-.27-5.86-1.49-8.6-3.46 2.39-2.33 4.67-4.58 6.99-6.78.56-.53 1.58-.03 1.59.78.03 3.12.01 6.24.01 9.46ZM31.24 51.77c0-3.27-.02-6.31.03-9.35 0-.32.33-.79.62-.92.28-.13.85-.03 1.07.19 2.05 1.98 4.07 4 6.04 6.05.19.2.18.98 0 1.11-2.25 1.65-4.76 2.67-7.76 2.91ZM15.98 24.66c2.35 2.35 4.64 4.61 6.88 6.92.52.54-.04 1.55-.86 1.56-3.08.03-6.17.01-9.4.01.24-3.19 1.43-5.88 3.38-8.49ZM29.38 38.09c-1.76.02-3.07-1.23-3.12-2.96-.05-1.83 1.24-3.17 3.05-3.18 1.81 0 3.17 1.33 3.15 3.11-.02 1.73-1.33 3.02-3.08 3.03ZM39.35 36.97v5.89c-1.42-1.5-2.66-2.64-3.67-3.96-.29-.37.09-1.26.17-1.94h3.49ZM39.34 28.36v4.79c-.89 0-1.73.05-2.56-.03-.34-.03-.83-.29-.92-.56-.12-.36-.05-.94.19-1.22.93-1.12 1.96-2.16 2.95-3.23.11.08.23.16.34.24Z" />
  </svg>
);

export default SvgUpTires;
