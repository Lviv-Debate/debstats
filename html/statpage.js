/*
 * This page programs elements defined in statpage.pug
 */

/**
 * Side panel containing filters.
 */
var filterpane = {

    /**
     * Date pattern dropdown list.
     *
     * Defined after initialization.
     */
    dateDropdown: undefined,

    /**
     * Input element for date to filter entries from.
     *
     * Defined after initialization.
     */
    dateFrom: undefined,

    /**
     * Input element for date to filter elements to.
     *
     * Defined after initialization.
     */
    dateTo: undefined,

    /**
     * Element to select people that are included to statistics.
     *
     * Defined after initialization.
     */
    people: undefined,
};

/**
 * Maximal number of entries in page navigation bar.
 */
const PAGE_NAV_ENTRIES_MAX = 10;

/**
 * Page navigation controller. For pages that do have page navigation bar.
 */
var pagenavctrl = {

    /**
     * Bottom list that contains navigation bar.
     */
    bottoml: undefined,

    /**
     * Top list that contains navigation bar.
     */
    topl: undefined,

    /**
     * Total page count.
     */
    pageCount: 0,

    /**
     * Active page index. Starts from 1. 0 means no active page.
     */
    activePage: 0,

    /**
     * The function that will be called to activate new page.
     */
    callback: function(index) {},
};

/**
 * Function to initialize the structure.
 */
filterpane.init = function() {
    this.dateDropdown   = document.getElementById("filterDateDropdown");
    this.dateFrom       = document.getElementById("filterDateFrom");
    this.dateTo         = document.getElementById("filterDateTo");
    this.people         = document.getElementById("filterPeople");

    // Initialize date filter. Do not filter no date.
    this.filterDate("all");
};

/**
 * Show date pattern dropdown. The page becomes covered with transparent
 * layer that listens to click events and hides the dropdown when page gets
 * clicked. But dropdown remains uncovered.
 */
filterpane.showDateDropdown = function() {
    this.dateDropdown.style.display = "block";

    // Hide dropdown when it looses it's focus.
    doccover.activate(function() {
        filterpane.hideDateDropdown();
    });
};

/**
 * Hide the date pattern dropdown and uncover the page.
 */
filterpane.hideDateDropdown = function() {
    this.dateDropdown.style.display = "none";

    // Uncover the page if it is covered.
    doccover.reset();
};

/**
 * Set given date filter to given value.
 *
 * @param obj An "input" value of type 'date'.
 * @param d Set to given day.
 * if this parameter is the only one passed to function, it is expected
 * to be any of these strings:
 * * "today"        - set to current day.
 * * "yearago"      - set to date year ago.
 * * "monthago"     - set to date month ago.
 * * "weekago"      - set to date 7 days ago.
 * * "yesterday"    - set to yesterday.
 * * "monday"       - set to last monday.
 *
 * @param m Set to given month.
 * @param y Set to given year.
 */
filterpane.setDate = function(obj, d, m, y) {
    var date = new Date();

    if (m === undefined) {
        switch (d) {
            case "today":
                date = new Date();
                break;

            case "yearago":
                date.setFullYear(date.getFullYear() - 1);
                break;

            case "monthago":
                date.setMonth(date.getMonth() - 1);
                break;

            case "weekago":
                date.setDate(date.getDate() - 7);
                break;

            case "yesterday":
                date.setDate(date.getDate() - 1);
                break;

            case "monday":
                var day = date.getDay() - 1;
                day = day == -1 ? 6 : day;
                date.setDate(date.getDate() - day);
                break;

            default:
                console.log({
                    msg : "Argument error",
                    d   : d,
                    m   : m,
                    y   : y
                });
                return;
        }
    } else {
        // Create Date instance with given values.
        // Note that month count from 0 in Date implementation whereas
        // 'm' argument counts from 1.
        date = new Date(Date.UTC(y, m - 1, d));
    }

    obj.value = date.yyyymmdd();
};

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
            this.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
    ].join('-');
};

filterpane.setDateFrom = function(d, m, y) {
    return this.setDate(filterDateFrom, d, m, y);
};

filterpane.setDateTo = function(d, m, y) {
    return this.setDate(filterDateTo, d, m, y);
};

/**
 * Set description to the people filter element and people count.
 */
filterpane.setFilterPeople = function(desc, count) {
    this.people.innerHTML = desc + ' (' + count + ')';
};

/**
 * Set filter with specific calculated values.
 *
 * @param fn The function to calculate date values.
 * 'all'    - Set the date from the beginning.
 * 'year'   - from the day year ago.
 * 'mon'    - month ago.
 * 'week'   - 7 days ago.
 * 'wsrt'   - from the beginning of current week. Week starts on Mondays.
 * 'yes'    - yesterday only.
 * 'tod'    - today only.
 *
 * Called from HTML.
 */
