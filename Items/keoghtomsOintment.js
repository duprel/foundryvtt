(async () => {
    if (args[0] === "on") {
        if (game.cub.hasCondition("Poisoned")) {
            game.cub.removeCondition("Poisoned");
        };
    };
})();