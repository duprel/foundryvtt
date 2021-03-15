//args[0] = tokenID args[1] = save DC, args[2] = caster
(async () => {
    let target = canvas.tokens.objects.children.find(i => i.data._id == args[0]);
    var targetName = target.data.actorData.name;
    var conSave = target.actor.data.data.abilities.con.save;
    var saveRoll = new Roll("d20 + @conS", { conS: conSave }).roll();
    saveRoll.toMessage({ flavor: targetName + 's Constitution Saving Throw' });
    var spellDC = args[1];
    if (saveRoll.total < spellDC) {
        let numDice = 1;
        let damageRoll = new Roll(`${numDice}d6[fire]`).roll();
        new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "fire", [target], damageRoll, { flavor: "Searing Smite - Damage (fire)" });
    } else {
        let turnDataArr = Object.values(game.combat._data.flags.turnAlert.alerts)
        let turnData = turnDataArr.find(i => i.macro == "searingSmiteDOT");
        let combatID = turnData.combatId;
        let alertID = turnData.id;
        TurnAlert.delete(combatID, alertID);
        game.cub.removeCondition("OnFire", target);
        //remove concentration
        game.cub.removeCondition("Concentrating", args[2]);
    };
})();