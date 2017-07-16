$(document).ready(function() {
    mpane       .init();
    doccover    .init();
    filterpane  .init();

    content     .init();
});

/**
 * How many entries to show on a single page.
 */
const ENTRIES_PER_PAGE = 10;

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

        /**
         * The list with actual content. Is inside the layer.
         */
        list: undefined,
    },

    /**
     * An array of debate rounds basic information.
     */
    data: undefined,
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

    // Set initial state.
    this.clean();
};

/**
 * Append new debate round information.
 */
content.roundsdivctrl.append = function() {
    this.list.innerHTML += "<li class='listblockli'>";
    this.list.innerHTML += "<span class='listblocklidateday'>";
    this.list.innerHTML += "24"; // TODO
    this.list.innerHTML += "</span>";
    this.list.innerHTML += "<span class='listblocklidatemon'>";
    this.list.innerHTML += "07/17"; // TODO
    this.list.innerHTML += "</span>";
    this.list.innerHTML += "<div class='listblocklidata>'";
    this.list.innerHTML += "<p>";
    this.list.innerHTML += "Якийсь опис дебатного раунду"; // TODO
    this.list.innerHTML += "</p></div></li>";
};

/**
 * Delete all the displayed rounds from the layer leaving empty round list.
 */
content.roundsdivctrl.clean = function() {
    // Create list with information.
    this.div.innerHTML = "<ul id='roundsdivul' class='listblock'></ul>"
    this.list = document.getElementById("roundsdivul");
};

/**
 * Set the data about debate rounds.
 */
content.setData = function(data) {
    this.data = data;
};

/**
 * Show the page with a given number. If the number is too big, the last
 * page will be shown.
 */
content.showPage = function(pagenum) {
    var data = this.pageData(pagenum);
    for (var i = 0; i < ENTRIES_PER_PAGE; i++) {
        // TODO
    }
};

/**
 * Return individual page data. The array of entries to be shown.
 */
content.pageData = function(pagenum) {
    // TODO
};

/**
 * Get amount of individual pages that can be shown.
 */
content.pageCount = function() {
    if (data === undefined) {
        return 0;
    } else {
        return data.length() / ENTRIES_PER_PAGE;
    }
};
