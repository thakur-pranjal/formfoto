import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FormFoto - Pro Photo Resizer";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -100,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Top eyebrow label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 36,
              height: 2,
              background: "#38bdf8",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#38bdf8",
            }}
          >
            Next-Gen Photo Tooling
          </span>
          <div
            style={{
              width: 36,
              height: 2,
              background: "#38bdf8",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            lineHeight: 1,
            marginBottom: 20,
            display: "flex",
          }}
        >
          Form
          <span style={{ color: "#38bdf8" }}>Foto</span>
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#94a3b8",
              alignSelf: "flex-start",
              marginTop: 16,
              marginLeft: 10,
              letterSpacing: "0.05em",
            }}
          >
            PRO
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: "#94a3b8",
            letterSpacing: "0.02em",
            marginBottom: 52,
            display: "flex",
          }}
        >
          Surgical KB Compression &amp; Pixel Control
        </div>

        {/* Feature pill tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
          }}
        >
          {["100% Free", "Zero Lag", "Private Canvas API", "No Upload", "AI BG Removal"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 26px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.25)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#cbd5e1",
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* Bottom domain strip */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          <span
            style={{
              fontSize: 20,
              color: "rgba(148,163,184,0.7)",
              letterSpacing: "0.15em",
              textTransform: "lowercase",
            }}
          >
            formfoto.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
