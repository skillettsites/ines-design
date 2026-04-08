"use client";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

/* ------------------------------------------------------------------ */
/*  Colour tokens (match site theme)                                   */
/* ------------------------------------------------------------------ */
const C = {
  bg: "#FAFAF8",
  card: "#FFFFFF",
  border: "#E8E8E4",
  accent: "#4A3AFF",
  accentDim: "rgba(74,58,255,0.08)",
  red: "#EF4444",
  redDim: "rgba(239,68,68,0.08)",
  amber: "#F59E0B",
  amberDim: "rgba(245,158,11,0.08)",
  green: "#10B981",
  greenDim: "rgba(16,185,129,0.08)",
  text: "#1A1A1A",
  muted: "#6B6B6B",
  mutedLight: "#999",
  surface: "#F2F2EE",
};

/* ------------------------------------------------------------------ */
/*  Helper: smooth spring shorthand                                    */
/* ------------------------------------------------------------------ */
function sp(
  frame: number,
  fps: number,
  delay: number,
  config?: { damping?: number; mass?: number; stiffness?: number }
) {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      damping: config?.damping ?? 28,
      mass: config?.mass ?? 0.8,
      stiffness: config?.stiffness ?? 120,
    },
  });
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function MockBrowserChrome({
  children,
  opacity,
  scale,
}: {
  children: React.ReactNode;
  opacity: number;
  scale: number;
}) {
  return (
    <div
      style={{
        width: 420,
        borderRadius: 16,
        overflow: "hidden",
        background: C.card,
        boxShadow: "0 24px 80px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        border: `1px solid ${C.border}`,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: C.surface,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
        <div
          style={{
            flex: 1,
            height: 22,
            borderRadius: 6,
            background: C.bg,
            marginLeft: 8,
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
          }}
        >
          <span style={{ fontSize: 9, color: C.mutedLight, fontFamily: "monospace" }}>
            app.acme-ai.com
          </span>
        </div>
      </div>
      {/* Content area */}
      <div style={{ padding: 0, position: "relative", minHeight: 320 }}>
        {children}
      </div>
    </div>
  );
}

/* Chat message bubble */
function ChatBubble({
  text,
  isAI,
  opacity,
  y,
}: {
  text: string;
  isAI?: boolean;
  opacity: number;
  y: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isAI ? "flex-start" : "flex-end",
        opacity,
        transform: `translateY(${y}px)`,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          padding: "8px 12px",
          borderRadius: isAI ? "12px 12px 12px 4px" : "12px 12px 4px 12px",
          background: isAI ? C.surface : C.accent,
          color: isAI ? C.text : "#fff",
          fontSize: 11,
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
}

/* Metric bar */
function MetricBar({
  label,
  value,
  color,
  bgColor,
  progress,
  opacity,
}: {
  label: string;
  value: string;
  color: string;
  bgColor: string;
  progress: number;
  opacity: number;
}) {
  return (
    <div style={{ opacity, marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          marginBottom: 3,
          fontWeight: 600,
        }}
      >
        <span style={{ color: C.muted }}>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div
        style={{
          height: 5,
          borderRadius: 3,
          background: bgColor,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: color,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
}

/* Warning badge */
function WarningBadge({
  text,
  opacity,
  scale,
}: {
  text: string;
  opacity: number;
  scale: number;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 6,
        background: C.redDim,
        color: C.red,
        fontSize: 9,
        fontWeight: 600,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      {text}
    </div>
  );
}

/* Success badge */
function SuccessBadge({
  text,
  opacity,
  scale,
}: {
  text: string;
  opacity: number;
  scale: number;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 6,
        background: C.greenDim,
        color: C.green,
        fontSize: 9,
        fontWeight: 600,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
      {text}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PHASE 1: "Before" - Broken AI interface                           */
/* ------------------------------------------------------------------ */
function PhaseBefore({ frame, fps }: { frame: number; fps: number }) {
  const enterOpacity = sp(frame, fps, 0);
  const enterScale = interpolate(sp(frame, fps, 0), [0, 1], [0.92, 1]);

  // Chat messages stagger in
  const msg1 = sp(frame, fps, 8);
  const msg2 = sp(frame, fps, 18);
  const msg3 = sp(frame, fps, 28);
  const msg4 = sp(frame, fps, 36);

  // Warning badges appear
  const warn1 = sp(frame, fps, 44);
  const warn2 = sp(frame, fps, 52);
  const warn3 = sp(frame, fps, 58);

  // Metrics (low)
  const metricOpacity = sp(frame, fps, 42);
  const trustProgress = interpolate(frame, [42, 70], [0, 0.23], {
    extrapolateRight: "clamp",
  });
  const adoptionProgress = interpolate(frame, [48, 72], [0, 0.12], {
    extrapolateRight: "clamp",
  });

  return (
    <MockBrowserChrome opacity={enterOpacity} scale={enterScale}>
      <div style={{ padding: 14 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
            AI Assistant
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <WarningBadge text="Low trust" opacity={warn1} scale={interpolate(warn1, [0, 1], [0.5, 1])} />
          </div>
        </div>

        {/* Chat */}
        <div style={{ marginBottom: 14 }}>
          <ChatBubble
            text="Show me my spending forecast"
            opacity={msg1}
            y={interpolate(msg1, [0, 1], [12, 0])}
          />
          <ChatBubble
            isAI
            text="Based on analysis, your projected Q3 spend is £47,290. Click here to optimise."
            opacity={msg2}
            y={interpolate(msg2, [0, 1], [12, 0])}
          />
          <ChatBubble
            text="How did you calculate that?"
            opacity={msg3}
            y={interpolate(msg3, [0, 1], [12, 0])}
          />
          <ChatBubble
            isAI
            text="I used advanced AI algorithms to generate this prediction."
            opacity={msg4}
            y={interpolate(msg4, [0, 1], [12, 0])}
          />
        </div>

        {/* Warning badges */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
          <WarningBadge text="No explanation" opacity={warn1} scale={interpolate(warn1, [0, 1], [0.5, 1])} />
          <WarningBadge text="Black box" opacity={warn2} scale={interpolate(warn2, [0, 1], [0.5, 1])} />
          <WarningBadge text="No user control" opacity={warn3} scale={interpolate(warn3, [0, 1], [0.5, 1])} />
        </div>

        {/* Metrics */}
        <MetricBar
          label="User Trust"
          value="23%"
          color={C.red}
          bgColor={C.redDim}
          progress={trustProgress}
          opacity={metricOpacity}
        />
        <MetricBar
          label="Feature Adoption"
          value="12%"
          color={C.red}
          bgColor={C.redDim}
          progress={adoptionProgress}
          opacity={metricOpacity}
        />
      </div>
    </MockBrowserChrome>
  );
}

/* ------------------------------------------------------------------ */
/*  TRANSITION: Design scan effect                                    */
/* ------------------------------------------------------------------ */
function DesignScan({ frame, fps }: { frame: number; fps: number }) {
  const scanY = interpolate(frame, [0, 40], [-10, 110], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const scanOpacity = interpolate(frame, [0, 5, 35, 40], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const glowOpacity = interpolate(frame, [0, 5, 35, 40], [0, 0.6, 0.6, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${scanY}%`,
          height: 2,
          background: C.accent,
          opacity: scanOpacity,
          zIndex: 20,
          boxShadow: `0 0 20px ${C.accent}, 0 0 60px ${C.accent}`,
        }}
      />
      {/* Glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent ${scanY - 5}%, ${C.accentDim} ${scanY}%, transparent ${scanY + 5}%)`,
          opacity: glowOpacity,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PHASE 2: "After" - Redesigned AI interface                        */
/* ------------------------------------------------------------------ */
function PhaseAfter({ frame, fps }: { frame: number; fps: number }) {
  const enterOpacity = sp(frame, fps, 0);
  const enterScale = interpolate(sp(frame, fps, 0), [0, 1], [0.96, 1]);

  const msg1 = sp(frame, fps, 6);
  const msg2 = sp(frame, fps, 14);
  const msg3 = sp(frame, fps, 22);

  const badge1 = sp(frame, fps, 30);
  const badge2 = sp(frame, fps, 36);
  const badge3 = sp(frame, fps, 42);

  const metricOpacity = sp(frame, fps, 34);
  const trustProgress = interpolate(frame, [34, 60], [0.23, 0.87], {
    extrapolateRight: "clamp",
  });
  const adoptionProgress = interpolate(frame, [40, 64], [0.12, 0.67], {
    extrapolateRight: "clamp",
  });

  const trustVal = Math.round(interpolate(frame, [34, 60], [23, 87], { extrapolateRight: "clamp" }));
  const adoptionVal = Math.round(interpolate(frame, [40, 64], [12, 67], { extrapolateRight: "clamp" }));

  return (
    <MockBrowserChrome opacity={enterOpacity} scale={enterScale}>
      <div style={{ padding: 14 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
            AI Assistant
          </span>
          <SuccessBadge text="Trusted" opacity={badge1} scale={interpolate(badge1, [0, 1], [0.5, 1])} />
        </div>

        {/* Chat - redesigned */}
        <div style={{ marginBottom: 14 }}>
          <ChatBubble
            text="Show me my spending forecast"
            opacity={msg1}
            y={interpolate(msg1, [0, 1], [12, 0])}
          />
          <div
            style={{
              opacity: interpolate(msg2, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(msg2, [0, 1], [12, 0])}px)`,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "8px 12px",
                borderRadius: "12px 12px 12px 4px",
                background: C.surface,
                fontSize: 11,
                lineHeight: 1.5,
                color: C.text,
              }}
            >
              Your projected Q3 spend is <strong>£47,290</strong>.
              <div
                style={{
                  marginTop: 6,
                  padding: "5px 8px",
                  borderRadius: 6,
                  background: C.accentDim,
                  fontSize: 9,
                  color: C.accent,
                  lineHeight: 1.4,
                }}
              >
                Based on: last 90 days of transactions, seasonal patterns from
                2024-2025, and 3 upcoming renewals in your calendar.
              </div>
              <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                <span
                  style={{
                    fontSize: 8,
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: `1px solid ${C.border}`,
                    color: C.muted,
                    cursor: "pointer",
                  }}
                >
                  Show breakdown
                </span>
                <span
                  style={{
                    fontSize: 8,
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: `1px solid ${C.border}`,
                    color: C.muted,
                    cursor: "pointer",
                  }}
                >
                  Adjust assumptions
                </span>
              </div>
            </div>
          </div>
          <ChatBubble
            isAI
            text="Confidence: 84% based on data consistency. Want me to flag if actuals deviate by more than 10%?"
            opacity={msg3}
            y={interpolate(msg3, [0, 1], [12, 0])}
          />
        </div>

        {/* Success badges */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
          <SuccessBadge text="Transparent" opacity={badge1} scale={interpolate(badge1, [0, 1], [0.5, 1])} />
          <SuccessBadge text="Explainable" opacity={badge2} scale={interpolate(badge2, [0, 1], [0.5, 1])} />
          <SuccessBadge text="User control" opacity={badge3} scale={interpolate(badge3, [0, 1], [0.5, 1])} />
        </div>

        {/* Metrics - climbing */}
        <MetricBar
          label="User Trust"
          value={`${trustVal}%`}
          color={trustVal > 60 ? C.green : C.amber}
          bgColor={trustVal > 60 ? C.greenDim : C.amberDim}
          progress={trustProgress}
          opacity={metricOpacity}
        />
        <MetricBar
          label="Feature Adoption"
          value={`${adoptionVal}%`}
          color={adoptionVal > 50 ? C.green : C.amber}
          bgColor={adoptionVal > 50 ? C.greenDim : C.amberDim}
          progress={adoptionProgress}
          opacity={metricOpacity}
        />
      </div>
    </MockBrowserChrome>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPOSITION                                                   */
/* ------------------------------------------------------------------ */
export const AITransformComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline:
  // 0-80:   Phase 1 (Before - broken AI)
  // 80-120: Transition (scan effect)
  // 100-200: Phase 2 (After - redesigned)
  // 200-240: Hold + fade, then loop

  const PHASE1_END = 80;
  const TRANSITION_START = 78;
  const PHASE2_START = 105;
  const TOTAL = 240;

  // Crossfade
  const phase1Opacity = interpolate(frame, [PHASE1_END - 5, PHASE1_END + 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Opacity = interpolate(frame, [PHASE2_START - 5, PHASE2_START + 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase label
  const label1Opacity = interpolate(frame, [10, 18, PHASE1_END - 10, PHASE1_END], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label2Opacity = interpolate(frame, [PHASE2_START + 5, PHASE2_START + 15, TOTAL - 20, TOTAL - 5], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating gentle animation
  const floatY = Math.sin(frame / 30) * 4;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          transform: `translateY(${floatY}px)`,
        }}
      >
        {/* Phase label */}
        <div
          style={{
            position: "absolute",
            top: -32,
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: C.red,
              opacity: label1Opacity,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Before: Broken AI Experience
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: C.green,
              opacity: label2Opacity,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            After: Designed for Trust
          </span>
        </div>

        {/* Before */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase1Opacity,
          }}
        >
          <PhaseBefore frame={Math.min(frame, PHASE1_END + 20)} fps={fps} />
        </div>

        {/* Scan transition */}
        {frame >= TRANSITION_START && frame <= PHASE2_START + 30 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <div
              style={{
                width: 420,
                height: 370,
                position: "relative",
                margin: "0 auto",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <DesignScan frame={frame - TRANSITION_START} fps={fps} />
            </div>
          </div>
        )}

        {/* After */}
        <div
          style={{
            opacity: phase2Opacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PhaseAfter frame={Math.max(0, frame - PHASE2_START)} fps={fps} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
