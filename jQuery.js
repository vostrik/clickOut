$.fn.clickOut = function(eventNamespace, callback, closestElements) {
    let self = this;
    if (self && self.length) {
        $("html").off("." + eventNamespace);
        setTimeout(function() {
            $("html").on("mousedown." + eventNamespace, function(event) {

                // do not close element while click on custom siblings
                if (closestElements && closestElements.length) {
                    for (var i = 0; i < closestElements.length; i++) {
                        if ($(event.target).closest(closestElements[i]).length) {
                            return;
                        }
                    }
                }

                if (!$(event.target).closest(self).length) {
                    callback();
                    removeClickOut();
                }
            })
        });
        self[0].addEventListener( "DOMNodeRemovedFromDocument", removeClickOut);
        self.on( "hide", removeClickOut);

        /**
         * Remove clickOut event handlers
         */
        function removeClickOut() {
            self.off("hide");
            self[0].removeEventListener( "DOMNodeRemovedFromDocument", removeClickOut);
            $("html").off("." + eventNamespace);
        };
    }
    return self;
}
