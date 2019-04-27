(function() {
    "use strict";

    const donationTotal = nodecg.Replicant("total");
    class DashboardDonationGoalListItem extends Polymer.Element {
        static get is() {
            return "dashboard-donation-goal-list-item";
        }

        static get properties() {
            return {
                goal: Object
            };
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
            donationTotal.on("change", () => {
                this._parseTotalRemaining(this.goal.total)
            });

            this.$.remove.addEventListener("click", this._removeDonationGoal.bind(this));
        }

        _parseTotal(total) {
            return total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        _parseTotalRemaining(total) {
            return (total - donationTotal.value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        _removeDonationGoal() {
            let confirmation = confirm(`Are you sure you want to remove this donation goal?`);
            if (!confirmation) {
                return;
            }

            nodecg.sendMessage("removeDonationGoal", this.goal.goalid);
        }
    }

    customElements.define(DashboardDonationGoalListItem.is, DashboardDonationGoalListItem);
})();
