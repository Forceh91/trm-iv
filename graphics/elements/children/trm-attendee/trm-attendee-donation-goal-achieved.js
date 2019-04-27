(function() {
  "use strict";

  class TRMAttendeeDonationGoalAchieved extends Polymer.Element {
    static get is() {
      return "trm-attendee-donation-goal-achieved";
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
      this.$.name.textContent = this.goal.reward;
    }
  }

  customElements.define(
    TRMAttendeeDonationGoalAchieved.is,
    TRMAttendeeDonationGoalAchieved
  );
})();
