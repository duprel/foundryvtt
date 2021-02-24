//This macro only works for the players, not GM!!!
(async () => {
    function getSpellSlots(actor, level) {
        return actor.data.data.spells[`spell${level}`];
    }
    let confirmed = false;
    let s_actor = game.user.character;
    console.log("####################", s_actor)
    let maxSpellSlot = 10;
    let optionsText = "";
    for (let i = 1; i < maxSpellSlot; i++) {
        const slots = getSpellSlots(s_actor, i);
        const level = CONFIG.DND5E.spellLevels[i];
        const label = game.i18n.format('DND5E.SpellLevelSlot', { level: level, n: slots.value });
        optionsText += `<option value="${i}">${label}</option>`;
    }
    new Dialog({
        title: "Sleep: Usage Configuration",
        content: `
        <form id="sleep-use-form">
            <p>` + game.i18n.format("DND5E.AbilityUseHint", { name: "Sleep", type: "spell" }) + `</p>
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
        </form>
        `,
        buttons: {
            one: {
                icon: '<i class="fas fa-check"></i>',
                label: "SLEEP!",
                callback: () => confirmed = true
            }
        },
        default: "SLEEP!",
        close: html => {
            const slotLevel = parseInt(html.find('[name=slot-level]')[0].value);
            var numDice = slotLevel * 2 + 3;
            new Roll(`${numDice}d8`).roll().toMessage({ flavor: "Sleep: HP affected" });
            const consumeSlot = html.find('[name=consumeCheckbox]')[0].checked;
        }
    }).render(true);
})();