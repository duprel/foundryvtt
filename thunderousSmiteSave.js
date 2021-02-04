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
        let strS = target.actor.data.data.abilities.str.save;
        let save = new Roll("d20 +@sSave", { sSave: strS });
        save.roll().toMessage({ flavor: `${actorName}'s Strength save` });
        if (args[1] > save.total) {
            var messageContent = "FAILED: ${actorName} is pushed back 10 feet and knocked prone!";
            game.cub.addCondition("Prone", [...game.user.targets]);
        } else {
            var messageContent = "PASSED";
        };
        var chatData = { content: messageContent };
        ChatMessage.create(chatData, {});
        game.cub.removeCondition("Concentrating");
    }    
}) ();