filterpane.filterDate = function(fn) {
    // Hide the dropdown from which this function may be called.
    this.hideDateDropdown();

    switch(fn) {
        case "all":
            this.setDateFrom(1, 1, 2017);
            this.setDateTo("today");
            break;

        case "year":
            this.setDateFrom("yearago");
            this.setDateTo("today");
            break;

        case "mon":
            this.setDateFrom("monthago");
            this.setDateTo("today");
            break;

        case "week":
            this.setDateFrom("weekago");
            this.setDateTo("today");
            break;

        case "wsrt":
            this.setDateFrom("monday");
            this.setDateTo("today");
            break;

        case "yes":
            this.setDateFrom("yesterday");
            this.setDateTo("yesterday");
            break;

        case "tod":
            this.setDateFrom("today");
            this.setDateTo("today");
            break;

        default:
            console.log("filterDate got wrong argument!");
            console.log(fn);
            return;
    }
};

/**
 * Function to initialize page navigation bar controller.
 */
pagenavctrl.init = function() {
    this.bottoml = document.getElementById("pagenavbottom");
    this.topl    = document.getElementById("pagenavtop");
};

/**
 * Set the total amount of pages.
 */
pagenavctrl.setPageCount = function(count) {
    this.pageCount = count;
};

/**
 * Get the first displayed index. Return 0 if controller has not enough data.
 * Active page index and total page count must be set.
 */
pagenavctrl.getStartIndex = function() {
    if (this.activePage == 0 || this.pageCount == 0) {
        return 0;
    }

    var center = Math.floor(PAGE_NAV_ENTRIES_MAX / 2);

    if (this.activePage <= center) {
        // The page index cannot be displayed in the center of the bar
        // because it is too low. The first index in the bar
        // is 1 - it cannot be smaller to place the page index in the center.
        return 1;
    }

    // Find out the first index that will guarantee that the page index gets
    // displayed in the center of the bar.
    return this.activePage - center + 1;
};

/**
 * Get the last displayed index. Return 0 if controller has not enough data.
 * Active page index and total page count must be set.
 */
pagenavctrl.getEndIndex = function() {
    if (this.activePage == 0 || this.pageCount == 0) {
        return 0;
    }

    var center = Math.floor(PAGE_NAV_ENTRIES_MAX / 2);

    if (this.activePage + center <= this.pageCount) {
        return this.activePage + center;
    } else {
        return this.pageCount;
    }
};

/**
 * Get total amount of indices rendered in the bar.
 */
pagenavctrl.getRenderedIndexCount = function() {
    return this.getEndIndex() - this.getStartIndex() + 1;
};

/**
 * Set the current active page index.
 */
pagenavctrl.setActiveIndex = function(i) {
    this.activePage = i;
};

/**
 * Get current active page index.
 */
pagenavctrl.getActiveIndex = function() {
    return this.activePage;
};

/**
 * Turn to previous page. If this is a first page, do nothing.
 */
pagenavctrl.navigatePrev = function() {
    // TODO
};

/**
 * Navigate to next page. If this is a last page, do nothing.
 */
pagenavctrl.navigateNext = function() {
    // TODO
};

/**
 * Navigate to first page. If this is a first page, do nothing.
 */
pagenavctrl.navigateFirst = function() {
    this.setActiveIndex(1);
};

/**
 * Navigate to last page. If this is a last page, do nothing.
 */
pagenavctrl.navigateLast = function() {
    this.setActiveIndex(this.pageCount());
};

/**
 * Set the callback function to call when the new page activation was
 * requested. Callback receives one argument which is an index of the page
 * that was requested.
 */
pagenavctrl.setCallback = function(callback) {
    this.callback = callback;
};

/**
 * Delete all the content from the bar.
 */
pagenavctrl.reset = function() {
    this.callback   = function(index) {};
    this.activePage = 0;
    this.pageCount  = 0;

    // TODO
};

/**
 * Render page indices according to set data: page amount, current page.
 */
pagenavctrl.render = function() {
    var html = "";

    html += "<li class='pagenavli'>"
    html += "<span onclick='pagenavctrl.navigateFirst()'>";
    html += "«";
    html += "</span>";
    html += "</li>";

    html += "<li class='pagenavli'>"
    html += "<span onclick='pagenavctrl.navigatePrev()'>";
    html += "&lt"; // <
    html += "</span>";
    html += "</li>";

    for (var i = 0; i < this.getRenderedIndexCount(); i++) {
        var index = i + this.getStartIndex();

        html += "<li class='pagenavli'>"
        html += "<span onclick='pagenavctrl.setActiveIndex(" + index + ")'>";
        html += index;
        html += "</span>";
        html += "</li>";
    }

    html += "<li class='pagenavli'>"
    html += "<span onclick='pagenavctrl.navigateNext()'>";
    html += "&gt"; // >
    html += "</span>";
    html += "</li>";

    html += "<li class='pagenavli'>"
    html += "<span onclick='pagenavctrl.navigateLast()'>";
    html += "»";
    html += "</span>";
    html += "</li>";

    this.bottoml    .innerHTML = html;
    this.topl       .innerHTML = html;
};
