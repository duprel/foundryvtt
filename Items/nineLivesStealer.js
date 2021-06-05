//ItemMacro

(async () => {
    if (args[0].isCritical) {
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        let construct = ["construct"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        if (giant || construct) {
            return;
        };

        console.log("###: ", target)
    };
})();