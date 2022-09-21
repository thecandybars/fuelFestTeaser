import { QRCodeSVG } from "qrcode.react";

export default function QRcode() {
  return (
    <div style={{ margin: "50px", padding: "10px" }}>
      <QRCodeSVG
        // value={"https://fuel-fest-teaser.vercel.app/"}
        value={"https://scratch.mit.edu/projects/734081205"}
        size="200"
        level="L"
        includeMargin={true}
      />
    </div>
  );
}
