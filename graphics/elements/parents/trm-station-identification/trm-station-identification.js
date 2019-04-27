(function() {
  "use strict";

  // config
  const DISPLAY_DURATION = nodecg.bundleConfig.displaySIDuation || 20;

  // others
  let showStationIdentification = false;

  class TRMStationIdentification extends Polymer.Element {
    static get is() {
      return "trm-station-identification";
    }

    ready() {
      super.ready();
      Polymer.RenderStatus.beforeNextRender(this, this.run);

      nodecg.listenFor("stationIdentShow", () => {
        showStationIdentification = true;
        this.run();
      });

      nodecg.listenFor("stationIdentHide", () => {
        showStationIdentification = false;
      });
    }

    run() {
      const self = this;
      const parts = [this.showDonate, this.showSocials];

      function processNextPart() {
        if (parts.length > 0) {
          const part = parts.shift().bind(self);
          promisifyTimeline(part())
            .then(processNextPart)
            .catch(error => {
              nodecg.log.error("Error when running main loop:", error);
            });
        } else {
          self.run();
        }
      }

      function promisifyTimeline(tl) {
        return new Promise(resolve => {
          tl.call(resolve, null, null, "+=0.03");
        });
      }

      if (showStationIdentification === true) {
        processNextPart();
      }
    }

    showDonate() {
      const tl = new TimelineLite();

      tl.to([this.$.body, this.$.stationIdentDonate], 1, {
        display: "flex",
        opacity: 1,
        ease: Power3.easeIn
      });
      tl.to(this.$.stationIdentDonate, 0.75, {
        opacity: 1,
        ease: Power3.easeIn
      });
      tl.to(this, DISPLAY_DURATION, {});
      tl.to(this.$.stationIdentDonate, 0.75, {
        display: "none",
        opacity: 0,
        ease: Power3.easeOut
      });

      return tl;
    }

    showSocials() {
      const tl = new TimelineLite();

      tl.to(this.$.stationIdentSocials, 0.75, {
        display: "flex",
        opacity: 1,
        ease: Power3.easeIn
      });
      tl.to(this, DISPLAY_DURATION, {});
      tl.to(this.$.body, 1, { opacity: 0, ease: Power3.easeOut });
      tl.to(this.$.stationIdentSocials, 1, {
        display: "none",
        opacity: 0,
        ease: Power3.easeOut
      });
      tl.call(() => {
        nodecg.sendMessage("stationIdentHide");
      });

      return tl;
    }
  }

  customElements.define(TRMStationIdentification.is, TRMStationIdentification);
})();
