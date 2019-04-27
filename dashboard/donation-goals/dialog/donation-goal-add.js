(function() {
    "use strict";

    const donationTotal = nodecg.Replicant("total")

    class DashboardDonationGoalAddDialog extends Polymer.Element {
        static get is() {
            return "dashboard-donation-goal-add-dialog";
        }

        static get properties() {
            return {};
        }

        ready() {
            super.ready();

            const replicants = [donationTotal];

            let numDeclared = 0;
            replicants.forEach(replicant => {
                replicant.once("change", () => {
                    numDeclared++;

                    if (numDeclared == replicants.length) {
                        Polymer.RenderStatus.beforeNextRender(this, this.run);
                    }
                });
            });
        }

        run() {
            document.addEventListener("dialog-confirmed", (e) => {
                let value = parseFloat(this.$.amount.value);
                if (value < donationTotal.value) {
                    e.preventDefault();
                    return;
                }

                let reward = this.$.reward.value;
                if (reward) {
                    nodecg.sendMessage("addDonationGoal", {
                        total: value,
                        reward: reward
                    });
                }
            });
        }
    }

    customElements.define(DashboardDonationGoalAddDialog.is, DashboardDonationGoalAddDialog);
})();
