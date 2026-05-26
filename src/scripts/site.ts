import { onReady } from './utils';
import { initServiceWorker } from './pwa';

onReady(() => {
  initServiceWorker();
});
