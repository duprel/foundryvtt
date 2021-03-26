//args[1] = spell level
(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let a = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        let itemData = game.items.find(i => i.name == "Vampiric Touch Attack");
        a.createOwnedItem(itemData);
        let newItem = await a.items.find(i => i.name == "Vampiric Touch Attack");
        let diceNum = args[1];
        
        await a.updateEmbeddedEntity("OwnedItem", _id: newItem._id, name : "FART"); 
    } else {
        let item = a.data.items.find(i => i.name === "Vampiric Touch Attack" && i.type === "weapon")
        a.deleteOwnedItem(item._id)
    };
})();
