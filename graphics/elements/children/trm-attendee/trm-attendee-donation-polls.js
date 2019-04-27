(function() {
  "use strict";

  const donationPolls = nodecg.Replicant("donationpolls");
  const DISPLAY_DURATION =
    nodecg.bundleConfig.attendeeDonationPollDisplayDuration || 20;

  class TRMAttendeeDonationPolls extends Polymer.Element {
    static get is() {
      return "trm-attendee-donation-polls";
    }

    ready() {
      super.ready();

      // list of replicants we need
      const replicants = [donationPolls];

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
      const parts = [this.showDonationPolls];

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

    showDonationPolls() {
      const tl = new TimelineLite();

      let polls = donationPolls.value;
      if (!polls || polls.length < 1) {
        this.$.noData.style.display = "block";
        return tl;
      }

      this.$.noData.style.display = "none";
      this.$.pollList.innerHTML = "";

      polls.forEach((poll, index) => {
        const donationPollItemElement = document.createElement(
          "trm-attendee-donation-poll-item"
        );
        donationPollItemElement.poll = poll;

        this.$.pollList.appendChild(donationPollItemElement);

        tl.call(
          () => {
            this.$.pollList.select(index);
          },
          null,
          null,
          "+=0.03"
        );

        tl.to(donationPollItemElement, 0.75, {
          opacity: 1,
          ease: Power3.easeIn
        });
        tl.to({}, DISPLAY_DURATION, {});
        tl.to(donationPollItemElement, 0.75, {
          marginLeft: "-100%",
          ease: Power3.easeOut
        });
      });

      return tl;
    }
  }

  customElements.define(TRMAttendeeDonationPolls.is, TRMAttendeeDonationPolls);
})();
