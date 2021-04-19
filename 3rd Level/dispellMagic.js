(async () => {
    let t = args[0].actor;
    let spellAbil = t.data.attributes.spellcasting;
    let abilBonus = getProperty(t, `data.abilities.${spellAbil}.mod`);
    let dispelRoll = new Roll("d20 + @aBon", { aBon: abilBonus }).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, dispelRoll.total, "", "", dispelRoll, { flavor: "Dispel Magic Roll" });
    if (dispelRoll._total < 13) {
        var messageContent = "Dispel Magic failed!"
    } else if (dispelRoll._total > 19) {
        var messageContent = "Level 9 spells or less dispelled!"
    } else {
        var messageContent = "Level " + (dispelRoll._total - 10) + " spells or less dispelled!"
    };
    var chatData = { content: messageContent };
    ChatMessage.create(chatData, {});
})();