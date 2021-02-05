//default formatting
(async () => {
    
})();

//send message to chat
var messageContent = "FAILED: Creature is pushed back 10 feet!";
var chatData = { content: messageContent };
ChatMessage.create(chatData, {});

// select only 1 targeted creature

if (game.user.targets.size != 1) {
	ui.notifications.error("Please target a single token.");
        return;
};
let target = Array.from(game.user.targets)[0];
console.log(target);

//CUB add condition
game.cub.addCondition(["Blinded", "Charmed"], [...game.user.targets], { allowDuplicates: true, replaceExisting: true });

//CUB remove condition
game.cub.removeCondition("Concentrating");

//roll a save and add effects/remove concentration
let target = Array.from(game.user.targets)[0];
let actorName = target.actor.data.name;
let wisS = target.actor.data.data.abilities.wis.save;
let save = new Roll("d20 + @wSave", { wSave: wisS });
save.roll().toMessage({ flavor: `${actorName}'s Wisdom save` });
if (args[1] > save.total) {
    var messageContent = "FAILED: ${actorName} is frightened!";
    game.cub.addCondition("Frightened", [...game.user.targets]);
} else {
    var messageContent = "PASSED";
};
var chatData = { content: messageContent };
ChatMessage.create(chatData, {});
game.cub.removeCondition("Concentrating");

//update token (let target = canvas.tokens.get(args[1]); if passed as a DAE parameter)
let target = Array.from(game.user.targets)[0];;
target.update({
    "dimLight": 5, "lightColor": "#f8c377", "lightAlpha": 0.5, "lightAnimation": { type: "pulse", speed: 2, intensity: 2 }
});
