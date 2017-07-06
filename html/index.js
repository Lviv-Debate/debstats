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
 * @param w Set to given week.
 * @param y Set to given year.
 */
function setDate(obj, d, w, y) {
    if (w == "undefined") {
        var today = new Date();

        switch (d) {
            case "today":
                console.log("Not supported yet!");
                break;

            case "yearago":
                console.log("Not supported yet!");
                break;

            case "monthago":
                console.log("Not supported yet!");
                break;

            case "weekago":
                console.log("Not supported yet!");
                break;

            case "yesterday":
                console.log("Not supported yet!");
                break;

            case "monday":
                console.log("Not supported yet!");
                break;

            default:
                console.log({
                    msg : "Argument error",
                    d   : d,
                    w   : w,
                    y   : y
                });
                return;
        }
    }

    obj.value = d + "-" + w + "-" + y;
}

function setDateFrom(d, w, y) {
    return setDate(filterDateFrom, d, w, y);
}

function setDateTo(d, w, y) {
    return setDate(filterDateTo, d, w, y);
}
