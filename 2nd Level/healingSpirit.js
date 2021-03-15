(async () => {
    let numDice = 1;
    let target = canvas.tokens.controlled[0];
    let healingRoll = new Roll(`${numDice}d6[healing]`).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, healingRoll.total, "healing", [target], healingRoll, { flavor: "Healing Spirit - Healing Roll (Healing)" })
})();