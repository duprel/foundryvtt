//ItemMacro

(async () => {
    if (args[0].isCritical) {
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        let construct = ["construct"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        if (undead || construct) {
            return;
        };
        target.actor.update({ "data.attributes.hp.value": 0 });
        ChatMessage.create({ content: target.actor.data.name + "'s soul is absorbed!"});
        console.log("###FART: ", target)
    };
})();