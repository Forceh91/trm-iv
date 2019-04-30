(function() {
  "use strict";

  // config
  const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration || 5;

  // replicants
  const schedule = nodecg.Replicant("eventSchedule");
  const scheduleSeek = nodecg.Replicant("scheduleSeek");

  class TRMRunInfo extends Polymer.Element {
    static get is() {
      return "trm-run-info";
    }

    static get properties() {
      return {
        wide: Boolean
      };
    }

    ready() {
      super.ready();

      // list of replicants we need
      const replicants = [schedule, scheduleSeek];

      let numDeclared = 0;
      replicants.forEach(replicant => {
        replicant.once("change", () => {
          numDeclared++;

          if (numDeclared == replicants.length) {
            Polymer.RenderStatus.beforeNextRender(this, this.run);
            this.showRunInfo();
          }
        });
      });

      scheduleSeek.on("change", () => {
        this.showRunInfo();
      });

      if (this.wide) {
        this.$.content.classList.add("is-wide");
      }
    }

    run() {
      const self = this;
      const parts = [this.showRunnerName, this.showRunnerTwitch];

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

    showRunInfo() {
      const tempSchedule = schedule.value;
      const run = tempSchedule[scheduleSeek.value];
      const rundata = run && run.data;

      const regex = /(\w+)/;
      const runnerParsed = rundata[1].match(regex);
      const runnerName = runnerParsed && runnerParsed[0];

      this.$.runner.innerText = runnerName || "N/A";
      this.$.game.innerText = rundata[0] || "N/A";
      this.$.category.innerText = rundata[3] || "Casual";
      this.$.platform.innerText = `${rundata[4] || "N/A"} (${rundata[5]})`;
    }

    showRunnerName() {
      const tempSchedule = schedule.value;
      const run = tempSchedule[scheduleSeek.value];
      const rundata = run && run.data;

      const tl = new TimelineLite();
      if (!rundata[2]) return tl;

      const regex = /(\w+)/;
      const runnerParsed = rundata[1].match(regex);
      const runnerName = runnerParsed && runnerParsed[0];

      tl.call(() => {
        this.$.runner.innerText = runnerName || "N/A";
        this.$.runnerTwitch.innerText = rundata[2];
      });
      tl.to({}, DISPLAY_DURATION, {});
      tl.to(this.$.runnerContainer, 0.75, {
        marginLeft: "-100%",
        ease: Power0.easeOut
      });
      return tl;
    }

    showRunnerTwitch() {
      const tempSchedule = schedule.value;
      const run = tempSchedule[scheduleSeek.value];
      const rundata = run && run.data;

      const tl = new TimelineLite();
      tl.call(() => {
        this.$.runnerTwitch.innerText = rundata[2] || "Twitch Account";
      });
      tl.to({}, DISPLAY_DURATION, {});
      tl.to(this.$.runnerContainer, 0.75, {
        marginLeft: 0,
        ease: Power0.easeOut
      });
      return tl;
    }
  }

  customElements.define(TRMRunInfo.is, TRMRunInfo);
})();
