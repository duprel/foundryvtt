(async () => {
//DAE Macro Execute, Effect Value = "Macro Name" @target

/**
 * For each target, the GM will have to choose 
 */
let target = canvas.tokens.get(args[1]);
let originalSize = target.data.width;
let mwak = target.actor.data.data.bonuses.mwak.damage;

if (args[0] === "on") {
    new Dialog({
        title: "Enlarge or Reduce",
        buttons: {
            one: {
                label: "Enlarge",
                callback: () => {
                    let bonus = mwak + " 1d4";
                    let enlarge = (originalSize + 1);
                    target.actor.update({ "data.bonuses.mwak.damage": bonus });
                    target.update({ "width": enlarge, "height": enlarge });
                    target.actor.setFlag('world', 'enlageReduceSpell', {
                        size: originalSize,
                        ogMwak: mwak,
                    });
                    ChatMessage.create({ content: target.name + " is enlarged" });
                }
            },
            two: {
                label: "Reduce",
                callback: () => {
                    let bonus = mwak + " -1d4";
                    let size = originalSize;
                    let newSize = (size > 1) ? (size - 1) : (size - 0.3);
                    target.actor.update({ "data.bonuses.mwak.damage": bonus });
                    target.update({ "width": newSize, "height": newSize });
                    target.actor.setFlag('world', 'enlageReduceSpell', {
                        size: originalSize,
                        ogMwak: mwak,
                    });
                    ChatMessage.create({ content: target.name + " is reduced" });
                }
            },
        }
    }).render(true);
}
if (args[0] === "off") {
    let flag = target.actor.getFlag('world', 'enlageReduceSpell');
    target.actor.update({ "data.bonuses.mwak.damage": flag.ogMwak });
    target.update({ "width": flag.size, "height": flag.size });
    target.actor.unsetFlag('world', 'enlageReduceSpell');
    ChatMessage.create({ content: target.name + " is returned to normal size" });
}
})();