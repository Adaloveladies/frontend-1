<template>
  <UserStatus />
  <div class="city-tasks-layout">
    <!-- Sol üstte view city butonu -->
    <button class="my-info-btn" @click="goToCity">view city</button>
    
    <!-- Görev Listesi ve Ekleme -->
    <div class="tasks-panel">
      <h2>Yapılacaklar Listesi</h2>
      <form @submit.prevent="handleAddTask" class="add-task-form">
        <input v-model="newTaskText" type="text" placeholder="Yeni görev ekle..." :disabled="isCreating" />
        <button type="submit" :disabled="isCreating">
          {{ isCreating ? 'Ekleniyor...' : 'Ekle' }}
        </button>
      </form>
      
      <p v-if="isLoading">Görevler yükleniyor...</p>
      
      <ul v-else class="tasks-list">
        <li v-for="task in tasks" :key="task.id" :class="{ done: task.done, saving: updatingTaskId === task.id || deletingTaskId === task.id }">
          <label>
            <input 
              type="checkbox" 
              v-model="task.done" 
              @change="handleToggleTask(task)"
              :disabled="updatingTaskId === task.id || deletingTaskId === task.id"
            />
            <span>{{ task.text }}</span>
          </label>
          <button 
            @click="handleDeleteTask(task.id)" 
            class="delete-btn"
            :disabled="updatingTaskId === task.id || deletingTaskId === task.id"
          >
            🗑️
          </button>
        </li>
      </ul>
       <p v-if="!isLoading && tasks.length === 0" class="empty-state">Henüz görev yok. İlk görevinizi ekleyin!</p>
    </div>

    <!-- Bina Paneli -->
    <div class="building-panel">
      <div class="building-stack">
        <!-- Katlar aşağıdan yukarıya -->
        <div v-for="n in completedCount" :key="n" class="building-floor">
          Kat {{ n }}
        </div>
        <!-- Tüm görevler tamamlanınca çatı en üstte -->
        <template v-if="isAllDone">
          <svg class="building-roof" width="170" height="50" viewBox="0 0 160 50">
            <polygon points="0,50 80,0 160,50" fill="#b71c1c" stroke="#880000" stroke-width="6" />
          </svg>
        </template>
      </div>
      <div class="building-label" v-if="completedCount > 0">Bina Katı: {{ completedCount }}</div>
    </div>

    <!-- Sağ alt köşede refresh butonu -->
    <button class="refresh-btn" @click="refreshTasks">refresh</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { listTasks, createTask, updateTask, deleteTask, addPointsToUser } from './fakeApi.js';
import UserStatus from './UserStatus.vue';
import { currentUser, fetchCurrentUser } from '../store/userState.js';

const router = useRouter();
const tasks = ref([]);
const newTaskText = ref('');

const isLoading = ref(true);
const isCreating = ref(false);
const updatingTaskId = ref(null);
const deletingTaskId = ref(null);
const totalCompletedTasks = ref(Number(localStorage.getItem('totalCompletedTasks') || 0));

async function syncBuildingFloors() {
  const floorCount = tasks.value.filter(t => t.done).length;
  localStorage.setItem('buildingFloors', floorCount);
}

onMounted(async () => {
  isLoading.value = true;
  await fetchCurrentUser(); // Mevcut kullanıcıyı yükle
  tasks.value = await listTasks();
  if (tasks.value.length === 0) {
    await createTask({ text: 'Sabah sporu yap' });
    await createTask({ text: 'Kitap oku' });
    tasks.value = await listTasks();
  }
  isLoading.value = false;
  await syncBuildingFloors();
});

async function handleAddTask() {
  if (!newTaskText.value.trim()) return;
  isCreating.value = true;
  const createdTask = await createTask({ text: newTaskText.value });
  tasks.value.push(createdTask);
  newTaskText.value = '';
  isCreating.value = false;
  await syncBuildingFloors();
}

async function handleToggleTask(task) {
  // Sadece görevi "tamamlandı" olarak işaretlerken puan ekle
  if (task.done === false) {
    updatingTaskId.value = task.id;
    await updateTask(task.id, { done: task.done });
    updatingTaskId.value = null;
    await syncBuildingFloors();
    return;
  }

  updatingTaskId.value = task.id;

  // Puanlama mantığı
  const completedCountBefore = tasks.value.filter(t => t.done && t.id !== task.id).length;
  const completedCountAfter = completedCountBefore + 1;

  let pointsToAdd = 10;
  let message = "+10 puan (Görev Tamamlama)";
  
  if (completedCountAfter > 0 && completedCountAfter % 3 === 0) {
    pointsToAdd += 20;
    message += ", +20 puan (Bina İnşaatı)";
  }

  if (currentUser.value) {
    console.log(message);
    const updatedUser = await addPointsToUser(currentUser.value.id, pointsToAdd);
    currentUser.value = updatedUser; // Merkezi state'i güncelle
  }

  // Görevin kendisini güncelle
  await updateTask(task.id, { done: task.done });
  updatingTaskId.value = null;
  await syncBuildingFloors();

  // Toplam tamamlanan görev sayısını artır
  totalCompletedTasks.value++;
  localStorage.setItem('totalCompletedTasks', totalCompletedTasks.value);

  // 9 görev tamamlandıysa görevleri sıfırla (kullanıcı yeni görevler ekleyebilsin)
  if (completedCount.value > 0 && completedCount.value % 9 === 0 && tasks.value.every(t => t.done)) {
    setTimeout(async () => {
      for (const task of tasks.value) {
        await deleteTask(task.id);
      }
      tasks.value = [];
      await syncBuildingFloors();
    }, 1000);
  }
}

