import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

// data
import { getAllPostsWithSlug, getPost } from "../../lib/api";

// styles
import styles from "../../styles/Home.module.css";
import blogStyles from "../../styles/Blog.module.css";

export default function Post({ postData }) {
  const router = useRouter();

  if (!router.isFallback && !postData?.slug) {
    return <p>hmm... looks like an error</p>;
  }

  const formatDate = (date) => {
    const newDate = new Date(date);

    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
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
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
        {router.isFallback ? (
          <h2>Loading...</h2>
        ) : (
          <article className={blogStyles.article}>
            <div className={blogStyles.postmeta}>
              <h1 className={styles.title}>{postData.title}</h1>
              <div
                className="post-content content"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </div>
          </article>
        )}

        <p>
          <Link href="/blog">
            <a>back to articles</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);
  return {
    props: {
      postData: data.post,
    },
  };
}
