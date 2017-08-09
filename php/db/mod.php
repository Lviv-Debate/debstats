<?php

/**
 * Class to wrap database accesses.
 */
class Database {

    private const DBNAME = "debstats";

    /** A PDO connection. */
    protected $conn;

    function __construct() {
        try {
            $conn = new PDO(
                    "mysql:host=localhost;dbname=" . DBNAME,
                    "root",
                    "");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOexception $e) {
            // TODO
        }
    }
}

/**
 * Class to represent group of clubs.
 */
class DbClubGroup {
    // TODO

    /**
     * Get list of all debaters in this club.
     */
    function debaterList() {
        // TODO
    }
}

/**
 * List of debaters. Can be used to create a slice of statistic data for
 * just debaters listed here instead of all in the system.
 */
class DbDebaterList {
    // TODO
}

/**
 * Debater entry.
 */
class DbDebater {
    // TODO

    /**
     * Get ID of debater. This is also a PK in DB.
     */
    function id() {
        // TODO
    }

    /**
     * Get debater name string.
     */
    function name() {
        // TODO
    }

    /**
     * Get surname string.
     */
    function surname() {
        // TODO
    }

    /**
     * Get debater page facebook address string if any.
     */
    function fbpage() {
        // TODO
    }

    /**
     * Get email string if any.
     */
    function email() {
        // TODO
    }

    /**
     * Get phone number string if any.
     * Format is like "+380123456789".
     */
    function phone() {
        // TODO
    }
}

/**
 * Club entry.
 */
class DbClub {
    // TODO

    /**
     * Get id of club. This is also PK in DB.
     */
    function id() {
        // TODO
    }

    /**
     * Get club name string.
     */
    function name() {
        // TODO
    }

    /**
     * Get club description if any.
     */
    function descr() {
        // TODO
    }

    /**
     * Get club facebook page if any.
     */
    function fbpage() {
        // TODO
    }

    /**
     * Get list of all debaters in this club.
     */
    function debaterList() {
        // TODO
    }
}

/**
 * Class to access data from filter panel of a document.
 */
class FilterData {

    /** Forbid creating instances of this class. */
    private function __construct() { }

    /**
    * Get filter value for 'from date'.
    */
    static function filterDateFrom() {
        return stringDateToObject($_GET["from_date"]);
    }

    /**
    * Get filter value for 'to date'.
    */
    static function filterDateTo() {
        return stringDateToObject($_GET["to_date"]);
    }

    /**
    * Convert string date to DateTime object.
    */
    static function stringDateToObject($date) {
        // Format: day/month/year. Time set to 00:00:00.
        return DateTime::createFromFormat("! d/m/Y", $date);
    }
}
