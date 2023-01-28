/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    firebaseConfig: {
      apiKey: "AIzaSyBu8zGxJD1mSyod2fniMkzFhYfq7iPd8tU",
      authDomain: "moodbox-app.firebaseapp.com",
      projectId: "moodbox-app",
      storageBucket: "moodbox-app.appspot.com",
      messagingSenderId: "878525091265",
      appId: "1:878525091265:web:a252e12cf3916e22b8b340",
    },
    githubRepo: "https://github.com/Seddouzy/moodbox",
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
