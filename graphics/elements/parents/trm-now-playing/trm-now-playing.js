(function() {
  "use strict";

  const foobarNowPlaying = nodecg.Replicant("foobarNowPlaying");

  class TRMNowPlaying extends Polymer.Element {
    static get is() {
      return "trm-now-playing";
    }

    ready() {
      super.ready();

      foobarNowPlaying.on("change", newVal => {
        if (
          !foobarNowPlaying.value ||
          (foobarNowPlaying.value.artist === "" &&
            foobarNowPlaying.value.track === "")
        ) {
          this.$.body.style.display = "none";
        } else {
          if (this.$.body.style.display === "none") {
            this.$.body.style.display = "";
          }
        }

        this.$.artist.textContent = newVal.artist;
        this.$.track.textContent = newVal.track;
      });
    }
  }

  customElements.define(TRMNowPlaying.is, TRMNowPlaying);
})();
