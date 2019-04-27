(function() {
    "use strict";

    const donationGoals = nodecg.Replicant("donationGoals");

    class DashboardDonationGoalList extends Polymer.Element {
        static get is() {
            return "dashboard-donation-goal-list";
        }

        static get properties() {
            return {};
        }

        ready() {
            super.ready();

            const replicants = [donationGoals];

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
            const self = this;
            donationGoals.on("change", (goals) => {
                self.renderDonationGoalList(goals);
            });
        }

        renderDonationGoalList(goals) {
            this.$.noData.style.display = "none";

            // clear the list
            while (this.$.donationGoalList.firstChild) {
                this.$.donationGoalList.removeChild(this.$.donationGoalList.firstChild);
            }

            if (goals.length < 1) {
                this.$.noData.style.display = "block";
                return;
            }

            // show donation goals
            goals.forEach((goal) => {
                const donationGoalListElement = document.createElement("dashboard-donation-goal-list-item");
                donationGoalListElement.goal = goal;

                this.$.donationGoalList.prepend(donationGoalListElement);
            });
        }
    }

    customElements.define(DashboardDonationGoalList.is, DashboardDonationGoalList);
})();
