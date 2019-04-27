(function() {
    "use strict";

    const donationTotal = nodecg.Replicant("total");

    class DashboardDonationTotal extends Polymer.Element {
        static get is() {
            return "dashboard-donation-total";
        }

        ready() {
            super.ready();

            donationTotal.on("change", newVal => {
                this.$.total.textContent = newVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            });
        }
    }

    customElements.define(DashboardDonationTotal.is, DashboardDonationTotal);
})();
