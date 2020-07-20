import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <React.Fragment>
      <div>
        <Header currentUser={currentUser} />
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </React.Fragment>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx, client);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
