const LABEL = [
  "Event-Driven Architecture for Agentic AI.",
  "Enterprise systems and sources — SalesForce CRM, Genesys, JIRA, Remedy, SharePoint, RARC, Cyara testing, Splunk, APIs, user ad hoc requests, Automation Anywhere RPA, and Dynatrace — feed event collectors.",
  "Collectors are event collection and box case, Lambda functions, and Event Bridge for Automation Anywhere, through CDC, adapters, and domain events.",
  "Events enter an agentic AI event backbone on Apache Kafka and AWS Managed Kafka, with topics, a schema registry, and shared ordered durable logs.",
  "Stream processing and orchestration uses Apache Flink, Databricks Streaming, and a saga orchestrator, linked by publish and subscribe.",
  "Choreographed events and triggered events connect the backbone to one support agent, one OCR agent, one translation agent, one summary agent, and one compliance agent.",
  "Those agents use an MCP tool layer: MCP servers, OCR tools, translation tools, Claude CLI and Copilot, knowledge bases, AWS services, Splunk, Snowflake data, and Salesforce to attach a translated document.",
  "A deterministic tool call runs from Automation Anywhere to Salesforce, and new documents to translate enter the backbone.",
  "Underneath is observability, governance, security, audit, and human-in-the-loop: Splunk, tracing, policies, authorization, Cyara feedback, and human validation, joined by agent-to-agent tasks and events.",
].join(" ");

const SOURCES = [
  "SalesForce (CRM)",
  "Genesys",
  "JIRA",
  "Remedy",
  "SharePoint",
  "RARC",
  "Cyara (Testing)",
  "Splunk",
  "APIs",
  "User Adhoc Requests",
  "Automation Anywhere (RPA)",
  "Dynatrace",
];

const COLLECTORS = [
  ["Event Collection"],
  ["Box Case"],
  ["Lambda Functions"],
  ["Event Bridge", "(Automation Anywhere)"],
];

const AGENTS = ["Support Agent", "OCR Agent", "Translation Agent", "Summary Agent", "Compliance Agent"];

const TOOLS = [
  ["MCP Servers"],
  ["OCR Tools"],
  ["Translation Tools"],
  ["Claude CLI/Copilot"],
  ["Knowledge Bases"],
  ["AWS Services"],
  ["Splunk"],
  ["Snowflake Data"],
  ["Salesforce", "(Attach Translated Document)"],
];

function box(x, y, w, h) {
  return { x, y, w, h, right: x + w, bottom: y + h, cx: x + w / 2, cy: y + h / 2 };
}

function placeChips(panel, items, { headerH, padX, padTop, padBottom, gap, chipH, centerOn }) {
  const n = items.length;
  const top = panel.y + headerH + padTop;
  const bottomLimit = panel.bottom - padBottom;
  const natural = n * chipH + (n - 1) * gap;
  const avail = bottomLimit - top;
  let h = chipH;
  let g = gap;
  if (natural > avail) {
    h = (avail - (n - 1) * g) / n;
  } else if (!centerOn) {
    g = n === 1 ? 0 : (avail - n * h) / (n - 1);
  }
  const block = n * h + (n - 1) * g;
  const start = centerOn ? centerOn - block / 2 : top + (avail - block) / 2;
  const w = panel.w - padX * 2;
  const x = panel.x + padX;
  return items.map((lines, i) => {
    const y = start + i * (h + g);
    return {
      lines,
      x,
      y,
      w,
      h,
      cx: x + w / 2,
      cy: y + h / 2,
      right: x + w,
      left: x,
    };
  });
}

