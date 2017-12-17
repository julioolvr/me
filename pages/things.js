import Layout from '~/components/layout';

const Things = () => {
  return (
    <Layout>
      <div className="thing">
        <div className="description">
          <h1>
            <a href="http://joliv.me/interval-practice/">Interval Practice</a>
          </h1>
          <p>Tool to learn and practice intervals between musical notes</p>
        </div>
        <a href="http://joliv.me/interval-practice/">
          <img src="/static/images/interval-practice.png" />
        </a>
      </div>

      <div className="thing">
        <div className="description">
          <h1>
            <a href="http://joliv.me/POM-Odoro/">POM-Odoro</a>
          </h1>
          <p>
            Small timer to follow the{' '}
            <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
              Pomodoro Technique
            </a>
          </p>
        </div>
        <a href="http://joliv.me/POM-Odoro/">
          <img src="/static/images/pom-odoro.png" />
        </a>
      </div>

      <div className="thing">
        <div className="description">
          <h1 className="long-name">
            <a href="http://blaquenkot.github.io/game-off-2013/">
              CH₃CH₂CH₂CH₂CH₃anges
            </a>
          </h1>
          <p>
            Game for{' '}
            <a href="https://github.com/blog/1674-github-game-off-ii">
              Github's Game Off II
            </a>
          </p>
        </div>
        <a href="http://blaquenkot.github.io/game-off-2013/">
          <img src="/static/images/changes.png" />
        </a>
      </div>

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
