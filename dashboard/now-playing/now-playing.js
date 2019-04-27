(function() {
    "use strict";

    const foobarNowPlaying = nodecg.Replicant("foobarNowPlaying");

    class DashboardNowPlaying extends Polymer.Element {
        static get is() {
            return "dashboard-now-playing";
        }

        ready() {
            super.ready();

            foobarNowPlaying.on("change", newVal => {
                this.$.artist.textContent = newVal.artist;
                this.$.track.textContent = newVal.track;
            });
        }
    }

    customElements.define(DashboardNowPlaying.is, DashboardNowPlaying);
})();
