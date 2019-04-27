(function() {
    "use strict";

    class DashboardDonationPollListItem extends Polymer.Element {
        static get is() {
            return "dashboard-donation-poll-list-item";
        }

        static get properties() {
            return {
                poll: Object
            };
        }

        ready() {
            super.ready();
            Polymer.RenderStatus.beforeNextRender(this, this.run);
        }

        run() {
        }

        _sortPoll(a, b) {
            return (b.totalAmountRaised - a.totalAmountRaised);
        }

        _parseTotal(total) {
            return total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    }

    customElements.define(DashboardDonationPollListItem.is, DashboardDonationPollListItem);
})();
