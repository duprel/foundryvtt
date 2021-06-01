//DAE item macro

(async () => {
    let damageRoll = async function (damType, a, tok, tar) {
        let damage = new Roll(`10d10[${damType}]`).roll();
        new MidiQOL.DamageOnlyWorkflow(a, tok, damage.total, damType, [tar], damage, { flavor: `Prismatic Spray (${damage}) (${damType}) damage` });
    }


    if (args[0] == "on") {
        let target = canvas.tokens.get(args[0]);
        console.log("###:", args[1]);
        const table = game.tables.entities.find(t => t.name === "Prismatic Spray");
        let r = await table.draw();
        var x;
        if (r.results.length === 1) {
            x = 0
        };
        if (r.results.length > 1) {
            x = 1
        };
        var i;
        for (i = 0; i <= x; i++) {
            let casePoint = r.results[i].text.charAt(0);
            switch (casePoint) {
                case "R":           
                    damageRoll("fire", a, token, target);
                    ChatMessage.create({ content: "Red Ray!" });
                    break;
                case "O":
                    damageRoll("acid", a, token, target);
                    ChatMessage.create({ content: "Orange Ray!" });
                    break;
                case "Y":
                    damageRoll("lightning", a, token, target);
                    ChatMessage.create({ content: "Yellow Ray!" });
                    break;
                case "G":
                    damageRoll("poison", a, token, target);
                    ChatMessage.create({ content: "Green Ray!" });
                    break;
                case "B":
                    damageRoll("cold", a, token, target);
                    ChatMessage.create({ content: "Blue Ray!" });
                    break;
                case "I":
                    ChatMessage.create({ content: "Indigo Ray!" });
                    break;
                case "V":
                    ChatMessage.create({ content: "Violet Ray!" });
                    break;
            };
        };
    };
})();