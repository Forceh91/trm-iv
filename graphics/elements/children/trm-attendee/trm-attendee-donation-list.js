(function() {
  "use strict";

  let localDonations = [];
  const donationQueue = nodecg.Replicant("donations");

  class TRMAttendeeDonationList extends Polymer.Element {
    static get is() {
      return "trm-attendee-donation-list";
    }

    static get properties() {
      return {};
    }

    ready() {
      super.ready();

      const self = this;
      donationQueue.on("change", donations => {
        self.renderDonationList(donations);
      });
    }

    renderDonationList(donations) {
      if (donations.length < 1) {
        this.$.noDonations.style.display = "block";
        return;
      }

      this.$.noDonations.style.display = "none";
      this.$.donationlist.innerHTML = "";

      let _donations = donations.slice(0);
      _donations = _donations
        .sort((a, b) => {
          return a.id - b.id;
        })
        .filter(a => {
          return a.read === false;
        });

      if (_donations.length < 1) {
        this.$.noDonations.style.display = "block";
        return;
      }

      _donations.forEach(donation => {
        const donationListElement = document.createElement(
          "trm-attendee-donation-list-item"
        );
        donationListElement.donation = donation;

        this.$.donationlist.prepend(donationListElement);
      });
    }
  }

  customElements.define(TRMAttendeeDonationList.is, TRMAttendeeDonationList);
})();
