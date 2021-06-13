(async () => {
    if (args[0] === "each") {
        const lastArg = args[args.length - 1];
        let tarAct = game.actors.get(lastArg.actorId);
        let save_roll = await tarAct.rollAbilitySave('con', { chatMessage: true, fastForward: true });
        if (save_roll._total >= 12) {
            tarAct.deleteEmbeddedEntity("ActiveEffect", lastArg.effectId)
        };
    };
})();