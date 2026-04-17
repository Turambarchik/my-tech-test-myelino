# Myelino Technical Assessment

## 🚀 What is this?
A React Native (Expo) technical-assessment app for browsing and managing saved plans/events. It includes login, planner views, search/filter flows, and event deletion interactions backed by an API.

## 🎯 Problem it solves
This project demonstrates how to build a mobile planner experience that can fetch, organize, filter, and manage event data across multiple views. It exists as an implementation-focused assessment of architecture, state handling, and UI performance patterns in Expo.

## ✨ Key Features
- Login screen with credential submission to `/auth/sign-in` and token storage in global state.
- Planner screen that fetches plans, shows quick plans + month-grouped data, and supports text search with debounce.
- Chip-based filtering between quick plans and month sections, plus timeline-style grouped rendering.
- “All events saved” entry point with stacked thumbnails and planner-wide clear action.
- Events details screen with paginated/lazy loading (`ITEMS_PER_LOAD`) and in-place event deletion.
- Axios client with request/response interceptors that persist cookie headers via AsyncStorage.

## 🛠 Tech Stack
- React Native 0.74 + Expo 51
- Expo Router (file-based navigation)
- TypeScript
- easy-peasy (state management)
- Axios (API client)
- styled-components
- @shopify/flash-list

## ⚡ Quick Start
```bash
npm install
npm run start
```

For device targets:
```bash
npm run android
npm run ios
npm run web
```

## 📦 Scripts
- `npm run start` — start Expo dev server
- `npm run android` — open Android target
- `npm run ios` — open iOS target
- `npm run web` — run web target
- `npm run lint` — run Expo lint
- `npm run test` — run Jest tests (watch mode)
- `npm run reset-project` — reset starter project files

## 📌 Notes
- API base URL is configured in `config/axiosClient.ts`.
- Planner data is loaded from backend endpoints (for example `/plan`), and delete actions are optimistic with server sync fallback.
- Fonts are custom-loaded and referenced by theme/typography components.
