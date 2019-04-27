(function() {
  "use strict";

  const eventTimer = nodecg.Replicant("eventTimer");

  class TRMOmnibarTimer extends Polymer.Element {
    static get is() {
      return "trm-omnibar-timer";
    }

    static get properties() {
      return {};
    }

    ready() {
      super.ready();

      eventTimer.on("change", newVal => {
        this.updateEventTimer(newVal);
      });
    }

    updateEventTimer(newVal) {
      this.$.timer.innerText = newVal.formattedTime || "00:00";
    }
  }

  customElements.define(TRMOmnibarTimer.is, TRMOmnibarTimer);
})();
