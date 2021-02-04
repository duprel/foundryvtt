//Cast spell, apply concentration and WS Effect
//effect: if on, do nothing
//Makea an attack roll, if hit cancel effect
//effect, if off run macro for damage

//Macro for damage
//do psychic damage, check for crit
//make wisdom save of become frightened

(() => {
    if (args[0] === "on") {
        return;
    } else {
        //Configurable variables
        let maxSpellSlot = 6; //  Highest spell-slot level that may be used.
        let affectedCreatureTypes = ["xxx"]; //  Creature types that take extra damage.

        // Use token selected, or default character for the Actor if none is.
        let s_actor = canvas.tokens.controlled[0]?.actor || game.user.character;

        // Verifies if the actor can smite.
        if (s_actor?.data.items.find(i => i.name === "Searing Smite") === undefined) {
            return ui.notifications.error(`No valid actor selected that can use this macro.`);
        }

        let confirmed = false;
        if (hasAvailableSlot(s_actor)) {

            //Get options for available slots
            let optionsText = "";
            for (let i = 1; i < maxSpellSlot; i++) {
                const slots = getSpellSlots(s_actor, i);

                const level = CONFIG.DND5E.spellLevels[i];
                const label = game.i18n.format('DND5E.SpellLevelSlot', { level: level, n: slots.value });
                optionsText += `<option value="${i}">${label}</option>`;

            }

            // Create a dialogue box to select spell slot level to use when smiting.
            new Dialog({
                title: "Searing Smite: Usage Configuration",
                content: `
        <form id="smite-use-form">
            <p>` + game.i18n.format("DND5E.AbilityUseHint", { name: "Searing Smite", type: "spell" }) + `</p>
            <div class="form-group">
                <label>Spell Slot Level</label>
                <div class="form-fields">
                    <select name="slot-level">` + optionsText + `</select>
                </div>
            </div>

            <div class="form-group">
                <label class="checkbox">
                <input type="checkbox" name="consumeCheckbox"/>` + game.i18n.localize("DND5E.SpellCastConsume") + `</label>
            </div>

            <div class="form-group">
                <label class="checkbox">
                <input type="checkbox" name="criticalCheckbox"/>` + game.i18n.localize("DND5E.CriticalHit") + "?" + `</label>
            </div>
        </form>
        `,
                buttons: {
                    one: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "SMITE!",
                        callback: () => confirmed = true
                    },
                    two: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => confirmed = false
                    }
                },
                default: "Cancel",
                close: html => {
                    if (confirmed) {
                        const slotLevel = parseInt(html.find('[name=slot-level]')[0].value);
                        const criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        const consumeSlot = html.find('[name=consumeCheckbox]')[0].checked;
                        smite(s_actor, slotLevel, criticalHit, consumeSlot);
                    }
                }
            }).render(true);

        } else {
            return ui.notifications.error(`No spell slots available to use this feature.`);
        }

        /**
         * Gives the spell slot information for a particular actor and spell slot level.
         * @param {Actor5e} actor - the actor to get slot information from.
         * @param {integer} level - the spell slot level to get information about. level 0 is deprecated.
         * @returns {object} contains value (number of slots remaining), max, and override.
         */
        function getSpellSlots(actor, level) {
            return actor.data.data.spells[`spell${level}`];
        }

        /**
         * Returns whether the actor has any spell slot left.
         * @param {Actor5e} actor - the actor to get slot information from.
         * @returns {boolean} True if any spell slots of any spell level are available to be used.
         */
        function hasAvailableSlot(actor) {
            for (let slot in actor.data.data.spells) {
                if (actor.data.data.spells[slot].value > 0) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Use the controlled token to smite the targeted token.
         * @param {Actor5e} actor - the actor that is performing the action.
         * @param {integer} slotLevel - the spell slot level to use when smiting.
         * @param {boolean} criticalHit - whether the hit is a critical hit.
         * @param {boolean} consume - whether to consume the spell slot.
         */
        function smite(actor, slotLevel, criticalHit, consume) {
            let targets = game.user.targets;
            let chosenSpellSlots = getSpellSlots(actor, slotLevel);


            if (targets.size !== 1) {
                ui.notifications.error("You must target exactly one token to Smite.");
                return;
            }

            targets.forEach(target => {
                let numDice = slotLevel;
                let type = target.actor.data.data.details.type?.toLocaleLowerCase();
                if (affectedCreatureTypes.includes(type)) numDice += 1;
                if (criticalHit) numDice *= 2;
                const flavor = `Macro Divine Smite - ${game.i18n.localize("DND5E.DamageRoll")} (${game.i18n.localize("DND5E.DamageFire")})`;
                let damageRoll = new Roll(`${numDice}d6[fire]`).roll();
                new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "fire", [target], damageRoll, { flavor: "Searing Smite - Damage Roll (Piercing)" })
            })

            if (consume) {
                let objUpdate = new Object();
                objUpdate['data.spells.spell' + slotLevel + '.value'] = chosenSpellSlots.value - 1;
                actor.update(objUpdate);
            }
        }
        var spellDC = args[1];
        game.cub.addCondition("OnFire", [...game.user.targets], { allowDuplicates: false, replaceExisting: false });
        var recipients = [];
        let alertData = { label: "" },
            dialogContentlabel = `<div><span style="flex:1">Alert name: <input name="label" style="width:350px"value="Searing Smite DoT"/></span></div>`, //text box for inputting alert name
            dialogContentpublic = `<label>Public?</label><input type="checkbox" name="public">`, //checkbox for determining if the message should be public
            dialogContentowner = `<label>To owner?</label><input type="checkbox" name="owner">`, //checkbox for determining if the message should sent to the owner of the token
            dialogContentid = `<label>On selected tokens turn?</label><input type="checkbox" name="id" checked>`, //checkbox for determining where in the turn order alert is created
            dialogContentmessage = `<div><span style="flex:1">Message: <input name="message" style="width:350px" value="Roll a CON save DC: ${spellDC}"/></span></div>`, //text box for inputting end message
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
                                myDuration = html.find("[name=duration]")[0].value,         //'' '' duration '' '' '' ''
                                isPublic = html.find("[name=public]")[0].checked,            //creates Boolean if public checkbox is checked
                                toOwner = html.find("[name=owner]")[0].checked,              //'' '' '' to owner '' '' ''
                                selectedTurnid = html.find("[name=id]")[0].checked;                  //'' '' '' id '' '' ''
                            alertData.label = "Searing Smite DoT";    //changes the label of alertData
                            alertData.round = 1;          //set the rounds until the repeating alert triggers
                            alertData.repeating = {
                                frequency: parseInt(myFrequency),    //sets the frequency
                                expire: parseInt(myDuration),        //sets the duration
                                expireAbsolute: false                //makes the alert ends a number of rounds after it was created, rather than a specific turn
                            };
                            alertData.roundAbsolute = false; //sets round absolute as false, meaning the alert triggers a number of rounds after it was created
                            var test1 = Array.from(game.user.targets)[0];
                            alertData.turnId = game.combat.turns.find(turn => turn.tokenId === test1.data._id)._id;
                            alertData.message = myMessage; //sets the message
                            alertData.macro = "Searing Smite DoT Roll";   //sets the macro to be triggered on end, null for none
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
       
    }


})();