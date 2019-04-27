(function() {
  "use strict";

  const countdownTimer = nodecg.Replicant("countdownTimer");

  class TRMCountdownTimer extends Polymer.Element {
    static get is() {
      return "trm-countdown";
    }

    static get properties() {
      return {};
    }

    ready() {
      super.ready();

      countdownTimer.on("change", newVal => {
        this.updateCountdownTimer(newVal);
      });
    }

    updateCountdownTimer(newVal) {
      this.$.timer.innerText = newVal.formattedTime;
    }
  }

  customElements.define(TRMCountdownTimer.is, TRMCountdownTimer);
})();