function buildLayout() {
  const vw = 1680;
  const margin = 18;
  const colY = 88;
  const colH = 648;
  const sources = box(margin, colY, 260, colH);
  const collectorsW = 240;
  const centerW = 424;
  const agentsW = 186;
  const gutterBus = 34;
  const gutterIn = 32;
  const gutterFlow = 158;
  const gutterTools = 28;

  const collectorsX = sources.right + gutterBus;
  const centerX = collectorsX + collectorsW + gutterIn;
  const agentsX = centerX + centerW + gutterFlow;
  const toolsX = agentsX + agentsW + gutterTools;

  const streamH = 154;
  const linkGap = 54;
  const stream = box(centerX, colY, centerW, streamH);
  const backbone = box(centerX, colY + streamH + linkGap, centerW, colH - streamH - linkGap);
  const agents = box(agentsX, colY, agentsW, colH);
  const tools = box(toolsX, colY, vw - margin - toolsX, colH);

  const collectorHeader = 40;
  const collectorChipH = 52;
  const collectorGap = 10;
  const collectorPadX = 12;
  const collectorPadTop = 12;
  const collectorCaption = 36;
  const collectorH =
    collectorHeader +
    collectorPadTop +
    COLLECTORS.length * collectorChipH +
    (COLLECTORS.length - 1) * collectorGap +
    collectorCaption +
    12;
  const collectors = box(collectorsX, colY, collectorsW, collectorH);

  const sourceChips = placeChips(sources, SOURCES.map((label) => [label]), {
    headerH: 40,
    padX: 12,
    padTop: 12,
    padBottom: 12,
    gap: 8,
    chipH: 34,
  });
  const collectorChips = placeChips(collectors, COLLECTORS, {
    headerH: collectorHeader,
    padX: collectorPadX,
    padTop: collectorPadTop,
    padBottom: collectorCaption + 8,
    gap: collectorGap,
    chipH: collectorChipH,
  });
  const agentChips = placeChips(agents, AGENTS.map((label) => [label]), {
    headerH: 40,
    padX: 12,
    padTop: 16,
    padBottom: 16,
    gap: 18,
    chipH: 46,
    centerOn: backbone.cy,
  });
  const toolChips = placeChips(tools, TOOLS, {
    headerH: 48,
    padX: 12,
    padTop: 12,
    padBottom: 12,
    gap: 8,
    chipH: 46,
  });

  const footerY = colY + colH + 78;
  const footer = box(margin, footerY, vw - margin * 2, 118);
  const vh = footer.bottom + 18;
  const railY = colY + colH + 40;

  return {
    vw,
    vh,
    sources,
    collectors,
    stream,
    backbone,
    agents,
    tools,
    footer,
    sourceChips,
    collectorChips,
    agentChips,
    toolChips,
    busX: (sources.right + collectors.x) / 2,
    busInX: (collectors.right + centerX) / 2,
    busOutX: (agents.right + tools.x) / 2,
    railY,
  };
}

const LAYOUT = buildLayout();

function Panel({ region, title, subtitle, headerH, children }) {
  const h = headerH ?? (subtitle ? 48 : 40);
  return (
    <g>
      <rect className="sd-arch-panel" x={region.x} y={region.y} width={region.w} height={region.h} rx="10" />
      <rect className="sd-arch-header" x={region.x + 1} y={region.y + 1} width={region.w - 2} height={h - 1} rx="9" />
      <rect className="sd-arch-header" x={region.x + 1} y={region.y + h - 10} width={region.w - 2} height="10" />
      {subtitle ? (
        <text className="sd-arch-header-text" textAnchor="middle" x={region.cx} y={region.y + h / 2 + 1}>
          <tspan x={region.cx} dy="-0.45em">
            {title}
          </tspan>
          <tspan className="sd-arch-header-sub" x={region.cx} dy="1.35em">
            {subtitle}
          </tspan>
        </text>
      ) : (
        <text
          className="sd-arch-header-text"
          textAnchor="middle"
          dominantBaseline="central"
          x={region.cx}
          y={region.y + h / 2 + 1}
        >
          {title}
        </text>
      )}
      {children}
    </g>
  );
}

