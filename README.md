# Movie Explorer

A React movie review app with TMDB live data, flip cards, dark/light themes, and user ratings.

## File Structure

```
MovieExplorer/
├── App.jsx          # Root component — wires everything together
├── Navbar.jsx       # Sticky nav with animated orbs, logo, search, toggle
├── GenreStrip.jsx   # Horizontal scrollable genre filter pills
├── MovieCard.jsx    # 3D flip card (front: poster / back: details + CTA)
├── MovieModal.jsx   # Full-detail modal with cast, scores, user rating
├── ThemeToggle.jsx  # Light/dark mode pill toggle
├── Loader.jsx       # Animated spinner (spinning arc + orbiting dot)
├── Stars.jsx        # Reusable star rating display / input
├── hooks.js         # useDebounce, useScrolled, useRatings
├── constants.js     # TMDB config, FALLBACK data, CARD_PALETTES, PILL_COLORS
└── README.md
```

## Features

- **TMDB API** — fetches popular movies and search results live; falls back to 12 classics if API is unavailable
- **Flip cards** — hover a card to flip it and see title, overview, rating, and "View Details" button
- **Movie modal** — backdrop hero image, full overview, runtime, cast with avatars, TMDB score, avg rating
- **User ratings** — 1–5 star rating per movie; locked after submission; averaged with TMDB score
- **Genre filter** — 12 genre pills, each with its own pastel color; active pill shows a colored gradient
- **Search** — debounced live search against TMDB search endpoint
- **Light / Dark theme** — smooth toggle; light uses pastel yellow/orange/pink/blue/green palette; dark uses muted navy/slate
- **Animated navbar** — floating ambient color orbs, slides in on load, gains frosted glass on scroll

## Usage

```jsx
// main.jsx or index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./MovieExplorer/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

## TMDB API

Uses Bearer token authentication. Replace `TMDB_TOKEN` in `constants.js` with your own token from [themoviedb.org](https://www.themoviedb.org/settings/api).
