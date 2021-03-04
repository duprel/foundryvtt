(async () => {
    let numDice =2;
    let target = canvas.tokens.controlled[0];
    let healingRoll = new Roll(`${numDice}d10[healing]`).roll();
    let healingTotal = healingRoll.total;
    console.log(healingTotal);
    new MidiQOL.DamageOnlyWorkflow(actor, token, healingRoll.total, "healing", [target], healingRoll, { flavor: "You heal " + healingTotal + " HP!" })
})();