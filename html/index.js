var filterDateDropdown;
var filterDateFrom;
var filterDateTo;

$(document).ready(function() {
    filterDateDropdown = $("#filterDateDropdown")[0];
    filterDateDropdown.style.display = "none";

    filterDateFrom  = $("#filterDateFrom")  [0];
    filterDateTo    = $("#filterDateTo")    [0];
})

function toggleFilterDateDropdown() {
    switch (filterDateDropdown.style.display) {
        case "none":
            filterDateDropdown.style.display = "block";
            break;
        default:
            filterDateDropdown.style.display = "none";
    }
}

/**
 * Set filter with specific calculated values.
 *
 * @param fn The function to calculate date values.
 * 'all'    - Set the date from the beginning.
 * 'year'   - from the day year ago.
 * 'mon'    - month ago.
 * 'week'   - 7 days ago.
 * 'wstr'   - from the beginning of current week. Week starts on Mondays.
 * 'yes'    - yesterday only.
 * 'tod'    - today only.
 */
function filterDate(fn) {
    // Hide the dropdown from which this function was called.
    filterDateDropdown.style.display = "none";

    switch(fn) {
        case "all":
            setDateFrom(1, 1, 2017);
            setDateTo("today")
            break;

        case "year":
            setDateFrom("yearago");
            setDateTo("today");
            break;

        case "mon":
            setDateFrom("monthago");
            setDateTo("today");
            break;

        case "week":
            setDateFrom("weekago");
            setDateTo("today");
            break;

        case "wstr":
            setDateFrom("monday");
            setDateTo("today");
            break;

        case "yes":
            setDateFrom("yesterday");
            setDateTo("today");
            break;

        case "tod":
            setDateFrom("today");
            setDateTo("today");
            break;

        default:
            console.log("filterDate got wrong argument!");
            console.log(fn);
            return;
    }
}

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
function setDate(obj, d, m, y) {
    var date = new Date();

    if (m == "undefined") {
        switch (d) {
            case "today":
                // Nothing to change.
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
                var day = date.getDay();
                day = day == 0 ? 6 : day;
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

    console.log(date);
    obj.value = date.yyyymmdd();
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
            this.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
    ].join('-');
};

function setDateFrom(d, m, y) {
    return setDate(filterDateFrom, d, m, y);
}

function setDateTo(d, m, y) {
    return setDate(filterDateTo, d, m, y);
}
