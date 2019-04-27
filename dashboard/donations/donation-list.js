(function() {
    "use strict";

    const donationQueue = nodecg.Replicant("donations");

    class DashboardDonationList extends Polymer.Element {
        static get is() {
            return "dashboard-donation-list";
        }

        static get properties() {
            return {};
        }

        ready() {
            super.ready();

            const replicants = [donationQueue];

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
            donationQueue.on("change", (newVal) => {
                self.renderDonationList(newVal);
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
            _donations = _donations.filter(a => { return a.read === false });

            if (_donations.length < 1) {
                this.$.noDonations.style.display = "block";
                return;
            }

            _donations.forEach((donation) => {
                const donationListElement = document.createElement("dashboard-donation-list-item");
                donationListElement.donation = donation;

                this.$.donationlist.prepend(donationListElement);
            })
        }
    }

    customElements.define(DashboardDonationList.is, DashboardDonationList);
})();
