(async () => {
    if (game.user.targets.size != 1) {
        ui.notifications.error("Please target a single token.");
        return;
    };
    let target = Array.from(game.user.targets)[0];
    target.update({
        dimLight: 40,
        brightLight: 20
    });
})();