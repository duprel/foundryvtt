if ((args[0].hitTargets.length > 0) && (args[0].isCritical)) {
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId);
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let damageRoll = new Roll("4d6").roll();
    let damageType = "fire";
    new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Flame Tongue (${damageType}) extra damage` });
    return;
};
if (args[0].hitTargets.length > 0) {
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId);
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let damageRoll = new Roll("2d6").roll();
    let damageType = "fire";
    new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Flame Tongue (${damageType}) extra damage`});
};