/*
 * Functions for elements defined in 'page.pug'.
 */

/**
 * Main panel controller. That is a navigation panel at the top of
 * pages.
 */
var mpane = {

    /**
     * User name/login element. After initialization must be set to
     * valid value.
     */
    user    : undefined
};

/**
 * DIV that covers all the page, with z-index = 1.
 * Is used to register lost focus for pop-ups when the area of the
 * page is clicked while pop-up is active.
 */
var doccover = {

    /**
     * Element. Must be set to valid value after initialization function.
     */
    el: undefined,

    /**
     * Function is run once the layer is clicked. After that this field
     * is reset to empty function.
     */
    onceclick: function() {},

    init        : function() {},
    show        : function() {},
    hide        : function() {},
    activate    : function() {},
    reset       : function() {}
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
 * Hide the cover so that elements of the page began available again.
 */
doccover.hide = function() {
    this.el.style.display = "none";
};

/**
 * Cover the page with DIV.
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
