function calculateUptimePercent(timeline) {
    const upDays = timeline.filter(d => d.status === "UP").length;
    return (upDays / timeline.length) * 100;
}