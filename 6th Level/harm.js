//args[1] = @target, args[2] = @damage
(async () => {
    if (args[0] === "on") {
        let t = canvas.tokens.get(args[1]);
        if (t.actor.data.data.attributes.hp.value === 0) {
            await t.actor.update({ "data.attributes.hp.value": 1 });
        };
        console.log("###################:       ", t.actor.data.data.attributes.hp.value)
    } else {
    };
})();