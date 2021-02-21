(async () => {
    async function rollTotalDamage(damType, targetID, spelllevel, crit) {
        let target = canvas.tokens.objects.children.find(i => i.data._id == targetID);
        if (crit == false) {
            var numDice = spelllevel + 2;
            var damageRoll = new Roll(`${numDice}d8[${damType}]`).roll();
        } else {
            var numDice = (spelllevel + 2) * 2;
            var damageRoll = new Roll(`${numDice}d8[${damType}]`).roll();
        };
        new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, damType, [target], damageRoll, { flavor: "Chromatic Orb - Damage (" + damType + ")" });
    };
    if (args[0] === "on") {
        new Dialog({
            title: "Choose elemental damage type",
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
                    label: "Acid",
                    callback: (html) => {
                        let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        rollTotalDamage("acid", args[1], args[2], criticalHit);
                    }
                },
                two: {
                    label: "Cold",
                    callback: (html) => {
                        let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        rollTotalDamage("cold", args[1], args[2], criticalHit);
                    }
                },
                 three: {
                    label: "Fire",
                    callback: (html) => {
                        let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        rollTotalDamage("fire", args[1], args[2], criticalHit);
                    }
                },
                four: {
                    label: "Lightning",
                    callback: (html) => {
                        let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        rollTotalDamage("lightning", args[1], args[2], criticalHit);
                    }
                },
                five: {
                    label: "Poison",
                    callback: (html) => {
                        let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        rollTotalDamage("poison", args[1], args[2], criticalHit);
                    }
                },
                six: {
                    label: "Thunder",
                    callback: (html) => {
                        let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                        rollTotalDamage("thunder", args[1], args[2], criticalHit);
                    }
                }
            }
        }).render(true);
    } else {
        return;
    };
})();