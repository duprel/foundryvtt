(async () => {
    //functions
    function setDamageType(rollTotal) {
        switch (rollTotal) {
            case 1:
                var dType = "acid";
                break;
            case 2:
                var dType = "cold";
                break;
            case 3:
                var dType = "fire";
                break;
            case 4:
                var dType = "force";
                break;
            case 5:
                var dType = "lightning";
                break;
            case 6:
                var dType = "poison";
                break;
            case 7:
                var dType = "psychic";
                break;
            case 8:
                var dType = "thunder";
                break;
        };
        return dType;
    };
    function rollTotalDamage(damType, d8Total, targetID, spelllevel, crit) {
        let target = canvas.tokens.objects.children.find(i => i.data._id == targetID);
        if (crit == false) {
            var numDice = spelllevel;
            var damageRoll = new Roll(`${numDice}d6[${damType}] + ${d8Total}`).roll();
        } else {
            var numDice = spelllevel * 2;
            var damageRoll = new Roll(`${numDice}d6[${damType}] + ${d8Total} + 2d8`).roll();
        };
        new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, damType, [target], damageRoll, { flavor: "Chaos Bolt - Damage (" + damType + ")" });
    };
    //end functions
    if (args[0] === "on") {
        let roll1 = new Roll("1d8");
        let roll2 = new Roll("1d8");
        roll1.roll().toMessage();
        roll2.roll().toMessage();
        var totalD8Roll = (roll1.total + roll2.total);
        let damType1 = setDamageType(roll1.total);
        let damType2 = setDamageType(roll2.total);
        if (roll1.total != roll2.total) {
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
                        label: damType1,
                        callback: (html) => {
                            let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                            rollTotalDamage(damType1, totalD8Roll, args[1], args[2], criticalHit);
                        }

                    },
                    two: {
                        label: damType2,
                        callback: (html) => {
                            let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                            rollTotalDamage(damType2, totalD8Roll, args[1], args[2], criticalHit);
                        }
                    }
                }
            }).render(true);
        } else {
            new Dialog({
                title: "Doubles rolled! Atttack again! Critical Attack?",
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
                        label: damType1,
                        callback: (html) => {
                            let criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
                            rollTotalDamage(damType1, totalD8Roll, args[1], args[2], criticalHit);
                        }
                    }
                }
            }).render(true);
        };
    } else {
        return;
    };
})();