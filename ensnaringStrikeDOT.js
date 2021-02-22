(async () => {
    let target = canvas.tokens.objects.children.find(i => i.data._id == args[0]);
    let numDice = args[1];
    let damageRoll = new Roll(`${numDice}d6[piercing]`).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "piercing", [target], damageRoll, { flavor: "Ensnaring Strike - Damage (piercing)" });
})(); 