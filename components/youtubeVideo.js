const YoutubeVideo = ({ id }) => {
  return (
    <div className="wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&amp;showinfo=0`}
        frameborder="0"
        gesture="media"
        allow="encrypted-media"
        allowfullscreen
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

export default YoutubeVideo;
