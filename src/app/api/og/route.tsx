import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "PrecioDental";
  const subtitle = searchParams.get("subtitle") || "Compara precios dentales en España";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          backgroundImage: "linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "48px" }}>🦷</span>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#1d4ed8",
            }}
          >
            PrecioDental
          </span>
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#1e293b",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#64748b",
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
