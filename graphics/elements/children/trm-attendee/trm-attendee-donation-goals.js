(function() {
  "use strict";

  const donationGoals = nodecg.Replicant("donationGoals");
  const DISPLAY_DURATION =
    nodecg.bundleConfig.attendeeDonationGoalDisplayDuration || 10;

  class TRMAttendeeDonationGoals extends Polymer.Element {
    static get is() {
      return "trm-attendee-donation-goals";
    }

    ready() {
      super.ready();

      // list of replicants we need
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
      const parts = [this.showDonationGoals];

      function processNextPart() {
        if (parts.length > 0) {
          const part = parts.shift().bind(self);
          promisifyTimeline(part())
            .then(processNextPart)
            .catch(error => {
              nodecg.log.error("Error when running main loop:", error);
            });
        } else {
          self.run();
        }
      }

      function promisifyTimeline(tl) {
        return new Promise(resolve => {
          tl.call(resolve, null, null, "+=0.03");
        });
      }

      processNextPart();
    }

    showDonationGoals() {
      const tl = new TimelineLite();

      let goals = donationGoals.value;
      if (!goals || goals.length < 1) {
        this.$.noData.style.display = "block";
        return tl;
      }

      this.$.noData.style.display = "none";
      this.$.goalList.innerHTML = "";

      goals.forEach((goal, index) => {
        const donationGoalItemElement = document.createElement(
          "trm-attendee-donation-goal-item"
        );
        donationGoalItemElement.goal = goal;

        this.$.goalList.appendChild(donationGoalItemElement);

        tl.call(
          () => {
            this.$.goalList.select(index);
          },
          null,
          null,
          "+=0.03"
        );

        tl.to(donationGoalItemElement, 0.75, {
          opacity: 1,
          ease: Power3.easeIn
        });
        tl.to({}, DISPLAY_DURATION, {});
        tl.to(donationGoalItemElement, 0.75, {
          marginLeft: "-100%",
          ease: Power3.easeOut
        });
      });

      return tl;
    }
  }

  customElements.define(TRMAttendeeDonationGoals.is, TRMAttendeeDonationGoals);
})();
