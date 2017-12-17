import Link from 'next/link';

const LanguageSelector = ({ lang: selected, langs }) => {
  return (
    <div>
      [{langs
        .map(
          lang =>
            selected === lang ? (
              <span>{lang}</span>
            ) : (
              <Link href={`?lang=${lang}`}>
                <a>{lang}</a>
              </Link>
            )
        )
        .reduce((acc, lang) => [acc, '|', lang])}]
      <style jsx>{`
        a {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;
