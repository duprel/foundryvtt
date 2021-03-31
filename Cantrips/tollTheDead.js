//Midi-qol on use. Remove damage on item card. Let the macro handle it. as an item macro
if (args[0].failedSaves.length > 0) {
    let folder01 = "modules/animated-spell-effects/spell-effects/magic/";
    let anFile = `${folder01}magic_explosion_CIRCLE_04.webm`;
    if (game.user.targets.size == 0) ui.notifications.error('You must target at least one token');
    const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function Cast() {
    var myStringArray = Array.from(game.user.targets)[0];
    var arrayLength = game.user.targets.size;
    for (var i = 0; i < arrayLength; i++) {

        let mainTarget = Array.from(game.user.targets)[i];
        let tarScale = ((mainTarget.data.width + mainTarget.data.height) / 2);


        let spellAnim =
        {
            file: anFile,
            position: mainTarget.center,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            angle: 0,
            scale: {
                x: tarScale,
                y: tarScale
            }
        };
        canvas.fxmaster.playVideo(spellAnim);
        game.socket.emit('module.fxmaster', spellAnim);
        await wait(75);
    }
}
Cast()
    let target = canvas.tokens.get(args[0].failedSaves[0]._id);
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId).actor;
    let level;
    let damageRoll;
    actorD.data.type === "character" ? level = actorD.data.data.details.level : level = tokenD.data.data.details.cr;
    let numDice = 1 + (Math.floor((level + 1) / 6));
    target.actor.data.data.attributes.hp.max != target.actor.data.data.attributes.hp.value ? damageRoll = new Roll(`${numDice}d12`).roll() : damageRoll = new Roll(`${numDice}d8`).roll();
    game.dice3d?.showForRoll(damageRoll);
    new MidiQOL.DamageOnlyWorkflow(actorD, target, damageRoll.total, "necrotic", [target], damageRoll, { itemCardId: args[0].itemCardId });
}