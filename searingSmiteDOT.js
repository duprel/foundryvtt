(async () => {
    let target = canvas.tokens.objects.children.find(i => i.data._id == args[0]);
    let numDice = 1;
    let damageRoll = new Roll(`${numDice}d6[fire]`).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "fire", [target], damageRoll, { flavor: "Searing Smite - Damage (fire)" });
})();