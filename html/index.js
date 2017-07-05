var filterDateDropdown;

$(document).ready(function() {
    filterDateDropdown = $("#filterDateDropdown")[0];
    filterDateDropdown.style.display = "none";
})

function toggleFilterDateDropdown() {
    console.log(filterDateDropdown);
    switch (filterDateDropdown.style.display) {
        case "none":
            filterDateDropdown.style.display = "block";
            break;
        default:
            filterDateDropdown.style.display = "none";
    }
}
