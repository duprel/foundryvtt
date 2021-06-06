//ItemMacro
//In order for this script to work the 3rd resource slot on the actors character sheet must be used to keep track of the number of life steal charges left.

(async () => {
    if (args[0].isCritical) {
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let a = game.actors.get(args[0].actor._id);
        let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        let construct = ["construct"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        let chargesLeft = a.data.data.resources.tertiary.value;
        if (undead || construct || chargesLeft < 1) {
            return;
        };
        let save_roll = await target.actor.rollAbilitySave('con', { chatMessage: true, fastForward: true });
        if (save_roll._total < 15) {
            target.actor.update({ "data.attributes.hp.value": 0 });
            a.update({ "data.resources.tertiary.value": chargesLeft - 1 });
        };
    };
})();