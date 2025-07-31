import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import css from './Hero.module.css';
import { fetchTrending } from '@services/tmdbApi';

export default function Hero() {
  const [bgPath, setBgPath] = useState('');
  const [heroQuery, setHeroQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchTrending()
      .then(items => {
        if (items.length > 0) {
          const randomItem = items[Math.floor(Math.random() * items.length)];
          setBgPath(randomItem.backdrop_path || randomItem.poster_path);
        }
      })
      .catch(console.error);
  }, []);

  const backgroundStyle = bgPath
    ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${bgPath})` }
    : {};

  const handleHeroSearch = () => {
    const term = heroQuery.trim();
    if (term.length >= 3) {
      router.push(`/search/${encodeURIComponent(term)}`);
    }
  };

  return (
    <section 
      className={css.hero} 
      style={backgroundStyle}
    >
      <div className={css.overlay}>
        <div className={css.heroBack}>
          <h1>Welcome!</h1>
          <p>Millions of movies, TV shows and people to discover. Explore now.</p>
          <div className={css.searchBox}>
            <input
              type="text"
              className={css.inputHero}
              placeholder="Search for a movie, TV show or person..."
              value={heroQuery}
              onChange={(e) => setHeroQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHeroSearch()}
            />
            <button 
              className={css.buttonHero} 
              onClick={handleHeroSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
