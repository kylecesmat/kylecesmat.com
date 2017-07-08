import { Component } from 'react';
import { style, css } from 'glamor';
import classnames from 'classnames';
import currentInterests from '../../content/current-interests';
import colors from '../../style/colors';

export default class CurrentInterestsBoxes extends Component {
  state = {
    leftPos: 0,
    currentInterests: [],
  }

  componentDidMount() {
    this.getCarouselLeftPos();
    this.getCurrentInterests();
    window.addEventListener('resize', this.getCarouselLeftPos);
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  getCarouselLeftPos = () => {
    const leftPos = this.container.getBoundingClientRect().left;
    this.setState({ leftPos });
  }

  getCurrentInterests = () => {
    this.setState({ currentInterests });
  }

  getStyles() {
    const boxPadding = 10;

    const loadIn = css.keyframes('loadIn', {
      '0%': { transform: 'translateY(40px)', opacity: 0 },
      '70%': { transform: 'translateY(10px)', opacity: 0.8 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    })

    return ({
      container: style({
        margin: '30px auto',
      }),
      subtext: style({
        opacity: 0,
        marginBottom: 5,
        color: colors.darkGray,
        fontWeight: 500,
        fontSize: 14,
        animation: `350ms ease-in 900ms forwards ${loadIn}`,
      }),
      trackContainer: style({
        minHeight: 180,
      }),
      track: style({
        opacity: 0,
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        overflowX: 'scroll',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        animation: `350ms ease-in 1000ms forwards ${loadIn}`,
      }),
      leftSpacer: style({
        flex: `0 0 ${this.state.leftPos - boxPadding}px`,
      }),
      rightSpacer: style({
        flex: `0 0 ${boxPadding}px`,
      }),
      boxContainer: style({
        margin: boxPadding,
        backgroundColor: colors.white,
        padding: boxPadding,
        borderRadius: 4,
        flex: '0 0 240px',
      }),
      box: style({
        textAlign: 'center',
        color: colors.darkGray,
      }),
      boxGlyph: style({
        fontSize: 28
      }),
      boxHeadline: style({
        margin: 0,
        fontSize: 18,
      }),
      boxCopy: style({
        fontSize: 14,
        fontWeight: 200,
      }),
    });
  }

  render() {
    const styles = this.getStyles();
    return (
      <section
        className={styles.container}
        ref={(el) => this.container = el}
      >
        <div className={styles.subtext}>
          Things I'm excited about right now
        </div>
        <div className={styles.trackContainer}>
          <div className={styles.track}>
            <div className={styles.leftSpacer} />
            {this.state.currentInterests.map((datum, i) =>
              <div className={styles.boxContainer} key={i}>
                <div className={styles.box}>
                  <div className={styles.boxGlyph}>{datum.glyph}</div>
                  <h3 className={styles.boxHeadline}>{datum.headline}</h3>
                  <p className={styles.boxCopy}>{datum.copy}</p>
                </div>
              </div>
            )}
            <div className={styles.rightSpacer} />
          </div>
        </div>
      </section>
    );
  }
}