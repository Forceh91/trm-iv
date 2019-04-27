(function() {
  "use strict";

  const total = nodecg.Replicant("total");

  class TRMOmnibarGoal extends Polymer.Element {
    static get is() {
      return "trm-omnibar-goal";
    }

    static get properties() {
      return {
        goal: Object
      };
    }

    ready() {
      super.ready();

      TweenLite.set(this.$.body, { opacity: 0 });
      TweenLite.set(this.$.goal, { opacity: 0 });
    }

    enter() {
      let goalPercentage = (total.value / this.goal.total) * 100;
      goalPercentage = Math.min(goalPercentage, 100);
      goalPercentage = Math.max(goalPercentage, 0);

      const tl = new TimelineLite();

      tl.to([this.$.body, this.$.total, this.$.goal], 0.75, {
        opacity: 1,
        ease: Power3.easeIn
      });
      tl.to(this.$.progressFill, 0.75, {
        width: `${goalPercentage}%`,
        ease: Power3.easeInOut
      });

      return tl;
    }

    exit() {
      const tl = new TimelineLite();
      tl.to(this, 0.75, { marginLeft: "-100%", ease: Power3.easeOut });
      return tl;
    }

    render() {
      const tl = new TimelineLite();
      if (total.value > this.goal.total) {
        return this.exit();
      }

      this.$.remaining.innerHTML =
        "$" +
        (this.goal.total - total.value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) +
        " remaining";

      return tl;
    }
  }

  customElements.define(TRMOmnibarGoal.is, TRMOmnibarGoal);
})();
