import Head from 'next/Head';
import Link from 'next/Link';
import Image from 'next/Image';

import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout home={false}>
      <Head>
        <title>POST</title>
      </Head>
      <h1>First Post</h1>
      <Image
        src="/images/profile.jpg" // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
