//ImageMacro

(async () => {
    if (args[0].attackRoll.results[0] === 20) {
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let giant = ["giant"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        if (giant) {
            let save_roll = await target.actor.rollAbilitySave('con', { chatMessage: true, fastForward: true });
            if (save_roll._total < 17) {
                target.actor.update({ "data.attributes.hp.value": 0 });
                ChatMessage.create({ content: target.name + " is slain!" });
            };
        };
    };
})();