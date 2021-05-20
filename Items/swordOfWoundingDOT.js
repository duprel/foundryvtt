(async () => {
    let t = canvas.tokens.get(args[1].tokenId).actor;
    let actorD = game.actors.get(args[1].actorId);
    let tokenD = canvas.tokens.get(args[1].tokenId);
    let target = canvas.tokens.get(args[1].tokenId)
    if (args[0] === "on") {
        await new Dialog({
            title: "Use Sword of Wounding? 1/round",
            buttons: {
                one: {
                    label: "Yes",
                    callback: (html) => {
                        if (t.data.flags.world === undefined || t.data.flags.world === null) {
                            t.setFlag('world', 'swordOfWounding');
                        };
                        if (t.data.flags.world.swordOfWounding === undefined || t.data.flags.world.swordOfWounding === null) {
                            t.setFlag('world', 'swordOfWounding', { DOT: 1, });
                        };
                        if (t.data.flags.world.swordOfWounding.DOT === undefined || t.data.flags.world.swordOfWounding.DOT === null) {
                            t.setFlag('world', 'swordOfWounding', { DOT: 1, });
                        };
                        if (t.data.flags.world.swordOfWounding.DOT >= 1) {
                            let dotCount = t.data.flags.world.swordOfWounding.DOT + 1;
                            t.update({ "flags.world.swordOfWounding.DOT": dotCount });
                        };
                    }
                },
                two: {
                    label: "No",
                    callback: (html) => {
                        return;
                    }
                }
            }
        }).render(true);
    };
    if (args[0] === "each") {
        let damDice = t.data.flags.world.swordOfWounding.DOT;
        let damageRoll = new Roll(`${damDice}d4[necrotic]`).roll();
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, "necrotic", [target], damageRoll, { flavor: `Bleeding damage` });

    };
})();