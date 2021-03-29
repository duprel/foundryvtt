(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    var a = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        console.log("FART");
        await Summoner.placeAndSummon(
            a,
            "Arcane Eye Summon",
        ); 
    } else {
        await Summoner.dismiss("Arcane Eye Summon");
    };
})();