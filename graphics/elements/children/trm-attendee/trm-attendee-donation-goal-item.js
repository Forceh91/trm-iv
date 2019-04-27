(function() {
  const donationTotal = nodecg.Replicant("total");

  class TRMAttendeeDonationGoalItem extends Polymer.Element {
    static get is() {
      return "trm-attendee-donation-goal-item";
    }

    static get properties() {
      return {
        goal: Object
      };
    }

    ready() {
      super.ready();

      this.$.amount.textContent = this.goal.total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      this.$.goal.textContent = this.goal.reward;
      this.$.remaining.textContent = (
        this.goal.total - donationTotal.value
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      donationTotal.on("change", newVal => {
        this.$.remaining.textContent = (
          this.goal.total - newVal
        ).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      });
    }
  }

  customElements.define(
    TRMAttendeeDonationGoalItem.is,
    TRMAttendeeDonationGoalItem
  );
})();
