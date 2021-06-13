//ItemMacro

(async () => {
    if (args[0].attackRoll.results[0] == 20) {
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let a = game.actors.get(args[0].actor._id);
        let tok = canvas.tokens.get(args[0].tokenId);
        let damageRoll = new Roll("6d8[slashing]").roll();
        damageRoll.toMessage();
        await new MidiQOL.DamageOnlyWorkflow(a, tok, damageRoll.total, "slashing", [target], damageRoll, { flavor: `Vorpal Sword extra damage, Is the creature dead?`, itemCardId: args[0].itemCardId, useOther: true, damageList: args[0].damageList });
    }; 
})();