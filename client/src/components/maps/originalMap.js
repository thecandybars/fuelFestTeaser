import * as React from "react";
const SvgOriginalMap = (props) => (
  <svg
    width="210mm"
    height="297mm"
    viewBox="0 0 210 297"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <g
      style={{
        display: "inline",
      }}
    >
      <rect
        style={{
          fill: "#feae2e",
          stroke: "#fff",
          strokeWidth: 0.3175,
          strokeMiterlimit: 0.7,
        }}
        width={129.435}
        height={191.004}
        x={51.074}
        y={53.873}
        ry={64.717}
      />
      <ellipse
        style={{
          fill: "#0f0",
          stroke: "#fff",
          strokeWidth: 0.3175,
          strokeMiterlimit: 0.7,
        }}
        cx={92.178}
        cy={111.769}
        rx={20.465}
        ry={20.115}
      />
      <ellipse
        style={{
          fill: "red",
          stroke: "#fff",
          strokeWidth: 0.3175,
          strokeMiterlimit: 0.7,
        }}
        cx={129.085}
        cy={194.852}
        rx={21.339}
        ry={20.29}
      />
    </g>
    <g
      style={{
        display: "inline",
      }}
      fill="none"
    >
      <ellipse
        style={{
          fill: "#0f0",
          fillOpacity: 0,
          stroke: "#000",
          strokeWidth: 0.3175,
          strokeMiterlimit: 0.7,
          strokeOpacity: 1,
        }}
        id="circle1"
        cx={92.004}
        cy={112.118}
        rx={20.465}
        ry={20.115}
        // onClick={props.handleClick}
      />
      <ellipse
        style={{
          fill: "red",
          fillOpacity: 0,
          stroke: "#000",
          strokeWidth: 0.3175,
          strokeMiterlimit: 0.7,
          strokeOpacity: 1,
        }}
        id="circle2"
        cx={128.91}
        cy={195.201}
        rx={21.339}
        ry={20.29}
        // onClick={props.handleClick}
      />
    </g>
  </svg>
);
export default SvgOriginalMap;
