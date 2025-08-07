# 🎬 TMDB SSR Movie App

A responsive, server-side rendered movie and TV show search application using the [TMDB API](https://www.themoviedb.org/documentation/api), built with Next.js and Dockerized for production deployment.

---

## 📸 Preview

<!-- Insert screenshots here -->

![Homepage](/public/screenshots/homepage.png)
![Search Results](/public/screenshots/resultpage.png)
![Movie Detail](/public/screenshots/detailpage.png)
![Filter Menu](/public/screenshots/filterpage.png)

---

## 🚀 Features

- ✅ Server-Side Rendering with Next.js
- 🔍 Debounced search (fires after 500ms)
- ⭐️ Add/remove favorites (stored in localStorage)
- 🎞️ Filtering and sorting for movies and TV shows
- 🧾 Dynamic routes (`/movie/:id`, `/tv/:id`)
- 🐳 Dockerized setup for deployment
- 🌍 Fully responsive design

---

## 🧱 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TMDB API](https://developer.themoviedb.org/)
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support)
- [Docker](https://www.docker.com/)

---

## 🐳 Run with Docker

```bash
# Build the image
docker-compose build

# Run the application
docker-compose up
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

---

## 📦 Project Structure (Simplified)

```
📦 tmdb-ssr/
├── Dockerfile
├── docker-compose.yml
├── .env
├── .dockerignore
├── pages/
├── src/
│   └── components/
├── public/
│   └── screenshots/
└── ...

```

---

## 🚀 Deployment

You can deploy easily using [Vercel](https://vercel.com/):

1. Push project to GitHub
2. Connect it to Vercel
3. Set your `.env` variables
4. Deploy 🎉

---

## 👨‍💻 Developer

**Yusuf Şengöz**  
🔗 [LinkedIn](https://www.linkedin.com/in/yusuf-sengoz) | 🌐 [GitHub](https://github.com/zekirovskii)
