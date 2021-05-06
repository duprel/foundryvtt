(async () => {
    let t = args[0].actor;
    let spellAbil = t.data.attributes.spellcasting;
    let abilBonus = getProperty(t, `data.abilities.${spellAbil}.mod`);
    let dispelRoll = new Roll("d20 + @aBon", { aBon: abilBonus }).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, dispelRoll.total, "", "", dispelRoll, { flavor: "Counterspell Roll" });
    if (dispelRoll._total < 13) {
        var messageContent = "Counterspell failed!"
    } else if (dispelRoll._total > 19) {
        var messageContent = "Level 9 spell or less countered!"
    } else {
        var messageContent = "Level " + (dispelRoll._total - 10) + " spell or less countered!"
    };
    var chatData = { content: messageContent };
    ChatMessage.create(chatData, {});
})();