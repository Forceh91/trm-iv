class TRMAttendeeDateTime extends Polymer.Element {
  static get is() {
    return "trm-attendee-datetime";
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();

    setInterval(this.updateLocalTime.bind(this), 1000);

    this.updateLocalTime();
  }

  updateLocalTime(newVal) {
    this.$.datetime.textContent = moment().format("ddd MMM D, hh:mm:ss a");
  }
}

customElements.define(TRMAttendeeDateTime.is, TRMAttendeeDateTime);
