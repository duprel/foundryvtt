(async () => {
    let t = args[0].actor;
    let spellAbil = t.data.attributes.spellcasting;
    let abilBonus = getProperty(t, `data.abilities.${spellAbil}.mod`);
    console.log("##############:      ", abilBonus);
})();