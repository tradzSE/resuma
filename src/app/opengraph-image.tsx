import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, color: "#171816", background: "#f2f0e9" }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>Resuma</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 650, lineHeight: 1, letterSpacing: -3 }}><span>Write your resume.</span><span>See the final page.</span></div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#5f605a" }}>A focused editor with live preview and direct export.</div>
        </div>
        <div style={{ fontSize: 18, letterSpacing: 2, color: "#171816" }}>NO ACCOUNT REQUIRED</div>
      </div>
    ),
    { ...size }
  );
}
