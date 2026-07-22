import { useState, useEffect, useRef } from "react";

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const T = {
    bg: "#0D1117",
    surface: "#111827",
    surface2: "#1A2332",
    border: "#1F2937",
    border2: "#2D3748",
    orange: "#FF6B2B",
    orangeDim: "rgba(255,107,43,0.12)",
    orangeGlow: "rgba(255,107,43,0.25)",
    green: "#10B981",
    greenDim: "rgba(16,185,129,0.1)",
    red: "#EF4444",
    redDim: "rgba(239,68,68,0.1)",
    yellow: "#F59E0B",
    yellowDim: "rgba(245,158,11,0.1)",
    text: "#F9FAFB",
    text2: "#9CA3AF",
    text3: "#6B7280",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const PROJECTS = [
    { id: 1, name: "PINGNEPAL", color: T.orange },
    { id: 2, name: "Personal Sites", color: "#8B5CF6" },
];

const ALL_MONITORS = [
    {
        id: 1, projectId: 1,
        name: "Homepage", url: "pingnepal.com",
        status: "up", latency: 24, uptime: 100,
        checks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        checkedAt: "1 min ago", ssl: { valid: true, days: 82 },
    },
    {
        id: 2, projectId: 1,
        name: "API Service", url: "pingnepal.com/api",
        status: "down", latency: null, uptime: 98.1,
        checks: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        checkedAt: "2 min ago", ssl: { valid: true, days: 54 },
    },
    {
        id: 3, projectId: 1,
        name: "Auth Service", url: "auth.pingnepal.com",
        status: "up", latency: 38, uptime: 99.9,
        checks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        checkedAt: "1 min ago", ssl: { valid: true, days: 41 },
    },
    {
        id: 4, projectId: 1,
        name: "Payment Gateway", url: "pay.pingnepal.com",
        status: "up", latency: 55, uptime: 99.7,
        checks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        checkedAt: "3 min ago", ssl: { valid: false, days: 12 },
    },
    {
        id: 5, projectId: 1,
        name: "CDN Assets", url: "cdn.pingnepal.com",
        status: "degraded", latency: 187, uptime: 99.5,
        checks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
        checkedAt: "2 min ago", ssl: { valid: true, days: 91 },
    },
    {
        id: 6, projectId: 2,
        name: "Portfolio", url: "rajiv.dev",
        status: "up", latency: 19, uptime: 100,
        checks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        checkedAt: "1 min ago", ssl: { valid: true, days: 60 },
    },
    {
        id: 7, projectId: 2,
        name: "Blog", url: "blog.rajiv.dev",
        status: "up", latency: 32, uptime: 99.8,
        checks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        checkedAt: "2 min ago", ssl: { valid: true, days: 30 },
    },
];

const INCIDENTS = [
    { id: 1, monitor: "pingnepal.com/api", type: "down", title: "API Service — Outage", meta: "HTTP 503 · Started 14 min ago", duration: "LIVE", live: true },
    { id: 2, monitor: "cdn.pingnepal.com", type: "degraded", title: "CDN Assets — High Latency", meta: "Response 187ms · Jun 8, 2:14 PM", duration: "Ongoing" },
    { id: 3, monitor: "auth.pingnepal.com", type: "up", title: "Auth Service — Resolved", meta: "HTTP 500 · Jun 7, 9:02–9:18 AM", duration: "16 min" },
    { id: 4, monitor: "pay.pingnepal.com", type: "up", title: "Payment Gateway — Resolved", meta: "Timeout · Jun 5, 11:45 PM", duration: "4 min" },
    { id: 5, monitor: "pingnepal.com", type: "up", title: "Homepage — Resolved", meta: "DNS failure · Jun 3, 6:30 AM", duration: "2 min" },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, stroke = "currentColor", fill = "none", sw = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const IconGrid = () => <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />;
const IconMonitor = () => <Icon d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3m0 14v3M2 12h3m14 0h3" />;
const IconBell = () => <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />;
const IconPulse = () => <Icon d="M3 12h4l3-8 4 16 3-8h4" />;
const IconSettings = () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />;
const IconPlus = () => <Icon d="M12 5v14M5 12h14" />;
const IconRefresh = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
    </svg>
);

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

const LiveDot = () => (
    <span style={{
        display: "inline-block", width: 7, height: 7, borderRadius: "50%",
        background: T.green, marginRight: 6, flexShrink: 0,
        animation: "pwPulse 1.5s ease-in-out infinite",
    }} />
);

const StatusPill = ({ status }) => {
    const cfg = {
        up: { bg: T.greenDim, color: T.green, label: "Up" },
        down: { bg: T.redDim, color: T.red, label: "Down" },
        degraded: { bg: T.yellowDim, color: T.yellow, label: "Slow" },
    }[status] || { bg: T.border, color: T.text3, label: status };
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "3px 10px", borderRadius: 20,
            background: cfg.bg, color: cfg.color,
            fontSize: 11, fontWeight: 600,
        }}>
            <span style={{
                width: 6, height: 6, borderRadius: "50%", background: cfg.color,
                boxShadow: `0 0 5px ${cfg.color}`, display: "inline-block"
            }} />
            {cfg.label}
        </span>
    );
};

