import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDTF0VKDiSSyfxRf03lyg0OzZP7fGJGOT0',
  authDomain: 'sample-app-6b605.firebaseapp.com',
  projectId: 'sample-app-6b605',
  storageBucket: 'sample-app-6b605.appspot.com',
  messagingSenderId: '1060866789692',
  appId: '1:1060866789692:web:422cdbb29b3a623752ce39',
  databaseURL: 'https://sample-app-6b605-default-rtdb.firebaseio.com',
};

export const app = initializeApp(firebaseConfig);
