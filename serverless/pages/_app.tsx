import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/navbar';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
