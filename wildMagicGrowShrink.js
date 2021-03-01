(async () => {
    let surge = new Roll(`d10`).roll();
    if (surge._total % 2 == 0) {
        var messageContent = "You grow " + surge._total + " inch(es)"
    } else {
        var messageContent = "You shrink " + surge._total + " inch(es)"
    };
    surge.toMessage({});
    var chatData = { content: messageContent };
    ChatMessage.create(chatData, {});
})();