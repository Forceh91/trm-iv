class TRMDonationNotification extends Polymer.Element {
  static get is() {
    return "trm-donation-notification";
  }

  static get properties() {
    return {
      donation: Object
    };
  }

  ready() {
    super.ready();
  }

  enter() {
    const tl = new TimelineLite();

    tl.call(this.showDonation.bind(this));
    tl.to(this.$.body, 0.75, { opacity: 1, ease: Power3.easeIn });

    return tl;
  }

  exit() {
    const tl = new TimelineLite();
    tl.to(this.$.body, 0.75, { marginLeft: "-100%", ease: Power3.easeOut });
    return tl;
  }

  showDonation() {
    const tl = new TimelineLite();
    const self = this;

    nodecg.sendMessage("secretSoundFind", this.donation.amount, data => {
      if (data.image) self.$.donationImage.src = data.image;
      self.$.donationAmount.textContent =
        "$" +
        this.donation.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      self.$.donationName.textContent = this.donation.name;

      if (data.sound) {
        self.$.donationSound.src = data.sound;
        self.$.donationSound.type = data.soundType;
        self.$.donationSound.play();
      }
    });
  }
}

customElements.define(TRMDonationNotification.is, TRMDonationNotification);
