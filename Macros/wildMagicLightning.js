(async () => {
    if (game.user.targets.size > 3 || game.user.targets.size < 1) {
        ui.notifications.error("Please target 1 to 3 tokens.");
        return;
    };
    var targets = Array.from(game.user.targets);
    var numDice = 4;
    //let lightningRoll = new Roll(`${numDice}d10[lightning]`).roll();
    for (let i = 0; i < targets.length; i++) {
        let target = targets[i];
        let lightningRoll = new Roll(`${numDice}d10[lightning]`).roll();
        new MidiQOL.DamageOnlyWorkflow(actor, token, lightningRoll.total, "lightning", [target], lightningRoll, {})
    };
})();

