(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    } 
    let t = canvas.tokens.controlled[0];
    let actorName = t.actor.data.name;
    let steSkill = t.actor.data.data.skills.ste.mod;
    let steRoll = new Roll("d20 + @sS", { sS: steSkill });
    steRoll.roll().toMessage({ flavor: `${actorName}'s Stealth check` });
    let steTotal = steRoll.total;
    ConditionalVisibility.toggleHide(canvas.tokens.controlled, steTotal)
})();
