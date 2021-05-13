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
        if (s_actor?.data.items.find(i => i.name === "Branding Smite") === undefined) {
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
                title: "Branding Smite: Usage Configuration",
                content: `
        <form id="smite-use-form">
            <p>` + game.i18n.format("DND5E.AbilityUseHint", { name: "Branding Smite", type: "spell" }) + `</p>
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
                const flavor = `Macro Divine Smite - ${game.i18n.localize("DND5E.DamageRoll")} (${game.i18n.localize("DND5E.DamagePiercing")})`;
                let damageRoll = new Roll(`${numDice}d6[radiant]`).roll();
                new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "radiant", [target], damageRoll, { flavor: "Branding Smite - Damage Roll (Radiant)" })
            })

            if (consume) {
                let objUpdate = new Object();
                objUpdate['data.spells.spell' + slotLevel + '.value'] = chosenSpellSlots.value - 1;
                actor.update(objUpdate);
            }
        }

            let target = Array.from(game.user.targets)[0];;
            target.update({
    "dimLight": 5, "lightColor": "#f8c377", "lightAlpha": 0.5, "lightAnimation": { type: "pulse", speed: 2, intensity: 2 } });
        if (game.cub.hasCondition("Invisible", [...game.user.targets])) {
            game.cub.removeCondition("Invisible", [...game.user.targets], { allowDuplicates: false, replaceExisting: false });
        }
           
    }
    

})();