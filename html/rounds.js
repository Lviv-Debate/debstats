$(document).ready(function() {
    mpane       .init();
    doccover    .init();
    filterpane  .init();

    content     .init();
});

/**
 * A content controller.
 */
var content = {

    /**
     * DIV controller that contains the rounds statistics data.
     */
    roundsdivctrl: {

        /**
         * The DIV with actual content.
         */
        div: undefined,
    },
};

/**
 * Function to initialize content controller.
 */
content.init = function() {
    this.roundsdivctrl.init();
};

/**
 * Function to initialize rounds statistic DIV controller.
 */
content.roundsdivctrl.init = function() {
    this.div = document.getElementById("roundsdiv");
};

/**
 * Set the data about debate rounds.
 */
content.setData = function(data) {
    // TODO
};

/**
 * Show the page with a given number. If the number is too big, the last
 * page will be shown.
 */
content.showPage = function(pagenum) {
    // TODO
};

/**
 * Get amount of individual pages that can be shown.
 */
content.pageCount = function() {
    // TODO
};
