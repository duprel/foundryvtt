//Macro args[1] = passed from Item Macro
(async () => {
    var a = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        await Summoner.placeAndSummon(
            a,
            "Summoned Spiritual Weapon",
        );
        var weapon = await canvas.tokens.objects.children.find(i => i.data.name == "Spiritual Weapon*");
        console.log("#############:      ", weapon);
    } else {
        await Summoner.dismiss("Summoned Spiritual Weapon");
    };
    
})();