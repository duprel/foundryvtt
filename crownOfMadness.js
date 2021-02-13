(async () => {
    if (game.user.targets.size != 1) {
        ui.notifications.error("Please target a single token.");
        return;
    };
    let target = Array.from(game.user.targets)[0];
    if (args[0] === "on") {
        game.cub.addCondition("Charmed", target, { allowDuplicates: false, replaceExisting: false });
        return;
    } else {
        game.cub.removeCondition("Charmed");   
    };
})();