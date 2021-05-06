(async () => {
    let t = canvas.tokens.get(args[1]).actor;
    if (args[0] === "on") {
        let saveRoll = new Roll("1d20 + @con", { con: t.data.data.abilities.con.saveBonus }).roll();
        if (saveRoll._total <= 9) {
            saveRoll.toMessage({ flavor: 'Saving Throw Failed! Petrified' });
            game.cub.addCondition("Petrified", t);
            return;
        };
        if (saveRoll._total > 9 && saveRoll._total < 14) {
            saveRoll.toMessage({ flavor: 'Saving Throw Failed! Restrained' });
            game.cub.addCondition("Restrained", t);
            return;
        };
        if (saveRoll._total >= 14) {
            saveRoll.toMessage({ flavor: 'Saving Throw Passed!' });
            return;
        };
    };

    if (args[0] === "each") {
        if (game.cub.hasCondition("Restrained", t) {
            let petRoll = new Roll("1d20 + @con", { con: t.data.data.abilities.con.saveBonus }).roll();
            if (petRoll._total < 14) {
                petRoll.toMessage({ flavor: 'Saving Throw Failed! Petrified' });
                game.cub.addCondition("Pertified", t);
                return;
            };
            game.cub.removeCondition("Restrained", t);
            game.cub.addCondition("Petrified", t);
            return;
        };
    };
    if (args[0] === "off") {
        if (game.cub.hasCondition("Petrified", t)) {
            game.cub.removeCondition("Petrified", t);
            return;
        };
        if (game.cub.hasCondition("Restrained")) {
            game.cub.removeCondition("Restrained", t);
            return;
        };
    };
})();