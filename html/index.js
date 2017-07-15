var serverData;

$(document).ready(function() {
    mpane       .init();
    doccover    .init();
    filterpane  .init();

    serverData = getServerData();

    mpane.trySetUserElem(serverData.username);
});

/**
 * Retrieve dynamic page data from the server.
 */
function getServerData() {
    // TODO
    return {
        peopleCount     : 32,
        username        : undefined,
    };
}
