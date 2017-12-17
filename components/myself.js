import Link from 'next/link';

const Myself = () => {
  return (
    <div className="myself">
      <p className="name">Julio Olivera</p>

      <p className="links">
        <a>me</a>
        <span className="separator">|</span>
        <a>blog</a>
        <span className="separator">|</span>
        <Link href="/things">
          <a>things</a>
        </Link>
        <span className="separator">|</span>
        <Link href="/talks">
          <a>talks</a>
        </Link>
        <span className="separator">|</span>
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

        .links {
          margin-top: 0;
        }

        .separator {
          margin: 0 0.2em;
        }
      `}</style>
    </div>
  );
};

export default Myself;
