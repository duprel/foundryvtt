//default formatting
(async () => {})();

//base structure for dae on/off
if (args[0] === "on") {} else {};

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
game.cub.addCondition(["Blinded", "Charmed"], [...game.user.targets], { allowDuplicates: false, replaceExisting: false });

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
let target = Array.from(game.user.targets)[0];
target.update({
    "dimLight": 5, "lightColor": "#f8c377", "lightAlpha": 0.5, "lightAnimation": { type: "pulse", speed: 2, intensity: 2 }
});

//toggle effect 
(async () => {
    let toggleCondition = async function (tokenArr, effectName) {
        var effect = tokenArr.actor.effects.entries;
        for (let i = 0; i < effect.length; i++) {
            let condition = effect[i].data.label;
            let effect_id = effect[i].data._id;
            let status = effect[i].data.disabled;
            if ((condition === effectName) && (status === undefined || status === false)) {
                await token.actor.updateEmbeddedEntity("ActiveEffect", { "_id": effect_id, "disabled": true });
            }//end if statement
            if ((condition === effectName) && (status === true)) {
                await token.actor.updateEmbeddedEntity("ActiveEffect", { "_id": effect_id, "disabled": false });
            }//end if statement
        }//end for loop
    }//end function
    var tokenID = args[1].tokenId;
    var token = canvas.tokens.get(tokenID);
    await toggleCondition(token, "Charmed");
    await toggleCondition(token, "Frightened");
})();

//Rolling Dice
let numDice = args[1];
Roll(`${numDice}d4[piercing]`).roll().toMessage({ flavor: "Cloud of Daggers: Piercing damage." });

//to get a token array from the @target parametes passed from DAE
let arr = Array.from(game.user.targets);
let token = arr.find(i => i.data._id == args[1]);

//Find a token by tokeniD passed from dae effect macro
var tokenId = args[1].tokenId;
var token = canvas.tokens.get(tokenId);

//select current controlled token

    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let t = canvas.tokens.controlled[0];


//find turnalert turn id of targeted token
if (game.user.targets.size != 1) {
    ui.notifications.error("Please target a single token.");
    return;
};
let tokenID = Array.from(game.user.targets)[0].data._id;
let turnID = game.combat.combatants.find(i => i.tokenId == tokenID)._id;
console.log("**********", turnID);

//roll dice from a macro called by a macro
(async () => {
    let target = canvas.tokens.objects.children.find(i => i.data._id == args[0]);
    let numDice = 2 + args[1];
    let damageRoll = new Roll(`${numDice}d4[acid]`).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "acid", [target], damageRoll, { flavor: "Acid Arrow - Damage (acid)" });
})();

//summoning that changes the token name and updates disposition, as a item macro end is the length of the string

//item macro

let tName = "Nightmare";
let end = 9;
let aName = actor.data.name;
await Summoner.placeAndSummon(
    actor,
    tName,
);
for (let token of canvas.tokens.placeables) {
    if (token.data.name.substring(0, end) === tName) {
        await token.update({ name: aName + "'s " + tName })
        await token.update({ disposition: '1' })
    }
};

//to pull the actor from the origin of an effect.
let t = canvas.tokens.get(args[1].tokenId);
let regex = /(?<=\.)(.*?)(?=\.)/;
let actID = regex.exec(args[1].origin)[1];
let a = game.actors.get(actID);
