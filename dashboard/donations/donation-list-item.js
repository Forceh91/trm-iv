const wheelspinAmount = nodecg.bundleConfig.wheelspin_amount;

class DashboardDonationListItem extends Polymer.Element {
    static get is() {
        return "dashboard-donation-list-item";
    }

    static get properties() {
        return {
            donation: Object
        }
    }

    ready() {
        super.ready();
        
        this.$.amount.textContent = this.donation.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.$.name.textContent = this.donation.name;
        this.$.markDonationRead.addEventListener("click", this._markDonationRead.bind(this));

        if (this.donation.comment) {
            this.$.comment.textContent = this.donation.comment;
        } else {
            this.$.comment.style.display = "none";
        }

        if (!wheelspinAmount || wheelspinAmount === 0 || this.donation.amount < wheelspinAmount) {
            this.$.needWheelspin.style.display = "none";
        }
    }

    _markDonationRead () {
        this.donation.read = true;
    }    
}

customElements.define(DashboardDonationListItem.is, DashboardDonationListItem);
