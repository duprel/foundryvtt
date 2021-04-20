//args[1] = @target, args[2] = @damage
(async () => {
    let t = canvas.tokens.get(args[1]);
    console.log("#########:     ", t);
    if (args[0] === "on") {
        let max = t.actor.data.data.attributes.hp.max;
        let current = t.actor.data.data.attributes.hp.value;
        let newMax = max - args[2];
        if (t.actor.data.data.attributes.hp.value === 0) {
            await t.actor.update({ "data.attributes.hp.value": 1 })
        };
        await t.actor.update({ "data.attributes.hp.max": newMax });
        if (current > newMax) {
            await t.actor.update({ "data.attributes.hp.value": newMax });
        };
        if (t.actor.data.flags.world.lifeDrain === undefined || t.actor.data.flags.world.lifeDrain === null) {
            t.actor.setFlag('world', 'lifeDrain', { value: max, });
        };
        console.log("#########:     ", current);
    } else {
        if (t.actor.data.flags.world.lifeDrain === undefined || t.actor.data.flags.world.lifeDrain === null) {
            return;
        };
        let oldMax = t.actor.data.flags.world.lifeDrain.value;
        console.log("#######:   ", oldMax)
        await t.update({ "data.attributes.hp.max": oldMax });
        t.actor.unsetFlag('world', 'lifeDrain');
    };
})();