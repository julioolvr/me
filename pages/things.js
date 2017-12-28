import Layout from '~/components/layout';

const Thing = ({ title, url, children, img }) => (
  <div className="thing">
    <div className="description">
      <h1>
        <a href={url}>{title}</a>
      </h1>
      <p>{children}</p>
    </div>
    <a href={url}>
      <img src={img} />
    </a>
  </div>
);

const Things = () => {
  return (
    <Layout>
      <Thing
        title="rlox"
        url="https://rlox-wasm.now.sh/"
        img="/static/images/rlox.png"
      >
        Lox interpreter from{' '}
        <a href="http://www.craftinginterpreters.com/">Crafting Interpreters</a>{' '}
        written in Rust and compiled to WebAssembly.
      </Thing>

      <Thing
        title="Interval Practice"
        url="http://joliv.me/interval-practice/"
        img="/static/images/interval-practice.png"
      >
        Tool to learn and practice intervals between musical notes
      </Thing>

      <Thing
        title="POM-Odoro"
        url="http://joliv.me/POM-Odoro/"
        img="/static/images/pom-odoro.png"
      >
        Small timer to follow the{' '}
        <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
          Pomodoro Technique
        </a>
      </Thing>

      <Thing
        title="CH₃CH₂CH₂CH₂CH₃anges"
        url="http://blaquenkot.github.io/game-off-2013/"
        img="/static/images/changes.png"
      >
        Game for{' '}
        <a href="https://github.com/blog/1674-github-game-off-ii">
          Github's Game Off II
        </a>
      </Thing>

      <style jsx>{`
        .long-name {
          // Because this one annoyingly overflows otherwise
          word-break: break-all;
        }

        @media (min-width: 45em) {
          .description {
            padding: 0 2em;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Things;
