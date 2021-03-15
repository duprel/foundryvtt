(async () => {
    if (args[0] === "on") {
        const item = game.items.getName("Dragon's Breath Attack");
        let target = canvas.tokens.get(args[1]);
        target.actor.createOwnedItem(item.data);
    } else {
        var tokenId = args[2].tokenId;
        let token = canvas.tokens.get(tokenId);
        const itemId = token.actor.items.getName("Dragon's Breath Attack");
        token.actor.deleteOwnedItem(itemId.data._id);
    }
})();