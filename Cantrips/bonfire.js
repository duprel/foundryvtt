let numDice = 1;
let target = canvas.tokens.controlled[0];
let damageRoll = new Roll(`${numDice}d8[fire]`).roll();
new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "fire", [target], damageRoll, { flavor: "Create Bonfire - Damage Roll (Fire)" })