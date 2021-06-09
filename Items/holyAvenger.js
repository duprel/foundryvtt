//ItemMacro

(async () => {
    if (args[0].hitTargets.length === 0) {
        console.log("Missed or no target");
        return;
    };

    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let a = game.actors.get(args[0].actor._id);
    let tok = canvas.tokens.get(args[0].tokenId);
    let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    let fiend = ["fiend"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    if (undead || fiend) {
        let damDice = 2;
        if (args[0].isCritical) {
            damDice = 4;
        };
        let damageRoll = new Roll(`${damDice}d10[radiant]`).roll();
        damageRoll.toMessage();
        await new MidiQOL.DamageOnlyWorkflow(a, tok, damageRoll.total, "radiant", [target], damageRoll, { flavor: `Holy Avenger extra radiant damage`, itemCardId: args[0].itemCardId, useOther: true, damageList: args[0].damageList });
    };
})();