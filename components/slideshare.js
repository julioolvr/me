const Slideshare = ({ slideKey }) => {
  return (
    <div className="wrapper">
      <iframe
        src={`//www.slideshare.net/slideshow/embed_code/key/${slideKey}`}
        frameBorder="0"
        marginWidth="0"
        marginHeight="0"
        scrolling="no"
        allowFullscreen
      />

      <style jsx>{`
        .wrapper {
          position: relative;
          padding-top: 56.25%;
        }

        iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default Slideshare;
