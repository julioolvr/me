import Head from 'next/head';

const Codepen = ({ id }) => {
  return (
    <div>
      <Head>
        <script async src="//codepen.io/assets/embed/ei.js" />
      </Head>

      <p
        data-height="265"
        data-theme-id="dark"
        data-slug-hash={id}
        data-default-tab="result"
        data-user="julioolvr"
        data-embed-version="2"
        data-pen-title="null"
        class="codepen"
      >
        See the Pen <a href="https://codepen.io/julioolvr/pen/klvdG/" /> by (<a href="http://codepen.io/julioolvr">
          @julioolvr
        </a>) on <a href="http://codepen.io">CodePen</a>.
      </p>
    </div>
  );
};

export default Codepen;
