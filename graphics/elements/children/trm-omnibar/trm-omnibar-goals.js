class TRMOmnibarGoals extends Polymer.Element {
  static get is() {
    return "trm-omnibar-goals";
  }

  static get properties() {
    return {
      goals: Array
    };
  }

  enter(displayDuration, scrollHoldDuration) {
    const tl = new TimelineLite();
    tl.to(this.$.goals, 0.75, { opacity: 1, ease: Power3.easeIn });

    this.goals.forEach((goal, index) => {
      const goalElement = document.createElement("trm-omnibar-goal");
      goalElement.goal = goal;
      this.$.goals.appendChild(goalElement);

      tl.call(
        () => {
          this.$.goals.select(index);
        },
        null,
        null,
        "+=0.03"
      );

      tl.call(() => {
        tl.pause();
        goalElement.render();

        const tempTl = goalElement.enter(displayDuration, scrollHoldDuration);
        tempTl.call(tl.resume, null, tl);
      });

      tl.call(
        () => {
          tl.pause();

          const tempTl = goalElement.exit();
          tempTl.call(tl.resume, null, tl);
        },
        null,
        null,
        `+=${displayDuration}`
      );
    });

    return tl;
  }

  exit() {
    const tl = new TimelineLite();
    return tl;
  }
}

customElements.define(TRMOmnibarGoals.is, TRMOmnibarGoals);
