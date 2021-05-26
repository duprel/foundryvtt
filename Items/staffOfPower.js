function smite(actor, criticalHit) {
    let targets = game.user.targets;
    if (targets.size !== 1) {
        ui.notifications.error("You must target exactly one token to Smite.");
        return;
    }

    targets.forEach(target => {
        let numDice = 1;
        if (criticalHit) numDice *= 2;
        const flavor = `Power Smite - ${game.i18n.localize("DND5E.DamageRoll")} (${game.i18n.localize("DND5E.DamageForce")})`;
        let damageRoll = new Roll(`${numDice}d6[force]`).roll();
        new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "force", [target], damageRoll, { flavor: "Power Smite - Damage Roll (Force)" })
    })
}

let confirmed = false;
let s_actor = game.actors.get(args[0].actorId);
new Dialog({
    title: "Power Smite: Usage Configuration",
    content: `
        <form id="smite-use-form">
            <p>` + game.i18n.format("DND5E.AbilityUseHint", { name: "Power Smite", type: "spell" }) + `</p>
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
            const criticalHit = html.find('[name=criticalCheckbox]')[0].checked;
            smite(s_actor, criticalHit);
        }
    }
}).render(true);