define(['#event','jquery'], function (evt,$) {
    var _fcls = {};
    document.addEventListener("DOMNodeInserted", function () {
        var _evts = function () {
            _fcls["eventDoms"] = $("[fcl-event]");
        };
        _evts();
        evt.batchBinds(_fcls.eventDoms);
    }, false)

});
