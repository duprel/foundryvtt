//args[1] = spell level
(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let a = canvas.tokens.controlled[0].actor;
    if (args[0] === "on") {
        let itemData = await game.items.find(i => i.name == "Vampiric Touch Attack");
        await a.createOwnedItem(itemData);
        let newItem = await a.items.find(i => i.name == "Vampiric Touch Attack");
        let diceNum = args[1];
        let diceRoll = diceNum + "d8";
        let copyWeapon = duplicate(newItem);
        var damageDice = copyWeapon.data.damage.parts;
        damageDice.pop();
        damageDice.push([diceRoll, "necrotic"]);
        await a.updateEmbeddedEntity("OwnedItem", copyWeapon);
    } else {
        let item = a.data.items.find(i => i.name === "Vampiric Touch Attack" && i.type === "weapon");
        a.deleteOwnedItem(item._id);
    };
})();