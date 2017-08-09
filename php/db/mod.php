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
}

/**
 * List of debaters. Can be used to create a slice of statistic data for
 * just debaters listed here instead of all in the system.
 */
class DbDebaterList {
    // TODO
}

/**
 * Debater entry controller.
 */
class DbDebater {
    // TODO
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
        return DateTime::createFromFormat("! d/m/Y");
    }
}
