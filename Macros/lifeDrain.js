//args[1] = @target, args[2] = @damage  
(async () => {
    let t = canvas.tokens.get(args[1]).actor;
    if (args[0] === "on") {
        let max = t.data.data.attributes.hp.max;
        if (t.data.flags.lifeSteal === "undefined" || t.data.flags.lifeSteal === null) {
            t.update({ "flags.lifeSteal": max})
        };
        let current = t.data.data.attributes.hp.value;
        let newMax = max - args[2];
        await t.update({ "data.attributes.hp.max": newMax });
        if (t.data.data.attributes.hp.value > max) {
            await t.update({ "data.attributes.hp.value": newMax });
        };
    } else {
        if (t.data.flags.lifeSteal === "undefined" || t.data.flags.lifeSteal === null) {
            return;
        } else {
            let oldMax = t.data.flags.lifeSteal;
            await t.update({ "data.attributes.hp.max": oldMax });
            await t.update({ "flags.lifeSteal": null });
        };
    };
})();