import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <div className={css.logoSection}>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDB Logo"
            className={css.logo}
          />
        </div>

        <div className={css.linksSection}>
          <div className={css.column}>
            <h4>BASIS</h4>
            <ul>
              <li><a href="https://www.themoviedb.org/about" target="_blank" rel="noopener noreferrer">About TMDB</a></li>
              <li><a href="https://www.themoviedb.org/about/get-in-touch/" target="_blank" rel="noopener noreferrer"> Contact us</a></li>
              <li><a href="https://www.themoviedb.org/talk" target="_blank" rel="noopener noreferrer">Support Forums</a></li>
              <li><a href="https://developer.themoviedb.org/docs/getting-started" target="_blank" rel="noopener noreferrer">API Documentation</a></li>
              <li><a href="https://status.themoviedb.org/" target="_blank" rel="noopener noreferrer">System Status</a></li>
            </ul>
          </div>

          <div className={css.column}>
            <h4>CONTRIBUTE</h4>
            <ul>
              <li><a href="https://www.themoviedb.org/bible" target="_blank" rel="noopener noreferrer">Participation Application Book</a></li>
              <li><a href="https://www.themoviedb.org/movie/new" target="_blank" rel="noopener noreferrer">Add New Movie</a></li>
              <li><a href="https://www.themoviedb.org/tv/new" target="_blank" rel="noopener noreferrer">Add New Series</a></li>
            </ul>
          </div>

          <div className={css.column}>
            <h4>COMMUNITY</h4>
            <ul>
              <li><a href="https://www.themoviedb.org/bible/general#674f287930fc85cab62597b4" target="_blank" rel="noopener noreferrer">Instructions</a></li>
              <li><a href="https://www.themoviedb.org/discuss" target="_blank" rel="noopener noreferrer">Discussions</a></li>
              <li><a href="https://www.themoviedb.org/leaderboard" target="_blank" rel="noopener noreferrer">Highlights</a></li>
            </ul>
          </div>

          <div className={css.column}>
            <h4>LEGAL</h4>
            <ul>
              <li><a href="https://www.themoviedb.org/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use</a></li>
              <li><a href="https://www.themoviedb.org/api-terms-of-use" target="_blank" rel="noopener noreferrer">API Terms of Use</a></li>
              <li><a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://www.themoviedb.org/dmca-policy" target="_blank" rel="noopener noreferrer">DMCA Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
