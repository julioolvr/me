import Link from 'next/link';

const Myself = () => {
  return (
    <div className="myself">
      <p className="name">
        <Link href="/">
          <a>Julio Olivera</a>
        </Link>
      </p>

      <p className="links">
        <Link href="/me">
          <a>me</a>
        </Link>
        <span className="separator">|</span>
        <Link href="/b/2017/05/27/thoughts-about-vue-js">
          <a>blog</a>
        </Link>
        <span className="separator">|</span>
        <Link href="/things">
          <a>things</a>
        </Link>
        <span className="separator">|</span>
        <Link href="/talks">
          <a>talks</a>
        </Link>
        <span className="hide-on-small separator">|</span>
        <br className="show-on-small" />
        <a href="https://github.com/julioolvr">github</a>
        <span className="separator">|</span>
        <a href="https://twitter.com/julioolvr">twitter</a>
      </p>

      <style jsx>{`
        .myself {
          text-align: center;
        }

        .name {
          text-transform: uppercase;
          margin-bottom: 0;
        }

        .name a {
          color: #e3e3e3;
        }

        .links {
          margin-top: 0;
        }

        .separator {
          margin: 0 0.2em;
        }

        .show-on-small {
          display: none;
        }

        @media (max-width: 440px) {
          .show-on-small {
            display: initial;
          }

          .hide-on-small {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Myself;
