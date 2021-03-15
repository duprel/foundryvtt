let tokenid = game.combat.current.tokenId;
let actorID = game.combat.turns.find(a => a.token._id == tokenid);
let actorName = actorID.token.actorData.name
let wisS = actorID.actor.data.data.abilities.wis.save
let save = new Roll("d20 +@wSave", { wSave: wisS });
save.roll().toMessage({ flavor: `${actorName}'s Wisdom Save` });