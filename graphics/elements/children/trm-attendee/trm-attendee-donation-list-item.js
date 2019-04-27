class TRMAttendeeDonationListItem extends Polymer.Element {
  static get is() {
    return "trm-attendee-donation-list-item";
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
}

customElements.define(
  TRMAttendeeDonationListItem.is,
  TRMAttendeeDonationListItem
);
