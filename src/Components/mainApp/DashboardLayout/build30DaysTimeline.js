function build30DayTimeline(website) {
    const days = [];
    console.log('build', website)
    // Start by assuming every day has current status
    for (let i = 0; i < 30; i++) {
        days.push({
            date: new Date(Date.now() - i * 86400000),
            status: website.status,
        });
    }

    const changes = [...website.statusChanges]
        .sort(
            (a, b) =>
                new Date(b.changedAt) - new Date(a.changedAt)
        );

    for (const change of changes) {
        const changeDate = new Date(change.changedAt);

        for (const day of days) {
            if (day.date < changeDate) {
                day.status = change.previousStatus;
            }
        }
    }

    return days.reverse();
}