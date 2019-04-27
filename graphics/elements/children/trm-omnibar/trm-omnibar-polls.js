class TRMOmnibarPolls extends Polymer.Element {
  static get is() {
    return "trm-omnibar-polls";
  }

  static get properties() {
    return {
      polls: Array
    };
  }

  enter(displayDuration, scrollHoldDuration) {
    const tl = new TimelineLite();
    tl.to(this.$.polls, 0.75, { opacity: 1, ease: Power3.easeIn });

    this.polls.forEach((poll, index) => {
      const pollElement = document.createElement("trm-omnibar-poll");
      pollElement.poll = poll;

      this.$.polls.appendChild(pollElement);

      tl.call(
        () => {
          this.$.polls.select(index);
        },
        null,
        null,
        "+=0.03"
      );

      tl.call(() => {
        tl.pause();
        pollElement.render();

        const tempTl = pollElement.enter(displayDuration, scrollHoldDuration);
        tempTl.call(tl.resume, null, tl);
      });

      tl.call(
        () => {
          tl.pause();

          const tempTl = pollElement.exit();
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

customElements.define(TRMOmnibarPolls.is, TRMOmnibarPolls);
