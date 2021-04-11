//you have to delete the effect, not deactivate it.
(async () => {
    var a = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        await Summoner.placeAndSummon(
            a,
            "Daylight Spell",
        );
    } else {
        await Summoner.dismiss("Daylight Spell");
    };
})();