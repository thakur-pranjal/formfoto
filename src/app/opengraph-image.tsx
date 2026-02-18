import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          position: "relative",
          background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
          fontFamily: "'Geist', 'Inter', 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.08em",
          }}
        >
          FormFoto
        </div>
        <div
          style={{
            padding: "14px 48px",
            borderRadius: 999,
            backgroundColor: "rgba(147, 197, 253, 0.2)",
            color: "#bfdbfe",
            fontSize: 36,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Official Exam Photo Resizer
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            color: "rgba(226, 232, 240, 0.85)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
          }}
        >
          Private. Fast. Free.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
