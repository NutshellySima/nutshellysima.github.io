import './styles.css';
import { App } from './app';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.mount(document.getElementById('app')!);
});

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}
