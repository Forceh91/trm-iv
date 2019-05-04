(function() {
  // config
  const DISPLAY_DURATION =
    nodecg.bundleConfig.donationNotificationDisplayDuration || 10;

  // replicants
  let donations = nodecg.Replicant("donations");
  const tl = new TimelineLite();

  class TRMDonationNotifier extends Polymer.Element {
    static get is() {
      return "trm-donation-notifier";
    }

    static get properties() {}

    ready() {
      super.ready();

      // list of replicants we need
      const replicants = [donations];

      let numDeclared = 0;
      replicants.forEach(replicant => {
        replicant.once("change", () => {
          numDeclared++;

          if (numDeclared == replicants.length) {
            Polymer.RenderStatus.beforeNextRender(this, this.run);
          }
        });
      });

      donations.on("change", newVal => {
        this.showDonations(
          newVal.filter(a => {
            return a.shown !== true;
          })
        );
      });
    }

    setContent(tl, element) {
      tl.to({}, 0.03, {});
      tl.to(this.$.notifierPlaceholder, 0.75, {
        opacity: 0,
        display: "none",
        ease: Power3.easeOut
      });
      tl.to(this.$.content, 0, {
        opacity: 1,
        display: "block",
        ease: Power3.easeIn
      });
      tl.call(() => {
        tl.pause();
        this.$.content.innerHTML = "";
        this.$.content.appendChild(element);
        Polymer.flush();
        Polymer.RenderStatus.afterNextRender(this, () => {
          Polymer.flush();
          requestAnimationFrame(() => {
            tl.resume(null, false);
          });
        });
      });
    }

    showContent(tl, element) {
      tl.to({}, 0.03, {});
      tl.call(() => {
        tl.pause();

        const elementEntranceAnim = element.enter(DISPLAY_DURATION);
        elementEntranceAnim.call(tl.resume, null, tl);
      });
    }

    hideContent(tl, element) {
      tl.to({}, 0.03, {});
      tl.call(() => {
        tl.pause();

        const elementExitAnim = element.exit();
        elementExitAnim.call(tl.resume, null, tl);

        tl.to(this.$.content, 0, {
          opacity: 0,
          display: "none",
          ease: Power3.easeOut
        });
        tl.to(this.$.notifierPlaceholder, 0.75, {
          opacity: 1,
          display: "block",
          ease: Power3.easeIn
        });
      });
    }

    showDonations(newdonations) {
      if (!newdonations || newdonations.length < 1) {
        return tl;
      }

      let _donations = newdonations.sort(function(a, b) {
        return a.id - b.id;
      });

      let trmDonation = null;
      _donations.forEach(
        function(donation) {
          trmDonation = document.createElement("trm-donation-notification");
          trmDonation.donation = donation;

          this.setContent(tl, trmDonation);
          this.showContent(tl, trmDonation);
          tl.to(trmDonation, DISPLAY_DURATION, {});
          this.hideContent(tl, trmDonation);

          // mark as overlay seen
          donation.shown = true;
        }.bind(this)
      );

      return tl;
    }
  }

  customElements.define(TRMDonationNotifier.is, TRMDonationNotifier);
})();
