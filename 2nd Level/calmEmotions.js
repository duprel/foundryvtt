(async () => {
    let toggleCondition = async function (tokenArr, effectName) {
        var effect = tokenArr.actor.effects.entries;
        for (let i = 0; i < effect.length; i++) {
            let condition = effect[i].data.label;
            let effect_id = effect[i].data._id;
            let status = effect[i].data.disabled;
            if ((condition === effectName) && (status === undefined || status === false)) {
                await token.actor.updateEmbeddedEntity("ActiveEffect", { "_id": effect_id, "disabled": true });
            }//end if statement
            if ((condition === effectName) && (status === true)) {
                await token.actor.updateEmbeddedEntity("ActiveEffect", { "_id": effect_id, "disabled": false });
            }//end if statement
        }//end for loop
    }//end function
    var tokenID = args[1].tokenId;
    var token = canvas.tokens.get(tokenID);
    await toggleCondition(token, "Charmed");
    await toggleCondition(token, "Frightened");
})();