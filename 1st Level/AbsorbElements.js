//ItemMacro
(async () => {

    async function setDamageType(elementalType, actor, level) {
        let bonus = (level + "d6" + "[" + elementalType + "]");
        await actor.update({ "data.bonuses.mwak.damage": bonus });
        await actor.update({ "data.bonuses.msak.damage": bonus });
    }

    if (args[0] === "on") {
        const lastArg = args[args.length - 1];
        let spellLevel = args[1];
        new Dialog({
            title: "Choose elemental damage type",
            buttons: {
                one: {
                    label: "Acid",
                    callback: () => {
                        setDamageType("acid", actor, spellLevel);
                    }
                },
                two: {
                    label: "Cold",
                    callback: () => {
                        setDamageType("cold", actor, spellLevel);
                    }
                },
                three: {
                    label: "Fire",
                    callback: () => {
                        setDamageType("fire", actor, spellLevel);
                    }
                },
                four: {
                    label: "Lightning",
                    callback: () => {
                        setDamageType("lightning", actor, spellLevel);
                    }
                },
                six: {
                    label: "Thunder",
                    callback: () => {
                        setDamageType("thunder", actor, spellLevel);
                    }
                }
            }
        }).render(true);

    };
    if (args[0] === "off") {
        await actor.update({ "data.bonuses.mwak.damage": "" });
        await actor.update({ "data.bonuses.msak.damage": "" });
    };
})();
