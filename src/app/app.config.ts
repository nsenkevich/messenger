import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideFunctions, getFunctions, connectFunctionsEmulator} from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      provideFunctions(() => getFunctions()),
      provideStorage(() => getStorage()),
      provideMessaging(() => getMessaging())
    ),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"messenger-826b9","appId":"1:227475481309:web:4aacfa942eb2b3db1ff134","storageBucket":"messenger-826b9.appspot.com","locationId":"europe-west2","apiKey":"AIzaSyAMaLLKSSvQOTaNcydkx5EfltFUQq0dfWM","authDomain":"messenger-826b9.firebaseapp.com","messagingSenderId":"227475481309","measurementId":"G-1BLCTW2WLW"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())
  ],
};
