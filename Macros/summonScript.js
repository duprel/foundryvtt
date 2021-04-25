//Macro args[1] = passed from Item Macro
(async () => {
    var a = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        await Summoner.placeAndSummon(
            a,
            args[1],
        );
        return;
    };
    Summoner.dismiss(args[1]);
})();