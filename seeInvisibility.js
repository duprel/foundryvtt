//The spell has to expire for sees invisible to be toggled off. Otherwise the effect must be deleted on the character sheet (not toggled) 
(async () => {
    let a = canvas.tokens.controlled[0];
    if (args[0] === "on") {
        if (canvas.tokens.controlled.length != 1) {
            ui.notifications.error("Please select a single token.");
            return;
        };
        await a.update({ "flags.conditional-visibility.seeinvisible": true });
    } else {
        await a.update({ "flags.conditional-visibility.seeinvisible": false });
    };
})();