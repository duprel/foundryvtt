(async () => {
    if (args[0] === "on") {
        if (game.cub.hasCondition("Blinded")) {
            game.cub.removeCondition("Blinded");
        };
        if (game.cub.hasCondition("Deafened")) {
            game.cub.removeCondition("Deafened");
        };
        if (game.cub.hasCondition("Paralyzed")) {
            game.cub.removeCondition("Paralyzed");
        };
        if (game.cub.hasCondition("Poisoned")) {
            game.cub.removeCondition("Poisoned");
        };
    };
})();