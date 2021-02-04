(async () => {
if (args[0] === "on") {
game.cub.addCondition(["Prone", "Incapacitated"], [...game.user.targets], {allowDuplicates: false, replaceExisting: false});
let spellDC = args[1];
var recipients = [];
        let alertData = { label: "" },
            dialogContentlabel = `<div><span style="flex:1">Alert name: <input name="label" style="width:350px"value="Tasha's Hideous Laughter"/></span></div>`, //text box for inputting alert name
            dialogContentpublic = `<label>Public?</label><input type="checkbox" name="public">`, //checkbox for determining if the message should be public
            dialogContentowner = `<label>To owner?</label><input type="checkbox" name="owner">`, //checkbox for determining if the message should sent to the owner of the token
            dialogContentid = `<label>On selected tokens turn?</label><input type="checkbox" name="id" checked>`, //checkbox for determining where in the turn order alert is created
            dialogContentmessage = `<div><span style="flex:1">Message: <input name="message" style="width:350px" value="Roll a Wisdom save DC: ${spellDC}"/></span></div>`, //text box for inputting end message
            dialogContentfrequency = `<div><span style="flex:1">Frequency: <input name="frequency" style="width:350px" value="1"/></span></div>`, //text box for inputting frequency, 1 for every round, 2 for every other, etc
            dialogContentduration = `<div><span style="flex:1">Duration: <input name="duration" style="width:350px"/></span></div>`, //text box for inputting duration
            d = new Dialog({                                                            //*
                title: "Enter spell name",                                                  //*
                content: dialogContentlabel + dialogContentpublic + dialogContentowner +    //*
                    dialogContentid + dialogContentmessage + dialogContentfrequency +           //*
                    dialogContentduration,                                                      //*
                buttons: {                                                                  //*
                    done: {                                                                 //*
                        label: "Confirm",                                                   //creating and defining the dialog
                        callback: (html) => {
                            let myLabel = html.find("[name=label]")[0].value,               //assigns the name based on input text
                                myMessage = html.find("[name=message]")[0].value,            //'' '' message '' '' '' ''
                                myFrequency = html.find("[name=frequency]")[0].value,       //'' '' frequency '' '' '' ''
                                myDuration = html.find("[name=duration]")[0].value,         //'' '' duration '' '' '' ''turns
                                isPublic = html.find("[name=public]")[0].checked,            //creates Boolean if public checkbox is checked
                                toOwner = html.find("[name=owner]")[0].checked,              //'' '' '' to owner '' '' ''
                                selectedTurnid = html.find("[name=id]")[0].checked;                  //'' '' '' id '' '' ''
                            alertData.label = "Tasha's Hideous Laughter";    //changes the label of alertData
                            alertData.round = 1;          //set the rounds until the repeating alert triggers
                            alertData.repeating = {
                                frequency: parseInt(myFrequency),    //sets the frequency
                                expire: parseInt(myDuration),        //sets the duration
                                expireAbsolute: false                //makes the alert ends a number of rounds after it was created, rather than a specific turn
                            };
                            alertData.roundAbsolute = false; //sets round absolute as false, meaning the alert triggers a number of rounds after it was created
                            var test1 = Array.from(game.user.targets)[0];
                            alertData.turnId = game.combat.turns.find(turn => turn.tokenId === test1.data._id)._id;
                            alertData.endOfTurn = false;
                            alertData.message = myMessage; //sets the message
                            alertData.macro = "rollWisdomSave";   //sets the macro to be triggered on end, null for none
                            recipients = recipients.concat(game.users.filter((u) => u.isGM).map((u) => u.data._id)); //adds the GM to the list of recipients
                            if (toOwner) {
                                recipients = recipients.concat(game.users.filter(u => token.actor.hasPerm(u, CONST.ENTITY_PERMISSIONS.OWNER)).map((u) => u.data._id)); //adds the owner to recipients if to owner checked
                            }
                            if (isPublic) {
                                recipients = []; //clears recipients if public is checked, sending the message to everyone.
                            }
                            alertData.recipientIds = recipients; //adds all the recipients to the alertData object
                            TurnAlert.create(alertData); //creates the alert
                        }
                    },
                },
                default: "done"
            });
        d.render(true);
    } else {
        let cToken = canvas.tokens.controlled[0];
        game.cub.removeCondition("Incapacitated", token);
        let tArr = Object.values(game.combat.data.flags.turnAlert.alerts);
        let tObj = tArr.find(l => l.label == "Tasha's Hideous Laughter");
        let combatID = tObj.combatId;
        let alertID = tObj.id;
        TurnAlert.delete(combatID, alertID);
    }
})();