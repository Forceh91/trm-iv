class DashboardScheduleDisplayItem extends Polymer.Element {
  static get is() {
    return "dashboard-schedule-display-item";
  }

  static get properties() {
    return {
      game: Object
    };
  }

  ready() {
    super.ready();

    if (!this.game) {
      return;
    }

    let game = this.game && this.game.data;

    this.$.game.textContent = game[0] || "N/A";
    this.$.platform.textContent = game[4] || "N/A";
    this.$.category.textContent = game[3] || "N/A";
    this.$.year.textContent = game[5] || "N/A";
    this.$.runner.textContent = game[1] || "N/A";

    if (!game.donation_total || game.donation_total.length < 1) {
      return;
    }

    let donationGoals = "";
    game.donation_total.forEach((donation_goal, index) => {
      donationGoals += `$${donation_goal} - ${donation_unlock[index]}<br/>`;
    });

    this.$.donationGoals.innerHTML = donationGoals;
  }
}

customElements.define(
  DashboardScheduleDisplayItem.is,
  DashboardScheduleDisplayItem
);
