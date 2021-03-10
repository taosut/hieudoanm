import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/navbar';
import store from '../store';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
