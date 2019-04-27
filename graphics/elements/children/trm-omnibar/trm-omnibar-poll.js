const pollOptionHoldDuration = 10;

class TRMOmnibarPoll extends Polymer.Element {
  static get is() {
    return "trm-omnibar-poll";
  }

  static get properties() {
    return {
      poll: Object
    };
  }

  ready() {
    super.ready();

    TweenLite.set(this.$.pollOptions, { opacity: 0 });
  }

  enter(displayDuration, scrollHoldDuration) {
    const tl = new TimelineLite();

    tl.to(this.$.pollOptions, 0.75, { opacity: 1, ease: Power3.easeIn });

    let childrenWidths = [],
      totalWidth = 0;

    // get children
    let children = this.$.pollOptionsContainer.children,
      childObject = null;
    for (var child in children) {
      if (
        children.hasOwnProperty(child) === false ||
        (childObject = children[child]) === null
      ) {
        continue;
      }

      // ignore the template
      if (childObject.clientWidth == 0) {
        continue;
      }

      totalWidth += childObject.clientWidth + 5;
    }

    this.$.pollOptionsContainer.style.width = `${totalWidth}px`;

    if (totalWidth < this.$.pollOptions.clientWidth) {
      return tl;
    }

    let boundingRect = null,
      pollOptionsEnd = this.$.pollOptions.getBoundingClientRect().right,
      movementAmount = 0;
    for (var child in children) {
      if (
        children.hasOwnProperty(child) === false ||
        (childObject = children[child]) === null
      ) {
        continue;
      }

      // ignore the template
      if (childObject.clientWidth == 0) {
        continue;
      }

      boundingRect = childObject.getBoundingClientRect();
      if (boundingRect.right > pollOptionsEnd) {
        movementAmount = boundingRect.right - pollOptionsEnd + 100;
        if (this.$.pollOptionsContainer.style.marginLeft) {
          movementAmount += Math.abs(
            parseInt(this.$.pollOptionsContainer.style.marginLeft)
          );
        }

        // wait a bit and then move it into view (+ a bit more to be safe)
        tl.to(this, scrollHoldDuration, {});
        tl.to(this.$.pollOptionsContainer, 0.75, {
          marginLeft: `-${movementAmount}px`,
          ease: Power3.easeOut
        });

        // go back again to make sure everything has been shown
        tl.call(
          () => {
            this.enter(displayDuration, scrollHoldDuration);
          },
          null,
          null,
          "+=0.03"
        );
      }
    }

    // we've had to move stuff so holddddd!
    // if (movementAmount > 0) {
    //     tl.to(this, scrollHoldDuration, {});
    // }

    return tl;
  }

  exit() {
    const tl = new TimelineLite();
    tl.to(this, 0.75, { marginLeft: "-100%", ease: Power3.easeOut });
    return tl;
  }

  render() {}

  _sortPoll(a, b) {
    return b.total - a.total;
  }

  _sortedOptions(options) {
    options = options.slice(0);
    options = options.sort(function(a, b) {
      return b.totalAmountRaised - a.totalAmountRaised;
    });

    return options;
  }

  _displayTotal(total) {
    return "$" + total.toLocaleString("en-US", { minimumFractionDigits: 2 });
  }

  _displayClass(index) {
    if (index > 0) {
      return "body";
    }

    return "body is-winning";
  }
}

customElements.define(TRMOmnibarPoll.is, TRMOmnibarPoll);
