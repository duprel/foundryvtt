if (args[0] === "on") {
    new Dialog({
        title: "Choose location familiarity",
        buttons: {
            one: {
                label: "Permanent Circle",
                callback: () => {
                    const table = game.tables.entities.find(t => t.name === "Teleport: Permanent Circle");
                    table.draw();
                }
            },
            two: {
                label: "Associated Object",
                callback: () => {
                    const table = game.tables.entities.find(t => t.name === "Teleport: Associated Object");
                    table.draw();
                }
            },
            three: {
                label: "Very Familiar",
                callback: () => {
                    const table = game.tables.entities.find(t => t.name === "Teleport: Very Familiar");
                    table.draw();
                }
            },
            four: {
                label: "Seen Casually",
                callback: () => {
                    const table = game.tables.entities.find(t => t.name === "Teleport: Seen Casually");
                    table.draw();
                }
            },
            five: {
                label: "Viewed Once",
                callback: () => {
                    const table = game.tables.entities.find(t => t.name === "Teleport: Viewed Once");
                    table.draw();
                }
            },
            six: {
                label: "Description",
                callback: () => {
                    const table = game.tables.entities.find(t => t.name === "Teleport: Description");
                    table.draw();
                }
            },
            seven: {
                label: "False Destination",
                callback: () => {
                    const table = game.tables.entities.find(t => t.name === "Teleport: False Destination");
                    table.draw();
                }
            }
        }
    }).render(true);
}