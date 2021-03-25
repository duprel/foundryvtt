//args[1] = @damage
(async () => {
    if (args[0] === "on") {
        if (canvas.tokens.controlled.length != 1) {
            ui.notifications.error("Please select a single token.");
            return;
        }
        var a = canvas.tokens.controlled[0].actor;
        var currHP = a.data.data.attributes.hp.value;
        var maxHP = a.data.data.attributes.hp.max;
        if (currHP >= maxHP) {
            ui.notifications.info("Character is at Max HP.");
            return;
        } else {
            let healing = Math.floor(args[1] / 2);
            currHP = currHP + healing;
            if (currHP >= maxHP) {
                a.update({ "data.attributes.hp.value": maxHP });
            } else {
                a.update({ "data.attributes.hp.value": currHP });
            };
        };   
    }    
})();