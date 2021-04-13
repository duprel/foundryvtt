(async () => {
    var a = canvas.tokens.controlled[0].actor;
    let changes = {
        data: {
            details: {
                cr: args[0].spellLevel
            },
        }
    };
    new Dialog({
        title: "Choose the Elemental Summoned.",
        buttons: {
            one: {
                label: "Air",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        "Air Elemental",
                        {
                            actorData: changes,
                        },
                    );                       
                }
            },
            two: {
                label: "Earth",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        "Earth Elemental",
                        {
                            actorData: changes,
                        },
                    );
                }
            },
            three: {
                label: "Fire",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        "Fire Elemental",
                        {
                            actorData: changes,
                        },
                    );
                }
            },
            four: {
                label: "Water",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        "Water Elemental",
                        {
                            actorData: changes,
                        },
                    );
                }
            }
        }
    }).render(true);
})();