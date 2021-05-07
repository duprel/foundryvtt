let t = Array.from(game.user.targets)[0];
if (game.cub.hasCondition("Blinded", t)) {
    await game.cub.removeCondition("Blinded", t);
};
if (game.cub.hasCondition("Deafened", t)) {
    await game.cub.removeCondition("Deafened", t);
};
if (game.cub.hasCondition("Paralyzed", t)) {
    await game.cub.removeCondition("Paralyzed", t);
};
if (game.cub.hasCondition("Poisoned", t)) {
    await game.cub.removeCondition("Poisoned", t);
};