class TRMAttendeeDonationPollItem extends Polymer.Element {
  static get is() {
    return "trm-attendee-donation-poll-item";
  }

  static get properties() {
    return {
      poll: Object
    };
  }

  ready() {
    super.ready();
  }

  _sortedOptions(options) {
    options = options.slice(0);
    options = options.sort(function(a, b) {
      return b.totalAmountRaised - a.totalAmountRaised;
    });

    return options;
  }

  _displayTotal(total) {
    return "$" + total.toLocaleString("en-US", { minimumFractionDigits: 2 });
  }

  _displayClass(index) {
    if (index > 0) {
      return "body";
    }

    return "body is-winning";
  }

  _displayTotalBehind(total) {
    let behind = total - this.poll.options[0].total;
    return "$" + behind.toLocaleString("en-US", { minimumFractionDigits: 2 });
  }
}

customElements.define(
  TRMAttendeeDonationPollItem.is,
  TRMAttendeeDonationPollItem
);
