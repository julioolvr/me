import Layout from '../components/layout';
import YoutubeVideo from '../components/youtubeVideo';
import Slideshare from '../components/slideshare';

const Talks = () => {
  return (
    <Layout>
      <div>
        <h1>GraphQL real-time con Subscriptions</h1>
        <p>
          <a href="https://www.meetup.com/GraphQL-BA/">@GraphQL BA</a>, April
          2017
        </p>
        <YoutubeVideo id="i35IQNQxzS8" />
      </div>

      <div>
        <h1>Intro a Ember.js</h1>
        <p>
          <a href="https://www.meetup.com/Meetup-js/">
            @Meetup.js Buenos Aires
          </a>, July 2014
        </p>
        <Slideshare slideKey="lvkd4A8NRRkD9M" />
      </div>
    </Layout>
  );
};

export default Talks;
