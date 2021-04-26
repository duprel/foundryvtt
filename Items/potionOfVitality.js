(async () => {
    if (args[0] === "on") {
        if (game.cub.hasCondition("Diseased")) {
            game.cub.removeCondition("Diseased");
        };
        if (game.cub.hasCondition("Exhaustion 1")) {
            game.cub.removeCondition("Exhaustion 1");
        };
        if (game.cub.hasCondition("Exhaustion 2")) {
            game.cub.removeCondition("Exhaustion 2");
        };
        if (game.cub.hasCondition("Exhaustion 3")) {
            game.cub.removeCondition("Exhaustion 3");
        };
        if (game.cub.hasCondition("Exhaustion 4")) {
            game.cub.removeCondition("Exhaustion 4");
        };
        if (game.cub.hasCondition("Exhaustion 5")) {
            game.cub.removeCondition("Exhaustion 5");
        };
        if (game.cub.hasCondition("Poisoned")) {
            game.cub.removeCondition("Poisoned");
        };
    } else {
        return;
    };
})();