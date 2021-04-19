//args[1] = @target, args[2] = @damage
(async () => {
    if (args[0] === "on") {
        let t = canvas.tokens.get(args[1]);
        console.log("###################:       ", t.actor.data.data.attributes.hp.value)
        if (t.actor.data.data.attributes.hp.value === 0) {
            await t.actor.update({ "data.attributes.hp.value": 1 });
            await game.cub.removeCondition("Dead", t.actor);
        };
        console.log("###################:       ", t.actor.data.data.attributes.hp.value)
    } else {
       
       
    };
})();