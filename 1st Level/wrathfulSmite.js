//after hit have target make save
//if passed nothing
//if failed apply frightened condition

(async () => {
    if (game.user.targets.size != 1) {
        ui.notifications.error("Please target a single token.");
        return;
    }
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    if (args[0] === "on") {
        return;
    } else {
        let target = Array.from(game.user.targets)[0];
        let actorName = target.actor.data.name;
        let wisS = target.actor.data.data.abilities.wis.save;
        let save = new Roll("d20 + @wSave", { wSave: wisS });
        save.roll().toMessage({ flavor: `${actorName}'s Wisdom save` });
        if (args[1] > save.total) {
            var messageContent = `FAILED: ${actorName} is frightened!`;
            game.cub.addCondition("Frightened", [...game.user.targets]);
        } else {
            var messageContent = "PASSED";
        };
        var chatData = { content: messageContent };
        ChatMessage.create(chatData, {});
        game.cub.removeCondition("Concentrating");
    }
})();