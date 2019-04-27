(function() {
    "use strict";

    const deaths = nodecg.Replicant("deathCounter");

    class DashboardDeathCount extends Polymer.Element {
        static get is() {
            return "dashboard-death-count";
        }

        ready() {
            super.ready();

            deaths.on("change", (newVal) => {
                this.$.deaths.textContent = newVal;
            });

            this.$.addDeath.addEventListener("click", () => {
                nodecg.sendMessage("increaseDeaths");
            });

            this.$.removeDeath.addEventListener("click", () => {
                nodecg.sendMessage("decreaseDeaths");
            });
        }
    }

    customElements.define(DashboardDeathCount.is, DashboardDeathCount);
})();
