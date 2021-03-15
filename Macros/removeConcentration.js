(async () => {
    if (game.user.targets.size != 1) {
        ui.notifications.error("Please target a single token.");
        return;
    }
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    if (args[0] === "on") {
        return;
    } else {
        game.cub.removeCondition("Concentrating");
    }
})();