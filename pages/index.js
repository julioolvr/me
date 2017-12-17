import Base from '~/components/base';
import Myself from '~/components/myself';

const Index = () => (
  <Base>
    <div className="content">
      <Myself />
    </div>

    <style jsx>{`
      .content {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </Base>
);

export default Index;
