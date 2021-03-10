(async () => {
    if (game.user.targets.size < 1) {
        ui.notifications.error("Please target at least 1 token.");
        return;
    };
    var targets = Array.from(game.user.targets);
    var numDice = 1;
    for (let i = 0; i < targets.length; i++) {
        let target = targets[i];
        let necroticRoll = new Roll(`${numDice}d10[necrotic]`).roll();
        new MidiQOL.DamageOnlyWorkflow(actor, token, necroticRoll.total, "necrotic", [target], necroticRoll, {})
    };
})();

