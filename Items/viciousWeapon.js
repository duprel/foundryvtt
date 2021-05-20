if (args[0].attackRoll.results[0] === 20) {
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId);
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let damageType = args[0].damageDetail[0].type;
    let damageRoll = new Roll("2d6").roll();
    new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Vicious Weapon (${damageType}) extra damage` });
};