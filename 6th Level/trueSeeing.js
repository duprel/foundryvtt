//The spell has to expire for truesight to be toggled off. Otherwise the effect must be deleted on the character sheet (not toggled) 
(async () => {
    let t = Array.from(game.user.targets)[0];
    if (args[0] === "on") {
        await t.update({ "flags.conditional-visibility.truesight": true });
    } else {
        await t.update({ "flags.conditional-visibility.truesight": false });
    };
})();