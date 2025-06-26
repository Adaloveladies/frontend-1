import { ref } from 'vue';
import { getUser } from '../components/fakeApi.js';

// Tüm uygulamanın erişebileceği reaktif kullanıcı verisi
export const currentUser = ref(null);

/**
 * Mevcut kullanıcı verisini API'den (simülasyon) çeker ve reaktif state'i günceller.
 * Simülasyon gereği her zaman ilk kullanıcıyı (ID: 1) "giriş yapmış" olarak kabul ediyoruz.
 */
export async function fetchCurrentUser() {
  // Kullanıcı zaten çekildiyse tekrar çekme
  if (currentUser.value) return;

  currentUser.value = await getUser(1); // Varsayılan kullanıcı ID'si
} 