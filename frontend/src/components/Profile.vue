<template>
  <div class="profile-center">
    <!-- Sol tarafta Geri butonu -->
    <button class="back-btn" @click="goToLogin">&larr; Geri</button>

    <!-- Sol üstte kullanıcı grubu butonu -->
    <button class="user-group-btn" @click="openDrawer">
      <img src="/src/assets/user-group.png" alt="Kullanıcılar" />
    </button>
    <div class="profile-card">
      <h2>Kullanıcı Profili</h2>
      <div class="profile-info">
        <div><strong>Ad Soyad:</strong> {{ currentUser?.name || '-' }}</div>
        <div><strong>Email:</strong> {{ currentUser?.email || '-' }}</div>
        <div><strong>Puan:</strong> {{ currentUser?.points ?? '-' }}</div>
        <div><strong>Şehir:</strong> İstanbul</div>
        <div><strong>Tamamlanan Görev:</strong> {{ completedCount }}</div>
        <div><strong>Bina Sayısı:</strong> {{ buildingCount }}</div>
      </div>
    </div>
    <!-- Soldan kayan kullanıcı sıralama paneli -->
    <div class="drawer" :class="{ open: showDrawer }">
      <div class="drawer-header">
        <span>Kullanıcı Sıralaması</span>
        <button class="close-btn" @click="showDrawer = false">×</button>
      </div>
      <div class="ranking-list">
        <div class="ranking-item" v-for="(user, i) in sortedUsers" :key="user.id">
          <span class="rank">#{{ i + 1 }}</span>
          <span class="name">{{ user.name }}</span>
          <span class="points">{{ user.points }} puan</span>
        </div>
      </div>
    </div>
    <!-- Sağ alt köşede View City butonu -->
    <button class="view-city-btn" @click="goToCity">View City</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { listTasks, listUsers } from './fakeApi.js';
import { currentUser, fetchCurrentUser } from '../store/userState.js';

const router = useRouter();
const showDrawer = ref(false);
const users = ref([]);

const totalCompletedTasks = ref(Number(localStorage.getItem('totalCompletedTasks') || 0));
const completedCount = computed(() => totalCompletedTasks.value);
const buildingCount = computed(() => Math.floor(totalCompletedTasks.value / 3));

const tasks = ref([]);

const sortedUsers = computed(() => {
  return [...users.value].sort((a, b) => b.points - a.points);
});

onMounted(async () => {
  await fetchCurrentUser();
  tasks.value = await listTasks();
  users.value = await listUsers();
  totalCompletedTasks.value = Number(localStorage.getItem('totalCompletedTasks') || 0);
});

async function openDrawer() {
  showDrawer.value = true;
  users.value = await listUsers(); // Her açılışta güncel puanları çek
}

function goToCity() {
  router.push('/city');
}
function goToLogin() {
  router.push('/login');
}
</script>

<style scoped>
.profile-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  position: relative;
}
.profile-card {
  background: #e8f5e9;
  border-radius: 24px;
  box-shadow: 0 4px 24px #0002;
  padding: 44px 48px;
  min-width: 340px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #222;
  position: relative;
}
.profile-card h2 {
  text-align: center;
  width: 100%;
  color: #388e3c;
  margin-bottom: 24px;
}
.profile-info {
  font-size: 1.2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.profile-info strong {
  color: #388e3c;
}
.back-btn {
  position: fixed;
  top: 65px;
  left: 0;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 0 18px 18px 0;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  cursor: pointer;
  z-index: 110;
  transition: background 0.2s, box-shadow 0.2s;
}
.back-btn:hover {
  background: #e0e0e0;
}
.user-group-btn {
  position: fixed;
  left: 0;
  top: 0;
  transform: none;
  width: 56px;
  height: 56px;
  border-radius: 0 0 28px 0;
  border: none;
  background: #fff;
  box-shadow: 2px 2px 8px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 120;
  transition: box-shadow 0.2s;
  padding: 0;
}
.user-group-btn:hover {
  box-shadow: 0 4px 16px #0004;
}
.user-group-btn img {
  width: 32px;
  height: 32px;
}
.drawer {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 16px #0002;
  z-index: 100;
  transition: left 0.3s cubic-bezier(.4,2,.6,1);
  display: flex;
  flex-direction: column;
  padding: 0;
}
.drawer.open {
  left: 0;
}
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 10px 24px;
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2em;
  color: #888;
  cursor: pointer;
  line-height: 1;
}
.ranking-list {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ranking-item {
  background: #e8f5e9;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1em;
  box-shadow: 0 2px 8px #0001;
}
.rank {
  font-weight: bold;
  color: #388e3c;
  font-size: 1.2em;
  width: 32px;
  text-align: center;
}
.name {
  flex: 1;
  color: #222;
}
.points {
  color: #388e3c;
  font-weight: bold;
}
.view-city-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  background: #69f0ae;
  color: #222;
  border: none;
  border-radius: 28px;
  padding: 18px 38px;
  font-size: 1.2em;
  font-weight: bold;
  box-shadow: 0 4px 16px #0002;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  z-index: 120;
}
.view-city-btn:hover {
  background: #00e676;
  box-shadow: 0 8px 24px #0003;
}
</style> 