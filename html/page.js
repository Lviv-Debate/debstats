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
 * DIV that covers all the page with z-index = 1.
 */
var doccover = {
    // Element reference
    el: undefined,

    // Function to call on click. After function run, this function
    // is reset to empty function.
    onceclick: function() {}
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

/**
 * Initialize controller.
 */
doccover.init = function() {
    this.el = $("#doccover")[0];

    this.el.onclick = function() {
        doccover.onceclick();
        doccover.onceclick = function() {};
    };
};

/**
 * Cover the page with DIV.
 */
doccover.hide = function() {
    this.el.style.display = "none";
};

/**
 * Hide the cover so that elements of the page began available again.
 */
doccover.show = function() {
    this.el.style.display = "block";
};

/**
 * Hide the layer and reset 'onceclick' event handler.
 */
doccover.reset = function() {
    this.hide();
    this.onceclick = function() {};
};

/**
 * Show the layer and set 'onceclick' event handler.
 */
doccover.activate = function(once) {
    this.onceclick = once;
    this.show();
};
