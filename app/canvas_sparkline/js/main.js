require.config({
    paths: {
        jquery: "libs/jquery-3.2.1",
        source: "source"
    },
    shim: {},
    waitSeconds: 15
});

require([
    "jquery"
], function ($) {
    "use strict";
});
