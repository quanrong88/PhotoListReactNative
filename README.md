# 📷 React Native Cross-Platform Photo App

## 📌 Purpose

This project is built to **practice cross-platform development** using React Native and Expo. It showcases:

- Cross-platform compatibility (iOS, Android, Web)
- Reusable components
- Pagination & API-based search
- Image caching
- Responsive and adaptive layout handling

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**
- **npm** or **yarn**
- **Expo CLI** (install with `npm install -g expo-cli`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Start the Project

```bash
npx expo start
```

- Press `i` to open in iOS simulator
- Press `a` for Android emulator
- Press `w` to open Web app in browser

---

## 💡 Key Features

- Infinite scroll with dynamic pagination
- Search photos via API call (not just filter)
- Platform-aware page size:  
  - `PAGE_SIZE = 10` on mobile  
  - `PAGE_SIZE = 50` on web
- Image caching with `react-native-expo-image-cache`
- Clean UI with:
  - Cached thumbnails
  - Title display
  - Consistent styling
- Navigation with custom header handling

---

## 📁 Project Structure

```
.
├── components/         # UI Components (PhotoItem, etc.)
├── screens/            # Screens (PhotoListScreen, PhotoDetailScreen)
├── services/           # API service (apiService.js)
├── styles/             # Shared style definitions
├── App.js              # Navigation and entry point
└── README.md
```

---

## 📦 Dependencies

- `expo`
- `react-native`
- `@react-navigation/native`
- `@react-navigation/stack`
- `redux-toolkit`
- `lodash.debounce`
- `react-native-expo-image-cache`
- `@fortawesome/react-native-fontawesome`

---

## 🧪 Development Notes

- Uses **`fetch` API** for network calls via `apiService.js`
- Layout adapted to match design attachments
- Navigation bar hidden on PhotoList screen
- Proper image aspect ratio maintained
- Web layout fixes for center alignment and scroll indicator position
- UI responsive with left/right padding and vertical centering
- ScrollView background fixed (no gray background issue)

---

## 🧠 Learnings & Practice

This project helps reinforce:

- How to organize a clean cross-platform React Native project
- Building reusable components
- Proper use of `useEffect`, `useState`, and `FlatList` for efficient rendering
- Handling scroll and search events effectively
- Managing layout differences between web and mobile

---

## 📞 Support

If you have issues running the project, try:

```bash
npm audit fix
npx expo doctor
```

Or open an issue in your repository.

---