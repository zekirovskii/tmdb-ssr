import Head from "next/head";
import Hero from "@components/Hero/Hero";
import Trending from "@components/Trending/Trending";
import LatestTrailers from "@components/LatestTrailers/LatestTrailers";
import WhatsPopular from "@components/WhatsPopular/WhatsPopular";
import { fetchTrending, fetchTrailersByCategory, fetchWhatsPopular } from "@services/tmdbApi";

export default function Home({ trending, latestTrailers, whatsPopular }) {
  return (
    <>
      <Head>
        <title>TMDB</title>
        <meta name="description" content="Millions of movies, TV shows and people to discover. Explore now." />
      
      </Head>
      <Hero />
      <Trending items={trending} />
      <LatestTrailers initialTrailers={latestTrailers} />
      <WhatsPopular initialPopular={whatsPopular} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const trending = await fetchTrending();
    const latestTrailers = await fetchTrailersByCategory("popular");
    const whatsPopular = await fetchWhatsPopular("movie");

    return {
      props: { trending, latestTrailers, whatsPopular }, // ✅
    };
  } catch (error) {
    console.error("Home SSR Error:", error);
    return {
      props: { trending: [], latestTrailers: [], whatsPopular: [] },
    };
  }
}
