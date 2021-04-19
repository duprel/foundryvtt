(async () => {
    if (args[0] === "on") {
        let target = canvas.tokens.controlled[0];
        let damageRoll = new Roll("20").roll();
        new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "radiant", [target], damageRoll, { flavor: "Guardian of Faith - Damage (Radiant)" });        
    } else {
        return;
    };
})();

