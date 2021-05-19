if ((args[0].hitTargets.length > 0) && (args[0].isCritical)) {
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId);
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let dragon = ["dragon"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    if (dragon) {
        let damageRoll = new Roll(`6d6 + ${args[0].damageTotal}`).roll();
        let damageType = args[0].damageDetail[0].type;
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Dragon Slayer (${damageType}) extra damage` });
    };
    return;
};
if (args[0].hitTargets.length > 0) {
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId);
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let dragon = ["dragon"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    if (dragon) {
        let damageRoll = new Roll(`3d6 + ${args[0].damageTotal}`).roll();
        let damageType = args[0].damageDetail[0].type;
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Dragon Slayer (${damageType}) extra damage`});
    };
};