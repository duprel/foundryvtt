(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    };
    var t = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        let tName = t.data.name;
        Summoner.placeAndSummon(
            t,
            "Bonfire",
        );
    } else {
    };
})();