const Sparkline = ({ checks }) => {
    const colors = { 0: T.red, 1: "rgba(16,185,129,0.55)", 2: T.yellow };
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 28 }}>
            {checks.map((v, i) => (
                <div key={i} style={{
                    width: 4, borderRadius: 2, flexShrink: 0,
                    height: v === 0 ? 8 : v === 2 ? 16 : 26,
                    background: colors[v] || colors[1],
                }} />
            ))}
        </div>
    );
};

const UptimeBar = ({ pct, status }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
            color: status === "down" ? T.yellow : T.text2, minWidth: 44,
        }}>
            {pct}%
        </span>
        <div style={{ flex: 1, height: 5, background: T.surface2, borderRadius: 3, overflow: "hidden" }}>
            <div style={{
                height: "100%", width: `${pct}%`, borderRadius: 3,
                background: pct < 99 ? T.yellow : T.green,
            }} />
        </div>
    </div>
);

// ─── ANIMATED HEARTBEAT SVG ───────────────────────────────────────────────────
const HeartbeatLine = () => (
    <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", height: 48 }}
        viewBox="0 0 260 48" preserveAspectRatio="none">
        <path
            d="M0,30 L30,30 L40,30 L50,8 L60,42 L70,20 L80,30 L120,30 L130,30 L140,30 L150,10 L158,44 L166,18 L175,30 L220,30 L230,30 L240,30 L250,12 L260,30"
            fill="none" stroke="rgba(255,107,43,0.35)" strokeWidth="1.5"
            style={{ strokeDasharray: 300, strokeDashoffset: 300, animation: "pwDash 2.5s ease-in-out infinite" }}
        />
    </svg>
);

