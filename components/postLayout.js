import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';

import Layout from '~/components/layout';
import LanguageSelector from '~/components/languageSelector';

class Post extends React.Component {
  state = {
    preferredLanguage: 'en' // TODO: move to Redux
  };

  switchLanguage(newLang) {
    this.setState({ preferredLanguage: newLang });
  }

  render() {
    const { title, date, langs = [], children, router } = this.props;
    const { preferredLanguage } = this.state;

    let lang;

    if (langs.length === 1) {
      lang = langs[0];
    } else if (router.query.lang && langs.includes(router.query.lang)) {
      lang = router.query.lang;

      if (preferredLanguage !== lang) {
        this.switchLanguage(lang);
      }
    } else if (preferredLanguage && langs.includes(preferredLanguage)) {
      lang = preferredLanguage;
    } else {
      lang = 'en';
    }

    return (
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>

        <div className="date">
          <time>{date}</time>
        </div>
        <h1 className={langs.length > 1 && 'has-multiple-langs'}>{title}</h1>
        {langs.length > 1 && <LanguageSelector langs={langs} lang={lang} />}

        <div className="post">{children({ lang })}</div>

        <style jsx>{`
          h1 {
            margin-top: 0;
          }

          .date {
            margin-top: 2em;
            color: #808080;
          }

          h1.has-multiple-langs {
            margin-bottom: 0;
          }

          .post :global(p) {
            margin: 2em 0;
            letter-spacing: 0.05em;
            line-height: 1.7em;
            font-family: 'Roboto', sans-serif;
          }

          .post :global(code) {
            font-family: 'Roboto Mono', monospace;
          }

          .post :global(b) {
            color: white;
          }
        `}</style>
      </Layout>
    );
  }
}

export default withRouter(Post);
