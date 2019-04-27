(function() {
  const donationTotal = nodecg.Replicant("total");

  class TRMOmnibarTotal extends Polymer.Element {
    static get is() {
      return "trm-omnibar-total";
    }

    ready() {
      super.ready();

      donationTotal.on("change", (newVal, oldVal) => {
        this.updateDonationTotal(newVal, oldVal);
      });
    }

    updateDonationTotal(newVal, oldVal) {
      oldVal = oldVal || 0;
      let donationTotal = parseFloat(newVal);
      let donationTotalIncrease = donationTotal - oldVal;
      let timeToUpdate = (Math.min(donationTotalIncrease * 0.03), 5);
      let previousTotal = { value: oldVal };

      new TimelineLite({ autoRemoveChildren: true }).to(
        previousTotal,
        timeToUpdate,
        {
          value: newVal,
          ease: Power3.easeOut,
          onUpdate: function() {
            this.$.totalAmount.textContent = previousTotal.value.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }
            );
          }.bind(this)
        },
        "0"
      );
    }
  }

  customElements.define(TRMOmnibarTotal.is, TRMOmnibarTotal);
})();
