(async () => {
    async function witheringDamage(crit, target) {
        if (crit === false) {
            var numDice = 2;
        };
        if (crit === true) {
            var numDice = 4;
        };
        var damageRoll = new Roll(`${numDice}d10[necrotic]`).roll();
        new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "necrotic", [target], damageRoll, { flavor: "Staff of Withering - Damage (necrotic)" });
        
    }

    async function saveRoll(target) {
        let save_roll = await target.rollAbilitySave('con', { chatMessage: true, fastForward: true });
        console.log("#######:     ", save_roll);
        if (save_roll._total < 15) {
            console.log("#######:FART");
            target.update({ "flags.midi-qol.disadvantage.ability.check.str": 1 });
            target.update({ "flags.midi-qol.disadvantage.ability.save.str": 1 });
            target.update({ "flags.midi-qol.disadvantage.ability.check.con": 1 });
            target.update({ "flags.midi-qol.disadvantage.ability.save.con": 1 });
        };
        if (save_roll._total >= 15) {
            return;
        };

    }
    let t = canvas.tokens.get(args[1]);
    if (args[0] === "on") {
        await new Dialog({
            title: "Use Staff of Withering charge?",
            content: `
        <form id="smite-use-form">
            <div class="form-group">
                <label class="checkbox">
                <input type="checkbox" name="criticalCheckbox"/>` + game.i18n.localize("DND5E.CriticalHit") + "?" + `</label>
            </div>
        </form>
        `,
            buttons: {
                one: {
                    label: "Yes",
                    callback: (html) => {
                        let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        witheringDamage(criticalHit, t.actor);
                        saveRoll(t.actor);                        
                    }
                },
                two: {
                    label: "No",
                    callback: (html) => {
                        return;
                    }
                }
            }
        }).render(true);
    };
    if (args[0] === "off") {
        t.actor.update({ "flags.midi-qol.disadvantage.ability.check.str": 0 });
        t.actor.update({ "flags.midi-qol.disadvantage.ability.save.str": 0 });
        t.actor.update({ "flags.midi-qol.disadvantage.ability.check.con": 0 });
        t.actor.update({ "flags.midi-qol.disadvantage.ability.save.con": 0 });
    };
})();
