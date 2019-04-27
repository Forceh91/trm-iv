(function() {
  const charity = nodecg.bundleConfig.charityName;
  const donateURL = nodecg.bundleConfig.donateLink;

  class TRMOmnibarCta extends Polymer.Element {
    static get is() {
      return "trm-omnibar-cta";
    }

    ready() {
      super.ready();

      Polymer.RenderStatus.beforeNextRender(this, () => {
        this.$.charity.innerHTML = charity;
        this.$.donateurl.innerHTML = donateURL;
      });
    }

    reset() {
      const tl = new TimelineLite();

      tl.set([this.$.benefits, this.$.donate], { opacity: 0 });
      return tl;
    }

    show(displayDuration) {
      const tl = new TimelineLite();
      tl.add(this.reset());

      // show benefits line
      tl.to(this.$.benefits, 0.75, { opacity: 1, ease: Power3.easeIn });
      tl.to(this, displayDuration, {});
      tl.to(this.$.benefits, 0.75, { opacity: 0, ease: Power3.easeOut });

      // show donate url
      tl.to(this.$.donate, 0.75, { opacity: 1, ease: Power3.easeOut });
      tl.to(this, displayDuration, {});
      tl.to(this.$.donate, 0.75, { opacity: 0, ease: Power3.easeOut });

      return tl;
    }
  }

  customElements.define(TRMOmnibarCta.is, TRMOmnibarCta);
})();
