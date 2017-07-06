/*
 * Functions for elements defined in 'page.pug'.
 */

/**
 * Main page controller.
 */
var mpane = {
    // User name/login element.
    user    : undefined
};

/**
 * Initialize controller.
 */
mpane.init = function() {
    this.user = $("#mpane_user")[0];
};

/**
 * Set user/login element to given name value and make it link to given page.
 */
mpane.setUserElem = function(name, page) {
    this.user.innerHTML = "<a href='" + page + "'><i>" + name + "</i></a>";
};

/**
 * Set user element to initial value. It will act as login page link.
 */
mpane.setUserElemInitial = function() {
    var page = ""; // TODO
    return this.setUserElem("Ввійти »", page);
};

/**
 * Try to set user name element with name and page link values.
 * If any of these values are undefined then the element will be set
 * to initial value by 'setUserElemInitial' function.
 */
mpane.trySetUserElem = function(name, page) {
    if (name === undefined || page === undefined) {
        return this.setUserElemInitial();
    } else {
        return this.setUserElem(name, page);
    }
};
