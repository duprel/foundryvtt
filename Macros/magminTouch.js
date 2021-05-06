let t = canvas.tokens.get(args[1]);
if (args[0] === "each") {
    let damageRoll = new Roll("1d6[fire]").roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "fire", [t], damageRoll, { flavor: "Magmin Touch - Damage Roll (Fire)" });
};