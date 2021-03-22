(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let a = canvas.tokens.controlled[0].actor;
    Summoner.placeAndSummon(
        a,
        "Magic Circle",
    );
})();

