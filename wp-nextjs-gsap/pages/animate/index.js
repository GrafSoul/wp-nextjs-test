import Head from "next/head";
import Link from "next/link";

// data
import { getAllPosts } from "../../lib/api";

import ToggleAnimate from "../../components/ToggleAnimate";
import RepeateAnimate from "../../components/RepeateAnimate";
import CircleAnimate from "../../components/CircleAnimate";
import BoxAnimate from "../../components/BoxAnimate";

// styles
import styles from "../../styles/Home.module.css";
import blogStyles from "../../styles/Blog.module.css";

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}

const Animate = ({ allPosts: { edges } }) => (
  <div className={styles.container}>
    <Head>
      <title>Animate page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Animate</h1>

      <ul className="menu">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/animate">
            <a>Animate</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Сontact</a>
          </Link>
        </li>
      </ul>
      <section>
        <ToggleAnimate />
        <RepeateAnimate />
        <CircleAnimate />
        <BoxAnimate />
      </section>
    </main>
  </div>
);

export default Animate;
