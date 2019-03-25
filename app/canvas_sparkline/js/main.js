require.config({
    paths: {
        jquery: "libs/jquery-3.2.1",
        source: "source"
    },
    shim: {},
    waitSeconds: 15
});

require([
    "jquery",
     "source/app"
], function ($, App) {
    "use strict";

    App.initialize();
});