function Chip({ chip }) {
  const [primary, secondary] = chip.lines;
  return (
    <g>
      <rect className="sd-arch-chip" x={chip.x} y={chip.y} width={chip.w} height={chip.h} rx="6" />
      {secondary ? (
        <text className="sd-arch-chip-text" textAnchor="middle" x={chip.cx} y={chip.cy}>
          <tspan x={chip.cx} dy="-0.35em">
            {primary}
          </tspan>
          <tspan className="sd-arch-chip-sub" x={chip.cx} dy="1.3em">
            {secondary}
          </tspan>
        </text>
      ) : (
        <text
          className="sd-arch-chip-text"
          textAnchor="middle"
          dominantBaseline="central"
          x={chip.cx}
          y={chip.cy}
        >
          {primary}
        </text>
      )}
    </g>
  );
}

function FlowLabel({ x, y, text, anchor = "middle" }) {
  const size = 13;
  const width = text.length * size * 0.58 + 18;
  const height = 20;
  const left = anchor === "start" ? x - 6 : anchor === "end" ? x - width + 6 : x - width / 2;
  const textX = anchor === "middle" ? left + width / 2 : anchor === "start" ? x : x;
  return (
    <g>
      <rect className="sd-arch-pill" x={left} y={y - height + 5} width={width} height={height} rx="4" />
      <text className="sd-arch-flow-label" textAnchor={anchor} x={textX} y={y}>
        {text}
      </text>
    </g>
  );
}

function AgenticMark({ cx, cy, r = 42 }) {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [Math.cos(angle) * r * 0.62, Math.sin(angle) * r * 0.62];
  });
  return (
    <g className="sd-arch-mark" transform={`translate(${cx} ${cy})`}>
      <circle className="sd-arch-mark-ring" r={r} />
      <circle className="sd-arch-mark-ring sd-arch-mark-ring-inner" r={r * 0.33} />
      {pts.map(([x, y], i) => (
        <line key={`s${i}`} x1="0" y1="0" x2={x} y2={y} />
      ))}
      {pts.map(([x, y], i) => (
        <line key={`e${i}`} x1={x} y1={y} x2={pts[(i + 1) % pts.length][0]} y2={pts[(i + 1) % pts.length][1]} />
      ))}
      <circle className="sd-arch-mark-core" r="4.5" />
      {pts.map(([x, y], i) => (
        <circle key={`n${i}`} className="sd-arch-mark-node" cx={x} cy={y} r="3.4" />
      ))}
    </g>
  );
}

