import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({ appId: 'bb8fb3ed-6c11-4dc4-b026-83d3d29e45ee', allowLocalhostAsSecureOrigin: true});
  OneSignal.showSlidedownPrompt();
}