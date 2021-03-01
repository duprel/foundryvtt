(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let contrChar = canvas.tokens.controlled[0];
    contrChar.update({ "flags.conditional-visibility.seeinvisible": true });
})();