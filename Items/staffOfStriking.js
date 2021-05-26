function smite(actor, slotLevel, criticalHit) {
    let targets = game.user.targets;
    if (targets.size !== 1) {
        ui.notifications.error("You must target exactly one token to Smite.");
        return;
    }
    targets.forEach(target => {
        let numDice = slotLevel;
        if (criticalHit) numDice *= 2;
        const flavor = `Staff of Striking - ${game.i18n.localize("DND5E.DamageRoll")} (${game.i18n.localize("DND5E.DamageForce")})`;
        let damageRoll = new Roll(`${numDice}d6[force]`).roll();
        new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "force", [target], damageRoll, { flavor: "Staff of Striking - Damage Roll (Force)" })
    })
}


let s_actor = game.actors.get(args[0].actorId);
let confirmed = false;
let optionsText = "";
for (let i = 1; i < 4; i++) {
    optionsText += `<option value="${i}">${i}</option>`;
}
new Dialog({
    title: "Staff of Striking: Usage Configuration",
    content: `
        <form id="smite-use-form">
            <p>` + game.i18n.format("DND5E.AbilityUseHint", { name: "Staff of Striking", type: "spell" }) + `</p>
            <div class="form-group">
                <label>Charges Used</label>
                <div class="form-fields">
                    <select name="slot-level">` + optionsText + `</select>
                </div>
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
            smite(s_actor, slotLevel, criticalHit);
        }
    }
}).render(true);