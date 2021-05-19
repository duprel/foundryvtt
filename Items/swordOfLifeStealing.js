(async () => {
    if (args[0].hitTargets.length > 0) {
        let damageType = "necrotic";
        let actorD = game.actors.get(args[0].actor._id);
        let tokenD = canvas.tokens.get(args[0].tokenId);
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let wpnDmg = args[0].damageTotal;
        let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        let construct = ["construct"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        if (args[0].isCritical) {
            if (!undead && !construct) {
                let damageRoll = new Roll(`3d6 + ${wpnDmg}`).roll();
                new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Life Stealing (${damageType}) extra damage` });
                let tHp = damageRoll.total - wpnDmg;
                if (actorD.data.data.attributes.hp.temp != 0 || actorD.data.data.attributes.hp.temp != null || actorD.data.data.attributes.hp.temp != undefined) {
                    if (actorD.data.data.attributes.hp.temp >= tHp) {
                        return;
                    };
                    if (actorD.data.data.attributes.hp.temp < tHp) {
                        actorD.update({ "data.attributes.hp.temp": wpnDmg });
                    };
                };
                if (actorD.data.data.attributes.hp.temp === 0 || actorD.data.data.attributes.hp.temp === null || actorD.data.data.attributes.hp.temp === undefined) {
                    actorD.update({ "data.attributes.hp.temp": wpnDmg });
                };
            };
        };
    };
})();