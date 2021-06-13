(async () => {
    const lastArg = args[args.length - 1];
    let tarAct = game.actors.get(lastArg.actorId);
    let tok = canvas.tokens.get(lastArg.tokenId);
    if (args[0] === "on") {
        let currHP = tarAct.data.data.attributes.hp.value;
        if (currHP <= 150) {
            await game.cub.addCondition("Stunned", tok);
        };
    };
    if (args[0] === "each") {
        let saveRoll = await tarAct.rollAbilitySave('con', { chatMessage: true, fastForward: true });
        if (saveRoll._total >= args[1]) {
            await ChatMessage.create({ content: "Stun ends for " + tarAct.name + " at the end of their turn" });
            await game.cub.removeCondition("Stunned", tok);
        };
    };
    if (args[0] === "off") {
        await game.cub.removeCondition("Stunned", tok);
    };   
})();