function AgentForgeArchitecture() {
  const L = LAYOUT;
  const entries = L.collectorChips.map((_, i) => {
    const span = L.backbone.h - 72;
    return L.backbone.y + 36 + (span * (i + 0.5)) / L.collectorChips.length;
  });

  const aa = L.sourceChips[10];
  const sf = L.toolChips[8];
  const dropX = L.sources.right - 7;
  const sfX = sf.cx;

  return (
    <figure className="sd-arch" role="img" aria-label={LABEL}>
      <svg viewBox={`0 0 ${L.vw} ${L.vh}`} focusable="false">
        <title>Event-Driven Architecture for Agentic AI</title>
        <defs>
          <marker
            id="af-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--sd-cyan)" />
          </marker>
          <marker
            id="af-arrow-fill"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--sd-cyan-fill)" />
          </marker>
        </defs>

        <rect className="sd-arch-frame" x="0.6" y="0.6" width={L.vw - 1.2} height={L.vh - 1.2} rx="12" />

        <text className="sd-arch-title" textAnchor="middle" dominantBaseline="central" x={L.vw / 2} y="42">
          Event-Driven Architecture for Agentic AI
        </text>
        <line className="sd-arch-rule" x1="20" y1="70" x2={L.vw - 20} y2="70" />
        <line className="sd-arch-accent" x1={L.vw / 2 - 28} y1="70" x2={L.vw / 2 + 28} y2="70" />

        <Panel region={L.sources} title="Enterprise Systems & Sources">
          {L.sourceChips.map((chip) => (
            <Chip key={chip.lines[0]} chip={chip} />
          ))}
        </Panel>

        <Panel region={L.collectors} title="Event Collectors">
          {L.collectorChips.map((chip) => (
            <Chip key={chip.lines[0]} chip={chip} />
          ))}
          <text
            className="sd-arch-caption"
            textAnchor="middle"
            dominantBaseline="central"
            x={L.collectors.cx}
            y={L.collectors.bottom - 22}
          >
            CDC | Adapters | Domain Events
          </text>
        </Panel>

        <Panel region={L.stream} title="Stream Processing & Orchestration">
          <text className="sd-arch-body" textAnchor="middle" x={L.stream.cx} y={L.stream.y + 96}>
            <tspan x={L.stream.cx}>Apache Flink / Databricks Streaming</tspan>
            <tspan x={L.stream.cx} dy="1.45em">
              Saga Orchestrator
            </tspan>
          </text>
        </Panel>

        <Panel region={L.backbone} title="Event Backbone">
          <text className="sd-arch-muted" textAnchor="middle" x={L.backbone.cx} y={L.backbone.y + 64}>
            <tspan x={L.backbone.cx}>Apache Kafka · AWS Managed Kafka</tspan>
            <tspan x={L.backbone.cx} dy="1.35em">
              Event Streaming
            </tspan>
          </text>
          <AgenticMark cx={L.backbone.cx} cy={L.backbone.y + 232} r={78} />
          <text className="sd-arch-lockup" textAnchor="middle" x={L.backbone.cx} y={L.backbone.y + 352}>
            Agentic AI
          </text>
          <text className="sd-arch-lockup-sub" textAnchor="middle" x={L.backbone.cx} y={L.backbone.y + 378}>
            Event Backbone
          </text>
          <line
            className="sd-arch-rule"
            x1={L.backbone.x + 16}
            y1={L.backbone.bottom - 42}
            x2={L.backbone.right - 16}
            y2={L.backbone.bottom - 42}
          />
          <text
            className="sd-arch-caption"
            textAnchor="middle"
            dominantBaseline="central"
            x={L.backbone.cx}
            y={L.backbone.bottom - 22}
          >
            Topic | Schema Registry | Shared Ordered Durable Logs
          </text>
        </Panel>

        <Panel region={L.agents} title="AI Agents">
          {L.agentChips.map((chip) => (
            <Chip key={chip.lines[0]} chip={chip} />
          ))}
        </Panel>

        <Panel region={L.tools} title="AI Tools" subtitle="MCP Layer" headerH={48}>
          {L.toolChips.map((chip) => (
            <Chip key={chip.lines[0]} chip={chip} />
          ))}
        </Panel>

        <g>
          <rect className="sd-arch-panel" x={L.footer.x} y={L.footer.y} width={L.footer.w} height={L.footer.h} rx="10" />
          <line
            className="sd-arch-accent"
            x1={L.footer.x + 12}
            y1={L.footer.y + 1.5}
            x2={L.footer.right - 12}
            y2={L.footer.y + 1.5}
          />
          <text
            className="sd-arch-footer-title"
            textAnchor="middle"
            dominantBaseline="central"
            x={L.footer.cx}
            y={L.footer.y + 46}
          >
            Observability, Governance, Security, Audit & Human-in-the-Loop
          </text>
          <text
            className="sd-arch-footer-meta"
            textAnchor="middle"
            dominantBaseline="central"
            x={L.footer.cx}
            y={L.footer.y + 80}
          >
            Splunk | Tracing | Policies | Authorization | Cyara Feedback | Human Validation
          </text>
        </g>

        <g>
          <path
            className="sd-arch-flow"
            d={`M ${L.busX} ${L.sourceChips[0].cy} V ${L.sourceChips[L.sourceChips.length - 1].cy}`}
          />
          {L.sourceChips.map((chip) => (
            <path key={chip.lines[0]} className="sd-arch-flow" d={`M ${chip.right} ${chip.cy} H ${L.busX}`} />
          ))}
          {L.collectorChips.map((chip) => (
            <path
              key={chip.lines[0]}
              className="sd-arch-flow"
              markerEnd="url(#af-arrow)"
              d={`M ${L.busX} ${chip.cy} H ${chip.left}`}
            />
          ))}

          <path
            className="sd-arch-flow"
            d={`M ${L.busInX} ${Math.min(L.collectorChips[0].cy, entries[0])} V ${Math.max(
              L.collectorChips[L.collectorChips.length - 1].cy,
              entries[entries.length - 1]
            )}`}
          />
          {L.collectorChips.map((chip) => (
            <path
              key={`in-${chip.lines[0]}`}
              className="sd-arch-flow"
              d={`M ${chip.right} ${chip.cy} H ${L.busInX}`}
            />
          ))}
          {entries.map((y, i) => (
            <path
              key={`entry-${i}`}
              className="sd-arch-flow"
              markerEnd="url(#af-arrow)"
              d={`M ${L.busInX} ${y} H ${L.backbone.x}`}
            />
          ))}

          <path
            className="sd-arch-flow"
            markerStart="url(#af-arrow)"
            markerEnd="url(#af-arrow)"
            d={`M ${L.stream.cx} ${L.stream.bottom + 8} V ${L.backbone.y - 8}`}
          />

          <path
            className="sd-arch-flow"
            markerEnd="url(#af-arrow)"
            d={`M ${L.backbone.right + 10} ${L.backbone.cy - 18} H ${L.agents.x - 10}`}
          />
          <path
            className="sd-arch-flow"
            markerEnd="url(#af-arrow)"
            d={`M ${L.agents.x - 10} ${L.backbone.cy + 18} H ${L.backbone.right + 10}`}
          />

          <path
            className="sd-arch-flow"
            d={`M ${L.busOutX} ${L.agentChips[0].cy} V ${L.toolChips[L.toolChips.length - 1].cy}`}
          />
          {L.agentChips.map((chip) => (
            <path key={`ag-${chip.lines[0]}`} className="sd-arch-flow" d={`M ${chip.right} ${chip.cy} H ${L.busOutX}`} />
          ))}
          {L.toolChips.map((chip) => (
            <path
              key={`tool-${chip.lines[0]}`}
              className="sd-arch-flow"
              markerStart="url(#af-arrow)"
              markerEnd="url(#af-arrow)"
              d={`M ${L.busOutX} ${chip.cy} H ${chip.left}`}
            />
          ))}

          <path
            className="sd-arch-flow sd-arch-flow-dashed"
            markerEnd="url(#af-arrow)"
            d={`M ${L.collectors.x + 24} ${L.collectors.bottom + 32} H ${L.backbone.x - 4}`}
          />

          <path
            className="sd-arch-flow-call"
            markerEnd="url(#af-arrow-fill)"
            d={`M ${aa.right} ${aa.cy} H ${dropX} V ${L.railY} H ${sfX} V ${sf.bottom}`}
          />

          <path
            className="sd-arch-flow"
            markerEnd="url(#af-arrow)"
            d={`M ${L.backbone.cx} ${L.backbone.bottom + 8} V ${L.footer.y - 8}`}
          />
        </g>

          <FlowLabel
            x={L.stream.cx + 118}
            y={(L.stream.bottom + L.backbone.y) / 2 + 4}
            text="Publish / Subscribe"
          />
        <FlowLabel x={(L.backbone.right + L.agents.x) / 2} y={L.backbone.cy - 32} text="Choreographed Events" />
        <FlowLabel x={(L.backbone.right + L.agents.x) / 2} y={L.backbone.cy + 40} text="Triggered Events" />
        <FlowLabel
          x={(L.collectors.x + L.backbone.x) / 2}
          y={L.collectors.bottom + 36}
          text="New Document to Translate"
        />
        <FlowLabel x={(dropX + sfX) / 2 + 150} y={L.railY - 8} text="Deterministic tool call" />
        <FlowLabel x={L.backbone.cx + 16} y={L.footer.y - 28} text="A2A Tasks & Events" anchor="start" />
      </svg>
    </figure>
  );
}

export default AgentForgeArchitecture;
