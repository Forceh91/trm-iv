class TRMOmnibarSocials extends Polymer.Element {
  static get is() {
    return "trm-omnibar-socials";
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();
  }

  enter(displayDuration) {
    const tl = new TimelineLite();

    // show social accounts
    tl.to(this.$.socials, 0.75, {
      opacity: 1,
      display: "block",
      ease: Power3.easeIn
    });
    tl.to(this, displayDuration, {});
    tl.to(this.$.socials, 0.75, {
      opacity: 0,
      display: "none",
      ease: Power3.easeOut
    });

    // show discord
    tl.to(this.$.discord, 0.75, {
      opacity: 1,
      display: "block",
      ease: Power3.easeIn
    });
    tl.to(this, displayDuration, {});
    tl.to(this.$.discord, 0.75, {
      opacity: 0,
      display: "none",
      ease: Power3.easeOut
    });

    return tl;
  }

  exit() {
    const tl = new TimelineLite();
    return tl;
  }
}

customElements.define(TRMOmnibarSocials.is, TRMOmnibarSocials);