// ─── ADD MONITOR MODAL ────────────────────────────────────────────────────────
const AddMonitorModal = ({ projectMonitorCount, onAdd, onClose }) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const MAX = 5;

    const handleSubmit = () => {
        if (!name.trim()) return setError("Monitor name is required.");
        if (!url.trim()) return setError("URL is required.");
        if (projectMonitorCount >= MAX) return setError(This project already has ${ MAX } monitors(limit reached).);
        onAdd({ name: name.trim(), url: url.trim() });
        onClose();
    };

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div style={{
                background: T.surface, border: `1px solid ${T.border2}`,
                borderRadius: 14, padding: 28, width: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Add Monitor</div>
                <div style={{ fontSize: 12, color: T.text3, marginBottom: 20 }}>
                    {projectMonitorCount}/{MAX} monitors used in this project
                </div>

                {projectMonitorCount >= MAX && (
                    <div style={{
                        background: "rgba(239,68,68,0.1)", border: `1px solid rgba(239,68,68,0.3)`,
                        borderRadius: 8, padding: "10px 14px", fontSize: 12, color: T.red, marginBottom: 16,
                    }}>
                        ⚠ You've reached the 5-monitor limit for this project. Upgrade to add more.
                    </div>
                )}

                <label style={{ display: "block", marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Monitor Name
                    </div>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Homepage"
                        style={{
                            width: "100%", background: T.surface2, border: `1px solid ${T.border2}`,
                            borderRadius: 8, padding: "9px 12px", color: T.text, fontSize: 13,
                            outline: "none", fontFamily: "inherit",
                        }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        URL
                    </div>
                    <input
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="e.g. https://pingnepal.com"
                        style={{
                            width: "100%", background: T.surface2, border: `1px solid ${T.border2}`,
                            borderRadius: 8, padding: "9px 12px", color: T.text, fontSize: 13,
                            outline: "none", fontFamily: "inherit",
                        }}
                    />
                </label>

                {error && (
                    <div style={{ fontSize: 12, color: T.red, marginTop: 10 }}>⚠ {error}</div>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
                    <button onClick={onClose} style={{
                        padding: "8px 16px", borderRadius: 8, border: `1px solid ${T.border2}`,
                        background: "transparent", color: T.text2, fontSize: 13, fontWeight: 600, cursor: "pointer",
                    }}>
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={projectMonitorCount >= MAX}
                        style={{
                            padding: "8px 16px", borderRadius: 8, border: "none",
                            background: projectMonitorCount >= MAX ? T.border2 : T.orange,
                            color: projectMonitorCount >= MAX ? T.text3 : "#fff",
                            fontSize: 13, fontWeight: 600,
                            cursor: projectMonitorCount >= MAX ? "not-allowed" : "pointer",
                        }}
                    >
                        Add Monitor
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── TOGGLE ───────────────────────────────────────────────────────────────────
const Toggle = ({ on, onToggle }) => (
    <div
        onClick={onToggle}
        style={{
            width: 36, height: 20, borderRadius: 10, cursor: "pointer",
            background: on ? T.orange : T.border2,
            position: "relative", transition: "background .2s", flexShrink: 0,
        }}
    >
        <div style={{
            position: "absolute", top: 2,
            left: on ? 18 : 2,
            width: 16, height: 16, borderRadius: "50%",
            background: "#fff", transition: "left .2s",
        }} />
    </div>
);

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function Dashboard() {
    const [activeProject, setActiveProject] = useState(1);
    const [monitors, setMonitors] = useState(ALL_MONITORS);
    const [filter, setFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [notifs, setNotifs] = useState({ email: true, slack: true, telegram: false, webhook: false });
    const [lastRefresh, setLastRefresh] = useState("Just now");

    const projectMonitors = monitors.filter(m => m.projectId === activeProject);
    const MAX_MONITORS = 5;

    const displayed = projectMonitors.filter(m => {
        if (filter === "up") return m.status === "up";
        if (filter === "down") return m.status === "down" || m.status === "degraded";
        return true;
    });

    const upCount = projectMonitors.filter(m => m.status === "up").length;
    const downCount = projectMonitors.filter(m => m.status === "down" || m.status === "degraded").length;
    const avgLatency = Math.round(
        projectMonitors.filter(m => m.latency).reduce((s, m) => s + m.latency, 0) /
        projectMonitors.filter(m => m.latency).length || 0
    );
    const avgUptime = (
        projectMonitors.reduce((s, m) => s + m.uptime, 0) / (projectMonitors.length || 1)
    ).toFixed(2);

    const handleAddMonitor = ({ name, url }) => {
        const newMonitor = {
            id: Date.now(), projectId: activeProject,
            name, url,
            status: "up", latency: Math.floor(Math.random() * 80 + 15),
            uptime: 100,
            checks: Array(14).fill(1),
            checkedAt: "Just now",
            ssl: { valid: true, days: 90 },
        };
        setMonitors(prev => [...prev, newMonitor]);
    };

    const handleRefresh = () => {
        setLastRefresh("Just now");
    };

    return (
        <>
            {/* GLOBAL STYLES */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bg}; color: ${T.text}; font-family: 'Inter', sans-serif; }
        @keyframes pwPulse { 0%,100%{opacity:.5} 50%{opacity:1;} }
        @keyframes pwDash  { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.border2}; border-radius: 2px; }
        input:focus { border-color: ${T.orange} !important; }
      `}</style>

            <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: T.bg, fontFamily: "'Inter',sans-serif" }}>

                {/* ── SIDEBAR ── */}
                <aside style={{
                    width: 220, minWidth: 220,
                    background: T.surface, borderRight: `1px solid ${T.border}`,
                    display: "flex", flexDirection: "column",
                }}>
                    {/* Logo */}
                    <div style={{ padding: "18px 16px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 28, height: 28, background: T.orange, borderRadius: 6,
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12h4l3-8 4 16 3-8h4" />
                            </svg>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px" }}>
                            pulse<span style={{ color: T.orange }}>watch</span>
                        </span>
                    </div>

                    {/* Nav */}
                    <nav style={{ flex: 1, overflowY: "auto", padding: "8px 8px 0" }}>
                        {[
                            { label: "Dashboard", icon: <IconGrid />, active: true },
                            { label: "Monitors", icon: <IconMonitor />, badge: downCount || null },
                            { label: "Incidents", icon: <IconBell /> },
                            { label: "Status Pages", icon: <IconPulse /> },
                        ].map(({ label, icon, active, badge }) => (
                            <div key={label} style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "9px 10px", borderRadius: 8, cursor: "pointer",
                                color: active ? T.orange : T.text2,
                                background: active ? T.orangeDim : "transparent",
                                fontSize: 13, fontWeight: 500, marginBottom: 2,
                                transition: "all .15s",
                            }}>
                                <span style={{ width: 16, height: 16, opacity: active ? 1 : 0.7, flexShrink: 0 }}>{icon}</span>
                                {label}
                                {badge && (
                                    <span style={{
                                        marginLeft: "auto", background: T.red, color: "#fff",
                                        fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10,
                                    }}>{badge}</span>
                                )}
                            </div>
                        ))}

                        {/* Projects */}
                        <div style={{ fontSize: 10, fontWeight: 600, color: T.text3, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 10px 6px" }}>
                            Projects
                        </div>
                        {PROJECTS.map(p => (
                            <div key={p.id}
                                onClick={() => setActiveProject(p.id)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                                    background: activeProject === p.id ? T.surface2 : "transparent",
                                    color: activeProject === p.id ? T.text : T.text2,
                                    fontSize: 13, marginBottom: 2, transition: "all .15s",
                                }}
                            >
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                                {p.name}
                                <span style={{ marginLeft: "auto", fontSize: 10, color: T.text3 }}>
                                    {monitors.filter(m => m.projectId === p.id).length}/{MAX_MONITORS}
                                </span>
                            </div>
                        ))}
                        <div style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "7px 10px", cursor: "pointer", color: T.text3, fontSize: 12,
                        }}>
                            <IconPlus /> New Project
                        </div>
                    </nav>

                    {/* Footer */}
                    <div style={{ padding: "10px 8px", borderTop: `1px solid ${T.border}` }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                            color: T.text2, fontSize: 13,
                        }}>
                            <span style={{ width: 16, opacity: 0.7 }}><IconSettings /></span>
                            Settings
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: "linear-gradient(135deg,#FF6B2B,#FF9A5C)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, fontWeight: 700, flexShrink: 0,
                            }}>R</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 500 }}>Rajiv S.</div>
                                <div style={{ fontSize: 11, color: T.text3 }}>Admin</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ── MAIN ── */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                    {/* Topbar */}
                    <div style={{
                        background: T.surface, borderBottom: `1px solid ${T.border}`,
                        padding: "0 24px", height: 56,
                        display: "flex", alignItems: "center", gap: 14, flexShrink: 0,
                    }}>
                        <div style={{ flex: 1, fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center" }}>
                            <LiveDot />Dashboard
                        </div>
                        <div style={{
                            background: T.surface2, border: `1px solid ${T.border2}`,
                            color: T.text2, fontSize: 12, padding: "4px 12px", borderRadius: 20, fontWeight: 500,
                        }}>
                            .{PROJECTS.find(p => p.id === activeProject)?.name}
                        </div>
                        <button
                            onClick={handleRefresh}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "6px 12px", borderRadius: 8, border: `1px solid ${T.border2}`,
                                background: "transparent", color: T.text2, fontSize: 12, fontWeight: 600, cursor: "pointer",
                            }}
                        >
                            <IconRefresh /> Refresh
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "7px 14px", borderRadius: 8, border: "none",
                                background: projectMonitors.length >= MAX_MONITORS ? T.border2 : T.orange,
                                color: projectMonitors.length >= MAX_MONITORS ? T.text3 : "#fff",
                                fontSize: 13, fontWeight: 600, cursor: projectMonitors.length >= MAX_MONITORS ? "not-allowed" : "pointer",
                            }}
                            title={projectMonitors.length >= MAX_MONITORS ? "5-monitor limit reached" : "Add a new monitor"}
                        >
                            <IconPlus /> Add Monitor
                            {projectMonitors.length >= MAX_MONITORS && <span style={{ fontSize: 10, opacity: 0.8 }}>(limit reached)</span>}
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>

                        {/* ── STAT CARDS ── */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                            {/* Uptime */}
                            <div style={{
                                background: T.surface, border: `1px solid rgba(255,107,43,.3)`,
                                borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden",
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Overall Uptime</div>
                                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: T.green }}>{avgUptime}%</div>
                                <div style={{ fontSize: 12, color: T.text3, marginTop: 6 }}>Last 30 days</div>
                                <HeartbeatLine />
                            </div>
                            {/* Monitors count */}
                            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Monitors</div>
                                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
                                    {projectMonitors.length}<span style={{ fontSize: 14, color: T.text3, fontWeight: 400 }}>/{MAX_MONITORS}</span>
                                </div>
                                <div style={{ fontSize: 12, color: T.text3, marginTop: 6 }}>
                                    <span style={{ color: T.green, fontWeight: 500 }}>{upCount} up</span>
                                    {downCount > 0 && <> · <span style={{ color: T.red, fontWeight: 500 }}>{downCount} down</span></>}
                                </div>
                            </div>
                            {/* Avg response */}
                            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Avg Response</div>
                                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: T.orange }}>{avgLatency}ms</div>
                                <div style={{ fontSize: 12, color: T.text3, marginTop: 6 }}>Across active monitors</div>
                            </div>
                            {/* Open incidents */}
                            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Open Incidents</div>
                                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: downCount ? T.red : T.green }}>
                                    {INCIDENTS.filter(i => i.live || i.duration === "Ongoing").length}
                                </div>
                                <div style={{ fontSize: 12, color: T.text3, marginTop: 6 }}>
                                    {downCount ? <span style={{ color: T.red }}>Action needed</span> : <span style={{ color: T.green }}>All clear</span>}
                                </div>
                            </div>
                        </div>

                        {/* ── MONITORS TABLE ── */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>Monitors</div>
                            <div style={{ display: "flex", gap: 4 }}>
                                {[
                                    { key: "all", label: `All (${projectMonitors.length})` },
                                    { key: "up", label: `Up (${upCount})` },
                                    { key: "down", label: `Issues (${downCount})` },
                                ].map(({ key, label }) => (
                                    <button key={key} onClick={() => setFilter(key)} style={{
                                        padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                                        cursor: "pointer",
                                        background: filter === key ? T.surface2 : "transparent",
                                        color: key === "down" && downCount ? T.red : filter === key ? T.text : T.text3,
                                        border: filter === key ? 1px solid ${T.border2} : "1px solid transparent",
                  }}>
                                {label}
                            </button>
                ))}
                        </div>
                    </div>

                    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
                        {/* Table head */}
                        <div style={{
                            display: "grid", gridTemplateColumns: "2fr 100px 140px 90px 140px 90px",
                            padding: "10px 20px", background: T.surface2, borderBottom: `1px solid ${T.border}`,
                        }}>
                            {["Monitor", "Status", "Uptime (30d)", "Response", "Last 14 checks", "Checked"].map(h => (
                                <div key={h} style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</div>
                            ))}
                        </div>

                        {displayed.length === 0 ? (
                            <div style={{ padding: "40px 20px", textAlign: "center", color: T.text3, fontSize: 13 }}>
                                No monitors match this filter. <span style={{ color: T.orange, cursor: "pointer" }} onClick={() => setFilter("all")}>Show all</span>
                            </div>
                        ) : displayed.map((m, idx) => (
                            <div key={m.id} style={{
                                display: "grid", gridTemplateColumns: "2fr 100px 140px 90px 140px 90px",
                                padding: "14px 20px", borderBottom: idx < displayed.length - 1 ? 1px solid ${T.border} : "none",
                        alignItems:"center", cursor:"pointer", transition:"background .12s",
                }}
                        onMouseEnter={e => e.currentTarget.style.background = T.surface2}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                        {/* Name */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                                background: m.status === "up" ? T.green : m.status === "down" ? T.red : T.yellow,
                                boxShadow: 0 0 6px ${m.status === "up" ? T.green : m.status === "down" ? T.red : T.yellow},
                    }} />
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</div>
                                <div style={{ fontSize: 11, color: T.text3, fontFamily: "'JetBrains Mono',monospace" }}>{m.url}</div>
                            </div>
                        </div>
                        {/* Status */}
                        <div><StatusPill status={m.status} /></div>
                        {/* Uptime */}
                        <div><UptimeBar pct={m.uptime} status={m.status} /></div>
                        {/* Latency */}
                        <div style={{
                            fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 500,
                            color: !m.latency ? T.text3 : m.latency > 100 ? T.yellow : T.green,
                        }}>
                            {m.latency ? ${m.latency}ms : "—"}
                        </div>
                        {/* Sparkline */}
                        <div><Sparkline checks={m.checks} /></div>
                        {/* Checked */}
                        <div style={{ fontSize: 11, color: T.text3, fontFamily: "'JetBrains Mono',monospace" }}>{m.checkedAt}</div>
                    </div>
              ))}
                </div>

                {/* ── BOTTOM GRID ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>

                    {/* Incident Log */}
                    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>Recent Incidents</div>
                            <div style={{ fontSize: 11, color: T.text3 }}>Last 7 days</div>
                        </div>
                        {INCIDENTS.map((inc, idx) => {
                            const iconBg = inc.type === "down" ? T.redDim : inc.type === "degraded" ? T.yellowDim : T.greenDim;
                            const emoji = inc.type === "down" ? "🔴" : inc.type === "degraded" ? "🟡" : "🟢";
                            return (
                                <div key={inc.id} style={{
                                    display: "flex", gap: 12, padding: "10px 0",
                                    borderBottom: idx < INCIDENTS.length - 1 ? 1px solid ${T.border} : "none",
                        alignItems:"flex-start",
                    }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: iconBg, display: "flex", alignItems: "center",
                            justifyContent: "center", fontSize: 13, flexShrink: 0,
                        }}>{emoji}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{inc.title}</div>
                            <div style={{ fontSize: 11, color: T.text3 }}>{inc.meta}</div>
                        </div>
                        <div style={{
                            fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
                            color: inc.live ? T.red : T.text3,
                            fontWeight: inc.live ? 700 : 400,
                            paddingTop: 2, whiteSpace: "nowrap",
                        }}>
                            {inc.live && <span style={{ animation: "pwPulse 1s ease-in-out infinite", display: "inline-block" }}>● </span>}
                            {inc.duration}
                        </div>
                    </div>
                    );
                })}
                </div>

                {/* Notifications + SSL */}
                <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>Notifications</div>
                        <span style={{ fontSize: 11, color: T.orange, cursor: "pointer", fontWeight: 500 }}>+ Add</span>
                    </div>
                    {[
                        { key: "email", label: "Email", sub: "rajiv@pingnepal.com", emoji: "📧" },
                        { key: "slack", label: "Slack", sub: "#alerts channel", emoji: "💬" },
                        { key: "telegram", label: "Telegram", sub: "@pingnepal_bot", emoji: "📱" },
                        { key: "webhook", label: "Webhook", sub: "api.pingnepal.com/hooks", emoji: "🔔" },
                    ].map(({ key, label, sub, emoji }) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: 8,
                                background: T.surface2, display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: 14, flexShrink: 0,
                            }}>{emoji}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
                                <div style={{ fontSize: 11, color: T.text3 }}>{sub}</div>
                            </div>
                            <Toggle on={notifs[key]} onToggle={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} />
                        </div>
                    ))}

                    {/* SSL */}
                    <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.text2, marginBottom: 10 }}>SSL Certificates</div>
                        {projectMonitors.filter(m => m.ssl).map(m => (
                            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                                <div style={{ fontSize: 12, color: T.text2, fontFamily: "'JetBrains Mono',monospace" }}>{m.url}</div>
                                <span style={{
                                    fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
                                    background: m.ssl.days < 20 ? T.yellowDim : T.greenDim,
                                    color: m.ssl.days < 20 ? T.yellow : T.green,
                                }}>
                                    {m.ssl.valid ? Valid · ${m.ssl.days}d : "Expired"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
        </div >
      </div >

        {/* ADD MONITOR MODAL */ }
    {
        showModal && (
            <AddMonitorModal
                projectMonitorCount={projectMonitors.length}
                onAdd={handleAddMonitor}
                onClose={() => setShowModal(false)}
            />
        )
    }
    </>
  );
}