import Document, { Head, Main, NextScript } from "next/document";
import { renderStatic } from "glamor/server";
import { style, rehydrate } from "glamor";
import { Navigation } from "../components/navigation";
import Footer from "../components/footer";
import colors from "../style/colors";
import typography from "../style/typography";

// Adds server generated styles to glamor cache.
if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}

export default class MyDocument extends Document {
  static async getInitialProps({ pathname, req, renderPage }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html);
    return {
      ...page,
      ...styles,
      pathname: (req && req.url) || pathname
    };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <link rel="stylesheet" type="text/css" href="/static/app.css" />
          <title>Kyle Cesmat - UI Engineer</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body
          {...style({
            padding: 0,
            margin: 0,
            overflowX: "hidden",
            fontFamily: typography.sans,
            background: colors.offwhite,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            "*": {
              boxSizing: "border-box"
            },
            " > nav": {
              flex: "0 0 auto"
            },
            "> nav + div": {
              flex: "1 1 100%"
            },
            " > footer": {
              flex: "0 0 auto"
            }
          })}
        >
          <Navigation pathname={this.props.pathname} />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </html>
    );
  }
}
