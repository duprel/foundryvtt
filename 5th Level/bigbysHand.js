(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    var a = canvas.tokens.controlled[0].actor;
    if (args[1] == 5) {
        var hand = "Bigby's Hand 5";
    } else if (args[1] == 6) {
        var hand = "Bigby's Hand 6";
    } else if (args[1] == 7) {
        var hand = "Bigby's Hand 7";
    } else if (args[1] == 8) {
        var hand = "Bigby's Hand 8";
    } else {
        var hand = "Bigby's Hand 9";
    };
    if (args[0] === "on") {
        let maxHP = a.data.data.attributes.hp.max;
        let intValue = a.data.data.abilities.int.value;
        let CR = a.data.data.details.level;
        let changes = {
            data: {
                attributes: {
                    hp: {
                        max: maxHP, value: maxHP
                    }
                },
                abilities: {
                    int: {
                        value: intValue
                    }
                },
                details: {
                    cr: CR
                },
            }
        };
        await Summoner.placeAndSummon(
            a,
            hand,
            {
                actorData: changes,
            },
        );
    } else {
        await Summoner.dismiss(hand);
    };
})();