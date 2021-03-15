let numDice = 4;
let target = canvas.tokens.controlled[0];
let damageRoll = new Roll(`${numDice}d4[piercing]`).roll();
new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "piercing", [target], damageRoll, { flavor: "Cloud of Daggers - Damage Roll (Piercing)" })