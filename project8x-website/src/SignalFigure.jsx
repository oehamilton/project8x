import { useId } from "react";

function Frame({ glowId, children }) {
  return (
    <>
      <rect width="480" height="320" rx="16" fill="var(--sd-ground)" />
      <rect width="480" height="320" rx="16" fill={`url(#${glowId})`} />
      <rect
        x="1.5"
        y="1.5"
        width="477"
        height="317"
        rx="15"
        fill="none"
        stroke="var(--sd-teal)"
        strokeWidth="2"
      />
      <g stroke="var(--sd-teal)" strokeOpacity="0.34">
        {Array.from({ length: 8 }, (_, index) => (
          <line key={`v-${index}`} x1={36 + index * 58} y1="22" x2={36 + index * 58} y2="298" />
        ))}
        {Array.from({ length: 5 }, (_, index) => (
          <line key={`h-${index}`} x1="24" y1={40 + index * 60} x2="456" y2={40 + index * 60} />
        ))}
      </g>
      {children}
    </>
  );
}

function Topology() {
  const nodes = [
    [80, 78],
    [168, 54],
    [256, 78],
    [344, 54],
    [416, 86],
  ];
  return (
    <g stroke="var(--sd-teal)" strokeWidth="1.75" fill="none">
      <path d="M80 78 H416" strokeOpacity="0.45" />
      {nodes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="var(--sd-ground)" strokeWidth="1.5" />
      ))}
      <path d="M168 61 V128 M256 85 V128 M344 61 V128" />
      <rect x="112" y="128" width="64" height="120" rx="8" />
      <rect x="208" y="128" width="64" height="120" rx="8" />
      <rect x="304" y="128" width="64" height="120" rx="8" />
      <rect x="120" y="188" width="48" height="52" rx="3" fill="var(--sd-teal)" fillOpacity="0.45" stroke="none" />
      <rect x="216" y="156" width="48" height="84" rx="3" fill="var(--sd-teal)" fillOpacity="0.78" stroke="none" />
      <rect x="312" y="172" width="48" height="68" rx="3" fill="var(--sd-teal)" fillOpacity="0.58" stroke="none" />
      <path d="M144 248 V276 M240 248 V276 M336 248 V276" />
      <path d="M72 276 H400" strokeOpacity="0.7" />
    </g>
  );
}

function Migration() {
  return (
    <g stroke="var(--sd-teal)" strokeWidth="1.75" fill="none">
      <rect x="48" y="78" width="120" height="164" rx="10" />
      <rect x="312" y="78" width="120" height="164" rx="10" />
      <rect x="64" y="168" width="88" height="58" rx="3" fill="var(--sd-teal)" fillOpacity="0.4" stroke="none" />
      <rect x="328" y="112" width="88" height="114" rx="3" fill="var(--sd-teal)" fillOpacity="0.72" stroke="none" />
      <path d="M168 140 H210" />
      <path d="M270 180 H312" />
      <path d="M168 196 C 210 196, 220 150, 240 150 S 270 196, 312 196" strokeDasharray="5 6" />
      <circle cx="240" cy="150" r="16" fill="var(--sd-ground)" strokeWidth="1.5" />
      <circle cx="240" cy="150" r="4" fill="var(--sd-cyan-fill)" stroke="none" />
      <path d="M96 242 V276 M384 242 V276" />
      <path d="M48 276 H432" strokeOpacity="0.7" />
    </g>
  );
}

function Agents() {
  const satellites = [
    [240, 62],
    [132, 128],
    [348, 128],
    [168, 236],
    [312, 236],
  ];
  return (
    <g stroke="var(--sd-teal)" strokeWidth="1.75" fill="none">
      <circle cx="240" cy="160" r="28" fill="var(--sd-ground)" strokeWidth="1.5" />
      <circle cx="240" cy="160" r="6" fill="var(--sd-teal)" stroke="none" />
      {satellites.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M240 160 L${x} ${y}`} strokeOpacity="0.75" />
          <circle cx={x} cy={y} r="8" fill="var(--sd-ground)" />
        </g>
      ))}
    </g>
  );
}

function Sites() {
  const clusters = [
    [86, 86],
    [210, 64],
    [330, 108],
    [400, 196],
    [150, 210],
    [270, 236],
  ];
  return (
    <g stroke="var(--sd-teal)" strokeWidth="1.75" fill="none">
      <path d="M86 86 L210 64 L330 108 L400 196" />
      <path d="M210 64 L150 210 L270 236 L400 196" strokeOpacity="0.7" />
      <path d="M86 86 L150 210" strokeDasharray="4 6" />
      {clusters.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="12" fill="var(--sd-ground)" />
          <circle cx={x} cy={y} r="3" fill="var(--sd-teal)" stroke="none" />
        </g>
      ))}
    </g>
  );
}

function Practice() {
  return (
    <g stroke="var(--sd-teal)" strokeWidth="1.75" fill="none">
      <path d="M48 72 H432" strokeDasharray="4 7" />
      <path
        d="M48 150 C 100 150, 120 96, 176 104 S 250 176, 310 132 S 390 96, 432 120"
        stroke="var(--sd-cyan-fill)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="176" cy="104" r="4" fill="var(--sd-teal)" stroke="none" />
      <circle cx="310" cy="132" r="4" fill="var(--sd-teal)" stroke="none" />
      <rect x="96" y="188" width="72" height="72" rx="8" />
      <rect x="204" y="188" width="72" height="72" rx="8" />
      <rect x="312" y="188" width="72" height="72" rx="8" />
      <rect x="108" y="220" width="48" height="32" rx="3" fill="var(--sd-teal)" fillOpacity="0.55" stroke="none" />
      <rect x="216" y="204" width="48" height="48" rx="3" fill="var(--sd-teal)" fillOpacity="0.75" stroke="none" />
      <rect x="324" y="214" width="48" height="38" rx="3" fill="var(--sd-teal)" fillOpacity="0.5" stroke="none" />
    </g>
  );
}

function Contact() {
  return (
    <g stroke="var(--sd-teal)" strokeWidth="1.75" fill="none">
      <circle cx="92" cy="160" r="18" fill="var(--sd-ground)" strokeWidth="1.5" />
      <circle cx="92" cy="160" r="4" fill="var(--sd-teal)" stroke="none" />
      <path
        d="M110 160 C 170 160, 180 84, 250 96 S 340 210, 392 160"
        stroke="var(--sd-cyan-fill)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="392" cy="160" r="26" fill="var(--sd-ground)" strokeWidth="1.5" />
      <circle cx="392" cy="160" r="6" fill="var(--sd-cyan-fill)" stroke="none" />
      <path d="M64 248 H416" strokeOpacity="0.55" />
    </g>
  );
}

const scenes = {
  topology: Topology,
  migration: Migration,
  agents: Agents,
  sites: Sites,
  practice: Practice,
  contact: Contact,
};

function SignalFigure({ variant = "topology" }) {
  const glowId = `${useId().replace(/:/g, "")}-glow`;
  const Scene = scenes[variant] || Topology;

  return (
    <svg className="sd-figure" viewBox="0 0 480 320" aria-hidden="true">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="var(--sd-teal)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="var(--sd-teal)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--sd-ground)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Frame glowId={glowId}>
        <Scene />
      </Frame>
    </svg>
  );
}

export default SignalFigure;
