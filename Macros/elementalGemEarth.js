//Macro args[1] = passed from Item Macro
(async () => {
    var a = canvas.tokens.controlled[0].actor;
    await Summoner.placeAndSummon(
        a,
        "Earth Elemental",
    );
})();