//you have to delete the effect, not deactivate it.
(async () => {
    var a = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        await Summoner.placeAndSummon(
            a,
            "Guardian of Faith",
        );
    } else {
        await Summoner.dismiss("Guardian of Faith");
    };
})();