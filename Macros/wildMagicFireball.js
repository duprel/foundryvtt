(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let dc = canvas.tokens.controlled[0].actor.data.data.abilities.cha.dc;
    let surge = new Roll(`8d6[fire]`).roll().toMessage({ flavor: "Wild Magic Surge! 3rd level fireball centered on the caster! DEX save DC: " + dc });
})();