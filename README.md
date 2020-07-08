# Todo desktop

Todo app, built with Electron, React and Firebase.

## Installation

```bash
npm install
```

## Build

1. Create new [firebase ](https://firebase.google.com/)project.

2. Rename **firebase.sample.ts** to **firebase.ts**

3. Replace _firebaseConfig_ with real credentials from firebase project.

```typescript
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
```

4. Build the project.

```bash
npm run react:build
npm run electron:build
```

## Development

```bash
npm run react:start
npm run electron:start
```

---

#### License - [MIT](https://choosealicense.com/licenses/mit/)
