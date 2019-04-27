(function() {
    "use strict";

    const secretSoundImages = nodecg.Replicant("assets:secret_sound_images");
    class DashboardSecretSoundItem extends Polymer.Element {
        static get is() {
            return "dashboard-secret-sound-item";
        }

        static get properties() {
            return {
                sound: Object
            };
        }

        ready() {
            super.ready();

            this.$.remove.addEventListener("click", this._removeSecretSound.bind(this));
        }

        _parseAmount(amount) {
            return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        _getImage(image) {
            let imageFile = secretSoundImages.value.find(img => img.name === image);
            if (imageFile) {
                return imageFile.url;
            }

            return "";
        }

        _removeSecretSound() {
            let confirmation = confirm(`Are you sure you want to delete this secret sound? It has been used ${this.sound.used} time(s)`);
            if (!confirmation) {
                return;
            }
            
            nodecg.sendMessage("secretSoundDestroy", this.sound.id);
        }
    }

    customElements.define(DashboardSecretSoundItem.is, DashboardSecretSoundItem);
})();
