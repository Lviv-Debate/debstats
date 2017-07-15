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
 * Function to initialize the structure.
 */
filterpane.init = function() {
    this.dateDropdown   = document.getElementById("filterDateDropdown");
    this.dateFrom       = document.getElementById("filterDateFrom");
    this.dateTo         = document.getElementById("filterDateTo");
    this.people         = document.getElementById("filterPeople");

    // Initialize date filter. Do not filter no date.
    this.setDate("all");
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
        hideDateDropdown();
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
    return setDate(filterDateFrom, d, m, y);
};

filterpane.setDateTo = function(d, m, y) {
    return setDate(filterDateTo, d, m, y);
};

/**
 * Set description to the people filter element and people count.
 */
filterpane.setFilterPeople = function(desc, count) {
    filterPeople.innerHTML = desc + ' (' + count + ')';
};
