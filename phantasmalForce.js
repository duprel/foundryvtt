//args[1] = @token
(async () => {
    if (args[0] === "on") {
        const item = game.items.getName("Phantasmal Force Damage");
        let target = canvas.tokens.get(args[1]);
        target.actor.createOwnedItem(item.data);
    } else {
        let token = canvas.tokens.get(args[1]);
        const itemId = token.actor.items.getName("Phantasmal Force Damage");
        token.actor.deleteOwnedItem(itemId.data._id);
    };
})();