async function handleDeleteTask(id) {
  const taskToDelete = tasks.value.find(t => t.id === id);
  let pointsToRemove = 0;
  if (taskToDelete && taskToDelete.done) {
    // Silinen görev tamamlanmışsa 10 puan sil
    pointsToRemove = 10;
    // Silinen görevden sonra kalan tamamlanmış görev sayısı bina tamamlanmasına denk geliyorsa 20 puan daha sil
    const completedCountAfterDelete = tasks.value.filter(t => t.done && t.id !== id).length;
    if ((completedCountAfterDelete + 1) % 3 === 0) {
      pointsToRemove += 20;
    }
    if (currentUser.value) {
      const updatedUser = await addPointsToUser(currentUser.value.id, -pointsToRemove);
      currentUser.value = updatedUser;
    }
  }
  deletingTaskId.value = id;
  await deleteTask(id);
  tasks.value = tasks.value.filter(t => t.id !== id);
  deletingTaskId.value = null;
  await syncBuildingFloors();
}

const completedCount = computed(() => tasks.value.filter(t => t.done).length);
const buildingCount = computed(() => Math.floor(totalCompletedTasks.value / 3));
const isAllDone = computed(() => tasks.value.length > 0 && completedCount.value === tasks.value.length);

function goToCity() {
  router.push('/city');
}

async function refreshTasks() {
  // Tüm görevleri sil, puan eksiltme!
  for (const task of tasks.value) {
    await deleteTask(task.id);
  }
  tasks.value = [];
  await syncBuildingFloors();
  // Bina geçmişi (totalCompletedTasks) korunur
}
</script>

<style scoped>
.city-tasks-layout {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 80px 24px;
  gap: 48px;
  position: relative;
}

/* BUTONLAR */
.my-info-btn {
  position: fixed;
  top: 40px;
  left: 0;
  background: #b9f6ca;
  color: #222;
  border: none;
  border-radius: 0 0 18px 0;
  padding: 14px 32px;
  font-size: 1.1em;
  font-weight: bold;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  z-index: 1000;
  transition: background 0.2s, box-shadow 0.2s;
}
.my-info-btn:hover {
  background: #69f0ae;
  box-shadow: 0 4px 16px rgba(0, 230, 118, 0.27);
}


/* GÖREV PANELİ */
.tasks-panel {
  background: #fff;
  color: #333;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 36px 32px;
  min-width: 340px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tasks-panel h2 {
  margin-bottom: 18px;
  font-size: 1.6em;
  font-weight: bold;
  color: #2e7d32;
}
.add-task-form {
  display: flex;
  width: 100%;
  margin-bottom: 18px;
  gap: 8px;
}
.add-task-form input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1em;
}
.add-task-form button {
  background: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.add-task-form button:hover {
  background: #1b5e20;
}
.tasks-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
.tasks-list li {
  background: #f1f8e9;
  color: #222;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s, opacity 0.2s;
}
.tasks-list li.done {
  background: #c8e6c9;
  text-decoration: line-through;
  color: #777;
}
.tasks-list li.saving {
  opacity: 0.6;
  background-color: #f0f0f0;
}
.tasks-list input[type="checkbox"] {
  margin-right: 12px;
  accent-color: #43a047;
  width: 20px;
  height: 20px;
}

.tasks-list li label {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 5px;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.tasks-list li:hover .delete-btn {
  opacity: 1;
}

.tasks-list li:hover {
  background-color: #e0e0e0;
}

.delete-btn:disabled {
  cursor: not-allowed;
}

/* BİNA PANELİ */
.building-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-width: 200px;
  padding-top: 50px;
}
.building-stack {
  display: flex;
  flex-direction: column-reverse; /* Katlar aşağıdan yukarıya dizilir */
  align-items: center;
}
.building-floor {
  width: 160px;
  height: 60px;
  background-color: #7cb342;
  border: 3px solid #33691e;
  border-radius: 10px;
  margin-top: -5px; /* Katları üst üste bindir */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}
.building-roof {
  width: 170px;
  z-index: 2;
  margin-bottom: -5px;
}
.building-label {
  font-size: 1.2em;
  color: #2e7d32;
  font-weight: bold;
  margin-top: 24px;
  background: #fff;
  padding: 8px 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.empty-state {
  text-align: center;
  margin-top: 20px;
  color: #888;
}

.refresh-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 16px 38px;
  font-size: 1.1em;
  font-weight: bold;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
  z-index: 120;
  transition: background 0.2s, box-shadow 0.2s;
}
.refresh-btn:hover {
  background: #b71c1c;
  box-shadow: 0 4px 16px #e5393544;
}
</style> 