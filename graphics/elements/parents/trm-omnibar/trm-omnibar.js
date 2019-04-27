(function() {
  "use strict";

  // config
  const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration || 5;
  const SCROLL_HOLD_DURATION = nodecg.bundleConfig.scrollHoldDuration || 10;

  // replicants
  const total = nodecg.Replicant("total");
  const timer = nodecg.Replicant("eventTimer");
  const donationGoals = nodecg.Replicant("donationGoals");
  const donationPolls = nodecg.Replicant("donationpolls");

  class TRMOmnibar extends Polymer.Element {
    static get is() {
      return "trm-omnibar";
    }

    static get properties() {
      return {
        hideDeaths: Boolean,
        hideTimer: Boolean
      };
    }

    ready() {
      super.ready();

      // list of replicants we need
      const replicants = [total, timer, donationGoals, donationPolls];

      let numDeclared = 0;
      replicants.forEach(replicant => {
        replicant.once("change", () => {
          numDeclared++;

          if (numDeclared == replicants.length) {
            Polymer.RenderStatus.beforeNextRender(this, this.run);
          }
        });
      });

      if (this.dataset) {
        if (this.dataset.hideTimer === "true") {
          this.$.timer.style.display = "none";
        }

        if (this.dataset.hideDeaths === "true") {
          this.$.deaths.style.display = "none";
        }
      }
    }

    run() {
      const self = this;
      const parts = [
        this.showCTA,
        this.showSocials,
        this.showGoals,
        this.showPolls
      ];

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

    setContent(tl, element) {
      tl.to({}, 0.03, {});
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

        const elementEntranceAnim = element.enter(
          DISPLAY_DURATION,
          SCROLL_HOLD_DURATION
        );
        elementEntranceAnim.call(tl.resume, null, tl);
      });
    }

    hideContent(tl, element) {
      tl.to({}, 0.03, {});
      tl.call(() => {
        tl.pause();

        const elementExitAnim = element.exit();
        elementExitAnim.call(tl.resume, null, tl);
      });
    }

    showCTA() {
      const tl = new TimelineLite();

      tl.call(() => {
        this.$.content.innerHTML = "";
      });
      tl.add(this.$.cta.show(DISPLAY_DURATION));
      return tl;
    }

    showSocials() {
      const tl = new TimelineLite();
      const trmSocials = document.createElement("trm-omnibar-socials");

      this.setContent(tl, trmSocials);
      this.showContent(tl, trmSocials);
      this.hideContent(tl, trmSocials);

      return tl;
    }

    showGoals() {
      const tl = new TimelineLite();

      const goals = donationGoals.value;
      if (goals.length < 1) {
        return tl;
      }

      const trmGoals = document.createElement("trm-omnibar-goals");
      trmGoals.goals = goals;

      this.setContent(tl, trmGoals);
      this.showContent(tl, trmGoals);
      this.hideContent(tl, trmGoals);

      return tl;
    }

    showPolls() {
      const tl = new TimelineLite();

      const polls = donationPolls.value;
      if (polls.length < 1) {
        return tl;
      }

      const trmPolls = document.createElement("trm-omnibar-polls");
      trmPolls.polls = polls;

      this.setContent(tl, trmPolls);
      this.showContent(tl, trmPolls);
      this.hideContent(tl, trmPolls);

      return tl;
    }
  }

  customElements.define(TRMOmnibar.is, TRMOmnibar);
})();
