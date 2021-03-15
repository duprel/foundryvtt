(async () => {
    async function setDamageType(elementalType, token, level) {
        let bonus = (level + "d6" + "[" + elementalType + "]");
        token.actor.update({ "data.bonuses.mwak.damage": bonus });
        console.log(elementalType, token, bonus);
    }
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let t = canvas.tokens.controlled;
    let spellLevel = args[1];
    if (args[0] === "on") {
        new Dialog({
            title: "Choose elemental damage type",
            buttons: {
                one: {
                    label: "Acid",
                    callback: () => {
                        setDamageType("acid", t[0], spellLevel);
                    }
                },
                two: {
                    label: "Cold",
                    callback: () => {
                        setDamageType("cold", t[0], spellLevel);
                    }
                },
                three: {
                    label: "Fire",
                    callback: () => {
                        setDamageType("fire", t[0], spellLevel);
                    }
                },
                four: {
                    label: "Lightning",
                    callback: () => {
                        setDamageType("lightning", t[0], spellLevel);
                    }
                },
                six: {
                    label: "Thunder",
                    callback: () => {
                        setDamageType("thunder", t[0], spellLevel);
                    }
                }
            }
        }).render(true);
    } else {
        t[0].actor.update({ "data.bonuses.mwak.damage": "" });
    };
})();