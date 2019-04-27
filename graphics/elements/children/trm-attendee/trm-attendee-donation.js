class TRMAttendeeDonation extends Polymer.Element {
  static get is() {
    return "trm-attendee-donation";
  }

  static get properties() {
    return {
      donation: Object
    };
  }

  ready() {
    super.ready();

    this.$.amount.textContent = this.donation.amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    this.$.name.textContent = this.donation.name;

    if (this.donation.comment) {
      this.$.comment.textContent = this.donation.comment;
    } else {
      this.$.comment.style.display = "none";
    }
  }

  enter() {
    return new TimelineLite();
  }

  exit() {
    const tl = new TimelineLite();
    tl.to(this.$.popover, 0.75, { opacity: 0, ease: Power3.easeOut });
    return tl;
  }
}

customElements.define(TRMAttendeeDonation.is, TRMAttendeeDonation);
