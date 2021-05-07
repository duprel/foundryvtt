(async () => {
    let t = canvas.tokens.get(args[1]).actor;
    if (args[0] === "on") {
        let saveRoll = new Roll("1d20 + @con", { con: t.data.data.abilities.con.saveBonus }).roll();
        if (saveRoll._total <= 9) {
            saveRoll.toMessage({ flavor: 'Saving Throw Failed! Petrified' });
            await game.cub.addCondition("Petrified", t);
            return;
        };
        if (saveRoll._total > 9 && saveRoll._total < 14) {
            saveRoll.toMessage({ flavor: 'Saving Throw Failed! Restrained' });
            await game.cub.addCondition("Restrained", t);
            return;
        };
        if (saveRoll._total >= 14) {
            saveRoll.toMessage({ flavor: 'Saving Throw Passed!' });
            return;
        };
    };
    if (args[0] === "each") {
        if (game.cub.hasCondition("Restrained", t)) {
            let petRoll = new Roll("1d20 + @con", { con: t.data.data.abilities.con.saveBonus }).roll();
            if (petRoll._total < 14) {
                petRoll.toMessage({ flavor: 'Saving Throw Failed! Petrified' });
                await game.cub.removeCondition("Restrained", t);
                await game.cub.addCondition("Petrified", t);
                return;
            };
            if (petRoll._total >= 14) {
                petRoll.toMessage({ flavor: 'Saving Throw Passed!' });
                await game.cub.removeCondition("Restrained", t);
                return;
            };

        };
    };
    if (args[0] === "off") {
        if (game.cub.hasCondition("Petrified", t)) {
            await game.cub.removeCondition("Petrified", t);
            return;
        };
        if (game.cub.hasCondition("Restrained")) {
            await game.cub.removeCondition("Restrained", t);
            return;
        };
    };
})();