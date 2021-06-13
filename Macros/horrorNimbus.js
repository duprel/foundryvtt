(async () => {
    const lastArg = args[args.length - 1];
    let tarAct = game.actors.get(lastArg.actorId);
    let tok = canvas.tokens.get(lastArg.tokenId);
    if (args[0] === "each") {
        let saveRoll = await tarAct.rollAbilitySave('wis', { chatMessage: true, fastForward: true });
        if (saveRoll._total >= 15) {
            await ChatMessage.create({ content: "Fear ends for " + tarAct.name + " at the end of their turn" });
            await game.cub.removeCondition("Frightened", tok);
        };
    };
})();