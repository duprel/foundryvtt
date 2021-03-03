(async () => {
    let surge = new Roll(`d10`).roll();
    if (surge._total % 2 == 0) {
        var messageContent = "You grow " + surge._total + " year(s) older!"
    } else {
        var messageContent = "You grow " + surge._total + " year(s) younger!"
    };
    surge.toMessage({});
    var chatData = { content: messageContent };
    ChatMessage.create(chatData, {});
})();