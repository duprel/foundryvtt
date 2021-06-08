//DAE item macro

(async () => {
    let damageRoll = async function (damType, a, tok, tar) {
        let totDam = 0;
        let damage = new Roll(`10d10[${damType}]`).roll();
        let save = await tar.actor.rollAbilitySave('dex', { chatMessage: true, fastForward: true });
        if (save._total >= a.data.data.attr.spelldc) {
            totDam = Math.floor(damage.total/2)
        };
        if (save._total < a.data.data.attr.spelldc) {
            totDam = damage.total
        };
        console.log("###:", save._total, totDam);
        new MidiQOL.DamageOnlyWorkflow(a, tok, totDam, damType, [tar], damage, { flavor: `Prismatic Spray (${damage.total}) (${damType}) damage` });
    }


    if (args[0] == "on") {
        let actorD = game.actors.get(token.data.actorId);
        let tokenD = canvas.tokens.get(token.data._id);
        let target = canvas.tokens.get(args[1].tokenId);
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
                    damageRoll("fire", actorD, tokenD, target);
                    ChatMessage.create({ content: "Red Ray!" });
                    break;
                case "O":
                    damageRoll("acid", actorD, tokenD, target);
                    ChatMessage.create({ content: "Orange Ray!" });
                    break;
                case "Y":
                    damageRoll("lightning", actorD, tokenD, target);
                    ChatMessage.create({ content: "Yellow Ray!" });
                    break;
                case "G":
                    damageRoll("poison", actorD, tokenD, target);
                    ChatMessage.create({ content: "Green Ray!" });
                    break;
                case "B":
                    damageRoll("cold", actorD, tokenD, target);
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