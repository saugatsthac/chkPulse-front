import { motion } from "framer-motion";
import {
    Activity,
    Bell,
    Gauge,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#0B0F19] text-white overflow-x-hidden overflow-y-auto">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-orange-500/20 blur-[180px]" />
                <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-orange-600/10 blur-[180px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">

                <h1 className="text-2xl font-bold tracking-tight">
                    PulseWatch
                </h1>

                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-gray-300 hover:text-white transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="px-5 py-2 bg-orange-500 hover:bg-orange-400 rounded-xl transition"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-24">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm mb-8">
                            Real-Time Website Monitoring
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Know your website is down
                            <span className="text-orange-500">
                                {" "}
                                before your users do.
                            </span>
                        </h1>

                        <p className="mt-8 text-xl text-slate-400 max-w-xl leading-relaxed">
                            Monitor uptime, track response times,
                            receive instant alerts, and keep your
                            services running without surprises.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-10">

                            <button
                                onClick={() => navigate("/signup")}
                                className="flex items-center gap-2 px-7 py-4 bg-orange-500 hover:bg-orange-400 rounded-2xl font-semibold transition"
                            >
                                Start Monitoring
                                <ArrowRight size={18} />
                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="px-7 py-4 border border-slate-700 hover:border-slate-500 rounded-2xl transition"
                            >
                                Login
                            </button>
                        </div>

                    </motion.div>

                    {/* Right Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >

                        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-2xl">

                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-semibold text-lg">
                                    Monitoring Dashboard
                                </h2>

                                <span className="text-green-400 text-sm">
                                    ● Live
                                </span>
                            </div>

                            <div className="space-y-4">

                                <div className="bg-[#0B0F19] p-4 rounded-xl flex justify-between">
                                    <span>pulsewatch.com</span>
                                    <span className="text-green-400">
                                        32ms
                                    </span>
                                </div>

                                <div className="bg-[#0B0F19] p-4 rounded-xl flex justify-between">
                                    <span>api.service.com</span>
                                    <span className="text-green-400">
                                        48ms
                                    </span>
                                </div>

                                <div className="bg-[#0B0F19] p-4 rounded-xl flex justify-between">
                                    <span>shop.example.com</span>
                                    <span className="text-red-400">
                                        Offline
                                    </span>
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">

                                <div className="bg-[#0B0F19] rounded-xl p-4">
                                    <p className="text-slate-400 text-sm">
                                        Uptime
                                    </p>

                                    <h3 className="text-3xl font-bold mt-1">
                                        99.98%
                                    </h3>
                                </div>

                                <div className="bg-[#0B0F19] rounded-xl p-4">
                                    <p className="text-slate-400 text-sm">
                                        Avg Response
                                    </p>

                                    <h3 className="text-3xl font-bold mt-1">
                                        42ms
                                    </h3>
                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>

            </section>

            {/* Features */}
            <section className="relative z-10 max-w-7xl mx-auto px-8 pb-24">

                <div className="grid md:grid-cols-3 gap-6">

                    <FeatureCard
                        icon={<Activity size={28} />}
                        title="Uptime Monitoring"
                        description="Continuous monitoring that checks your websites around the clock."
                    />

                    <FeatureCard
                        icon={<Gauge size={28} />}
                        title="Response Tracking"
                        description="Measure latency and performance trends in real time."
                    />

                    <FeatureCard
                        icon={<Bell size={28} />}
                        title="Instant Alerts"
                        description="Receive notifications when services go offline."
                    />

                </div>

            </section>

        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <motion.div
            whileHover={{
                y: -8
            }}
            className="bg-[#111827] border border-slate-800 rounded-3xl p-8"
        >
            <div className="text-orange-500 mb-5">
                {icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
                {title}
            </h3>

            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}