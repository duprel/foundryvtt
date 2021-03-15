(async () => {
    if (args[0] === "on") {
        let target = Array.from(game.user.targets)[0];
        console.log("************", target);
        game.cub.addCondition("Charmed", target);
    } else {
        var tokenID = args[1].tokenId;
        var token = canvas.tokens.get(tokenID);
        game.cub.removeCondition("Charmed", token);
    };
})();