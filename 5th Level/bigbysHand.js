(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    var a = canvas.tokens.controlled[0].actor;
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
        console.log("!####################:         ", changes)
        await Summoner.placeAndSummon(
            a,
            "Bigby's Hand",
            {
                actorData: changes,
            },
        );
    } else {
        await Summoner.dismiss("Bigby's Hand");
    };
})();