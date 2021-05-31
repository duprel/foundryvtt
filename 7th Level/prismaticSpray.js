//DAE item macro

(async () => {
    let target = canvas.tokens.get(args[1]);
    if (args[0] == "on") {
        var sprayRoll = new Roll("1d8").roll();
        sprayRoll.toMessage({ flavor: `${target.name}'s roll` })
        switch (sprayRoll.total) {
            case 1:
                ChatMessage.create({ content: "Red Ray!" });
                break;
            case 2:
                ChatMessage.create({ content: "Orange Ray!" });
                break;
            case 3:
                ChatMessage.create({ content: "Yellow Ray!" });
                break;
            case 4:
                ChatMessage.create({ content: "Green Ray!" });
                break;
            case 5:
                ChatMessage.create({ content: "Blue Ray!" });
                break;
            case 6:
                ChatMessage.create({ content: "Indigo Ray!" });
                break;
            case 7:
                ChatMessage.create({ content: "Violet Ray!" });
                break;
            case 8:
                ChatMessage.create({ content: "Multiple Rays! Ignore this result if rolled again." });
                break;
        };
    console.log("#####: ", target, sprayRoll.total);
    };
})();


