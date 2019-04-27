(function() {
  "use strict";

  const eventTimer = nodecg.Replicant("eventTimer");

  class TRMAttendeeTimer extends Polymer.Element {
    static get is() {
      return "trm-attendee-timer";
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
      this.$.timer.innerText = newVal.formattedTime;
    }
  }

  customElements.define(TRMAttendeeTimer.is, TRMAttendeeTimer);
})();
