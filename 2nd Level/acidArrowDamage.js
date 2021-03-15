(async () => {
    let target = canvas.tokens.objects.children.find(i => i.data._id == args[0]);
    let numDice = 2 + args[1];
    let damageRoll = new Roll(`${numDice}d4[acid]`).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "acid", [target], damageRoll, { flavor: "Acid Arrow - Damage (acid)" });
})(); 