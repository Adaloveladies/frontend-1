<template>
  <UserStatus />
  <div class="city-layout">
    <button class="my-info-btn" @click="goToProfile">My Information</button>
    <h1 class="city-title">My City</h1>
    
    <!-- Binaları Listeleme Alanı -->
    <div class="buildings-container">
      <p v-if="isLoading">Binalar yükleniyor...</p>
      <div v-else-if="buildingCount > 0" class="building-list">
        <div v-for="(img, n) in buildingImages" :key="n" class="building-card">
          <img :src="img" alt="Bina" class="building-img" />
          <h3>Bina #{{ n + 1 }}</h3>
          <p>{{ getBuildingFloors(n + 1) }} katlı</p>
        </div>
      </div>
      <p v-else>Henüz hiç bina inşa edilmedi.</p>
    </div>

    <button class="create-building-btn" @click="goToCreateBuilding">create building</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserStatus from './UserStatus.vue';

const router = useRouter();
const isLoading = ref(false);

const totalCompletedTasks = ref(Number(localStorage.getItem('totalCompletedTasks') || 0));

const buildingCount = computed(() => Math.floor(totalCompletedTasks.value / 3));

const buildingImages = ref([]);
const buildingImageOptions = ['/build.png', '/build2.png'];

function getBuildingFloors(n) {
  if (n === buildingCount.value) {
    const mod = totalCompletedTasks.value % 3;
    return mod === 0 ? 3 : mod;
  }
  return 3;
}

function randomizeBuildingImages() {
  buildingImages.value = [];
  for (let i = 0; i < buildingCount.value; i++) {
    const idx = Math.floor(Math.random() * buildingImageOptions.length);
    buildingImages.value.push(buildingImageOptions[idx]);
  }
}

onMounted(() => {
  isLoading.value = false;
  totalCompletedTasks.value = Number(localStorage.getItem('totalCompletedTasks') || 0);
  randomizeBuildingImages();
});

function goToCreateBuilding() {
  router.push('/tasks');
}

function goToProfile() {
  router.push('/profile');
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

.city-layout {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 50px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.city-title {
  font-family: 'Caveat', cursive;
  font-size: 5rem;
  color: #333;
}

.create-building-btn {
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  z-index: 120;
}

.create-building-btn:hover {
  background: #00e676;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

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

.buildings-container {
  margin-top: 40px;
  width: 100%;
  max-width: 800px;
  background: none;
}

.building-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  background: none;
}

.building-card {
  background: none;
  border-radius: 12px;
  padding: 16px 8px 20px 8px;
  box-shadow: none;
  text-align: center;
  min-width: 0;
}

.building-card h3 {
  margin-top: 0;
  color: #2e7d32;
}

.building-card p {
  color: #111;
  font-weight: bold;
  margin-top: 6px;
}

.building-img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  display: block;
  margin: 0 auto 12px auto;
}
</style> 