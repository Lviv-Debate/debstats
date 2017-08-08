<?php

/**
 * Get filter value for 'from date'.
 */
function filterDateFrom() {
    return stringDateToObject($_GET["from_date"]);
}

/**
 * Get filter value for 'to date'.
 */
function filterDateTo() {
    return stringDateToObject($_GET["to_date"]);
}

/**
 * Convert string date to DateTime object.
 */
function stringDateToObject($date) {
    return DateTime::createFromFormat("! d/m/Y");
}
