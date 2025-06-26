// Basit bir görev API simülasyonu
const STORAGE_KEY = 'tasks';

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function delay(ms = 700) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function listTasks() {
  await delay();
  return getTasksFromStorage();
}

export async function getTask(id) {
  await delay();
  const tasks = getTasksFromStorage();
  return tasks.find(t => t.id === id) || null;
}

export async function createTask(task) {
  await delay();
  const tasks = getTasksFromStorage();
  const newTask = { ...task, id: Date.now(), done: false };
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  return newTask;
}

export async function updateTask(id, updates) {
  await delay();
  const tasks = getTasksFromStorage();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  saveTasksToStorage(tasks);
  return tasks[idx];
}

export async function completeTask(id) {
  return updateTask(id, { done: true });
}

export async function deleteTask(id) {
  await delay();
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t.id !== id);
  saveTasksToStorage(tasks);
  return true;
}

// --- Şehir API Simülasyonu ---
const CITIES_STORAGE_KEY = 'cities';

function getCitiesFromStorage() {
  const cities = localStorage.getItem(CITIES_STORAGE_KEY);
  if (!cities) {
    // Başlangıç için örnek bir şehir
    const initialCities = [{ id: 1, name: 'İstanbul', population: 15000000 }];
    localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(initialCities));
    return initialCities;
  }
  return JSON.parse(cities);
}

function saveCitiesToStorage(cities) {
  localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(cities));
}

/**
 * Şehirleri listeler (GET /api/cities simülasyonu)
 */
export async function listCities() {
  await delay();
  return getCitiesFromStorage();
}

/**
 * Yeni bir şehir oluşturur (POST /api/cities simülasyonu)
 * @param {object} cityData - { name: string, population: number }
 */
export async function createCity(cityData) {
  await delay(1000); // Oluşturma işlemi biraz daha uzun sürsün
  const cities = getCitiesFromStorage();
  const newCity = {
    ...cityData,
    id: Date.now(),
  };
  cities.push(newCity);
  saveCitiesToStorage(cities);
  return newCity;
}

// --- Kullanıcı API Simülasyonu ---
const USERS_STORAGE_KEY = 'users';

function getUsersFromStorage() {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  if (!users) {
    // Başlangıç için örnek kullanıcılar
    const initialUsers = [
      { id: 1, name: 'Ceylin Ada', email: 'ceylin@example.com', points: 120 },
      { id: 2, name: 'Ayşe Yılmaz', email: 'ayse@example.com', points: 110 },
      { id: 3, name: 'Mehmet Öztürk', email: 'mehmet@example.com', points: 95 },
    ];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }
  return JSON.parse(users);
}

function saveUsersToStorage(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

/**
 * Tüm kullanıcıları listeler (GET /api/users simülasyonu)
 */
export async function listUsers() {
  await delay();
  return getUsersFromStorage();
}

/**
 * Belirli bir kullanıcının detayını getirir (GET /api/users/:id simülasyonu)
 * @param {number} id - Kullanıcı ID'si
 */
export async function getUser(id) {
  await delay(500);
  const users = getUsersFromStorage();
  return users.find(u => u.id === id) || null;
}

/**
 * Bir kullanıcının bilgilerini günceller (PUT /api/users/:id simülasyonu)
 * @param {number} id - Kullanıcı ID'si
 * @param {object} updates - Güncellenecek alanlar
 */
export async function updateUser(id, updates) {
  await delay();
  const users = getUsersFromStorage();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  // 'id' alanının güncellenmesini engelle
  delete updates.id;
  users[idx] = { ...users[idx], ...updates };
  saveUsersToStorage(users);
  return users[idx];
}

/**
 * Bir kullanıcıya puan ekler (POST /api/users/:id/add-points simülasyonu)
 * @param {number} id - Kullanıcı ID'si
 * @param {number} pointsToAdd - Eklenecek puan
 */
export async function addPointsToUser(id, pointsToAdd) {
  await delay(400);
  const users = getUsersFromStorage();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx].points += pointsToAdd;
  saveUsersToStorage(users);
  return users[idx];
} 