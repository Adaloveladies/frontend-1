<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import userGroupImg from '../assets/user-group.png';

const showDrawer = ref(false);
const rankings = [
  { username: 'ceylin2', points: 120 },
  { username: 'ayse', points: 110 },
  { username: 'mehmet', points: 95 },
  { username: 'zeynep', points: 80 },
  { username: 'ali', points: 60 }
];

const router = useRouter();
function goToCity() {
  router.push('/city');
}
function goToLogin() {
  router.push('/login');
}
function goToSignUp() {
  router.push('/signup');
}
</script>

<template>
  <div class="welcome-center">
    <img class="logo-img" src="/src/assets/WhatsApp Görsel 2025-06-20 saat 22.53.39_40691020.jpg" alt="Ada Lovelace Logo" />
    <div class="planora-title">PLANORA</div>
    <div class="btn-group">
      <button class="green-btn" @click="goToLogin">Log In</button>
      <button class="green-btn" @click="goToSignUp">Sign Up</button>
    </div>
    <button class="green-btn add-task-btn" @click="goToLogin">Add a Task</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');

.profile-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: transparent;
  position: relative;
}
.profile-card {
  background: rgba(56, 142, 60, 0.96);
  border-radius: 18px;
  box-shadow: 0 4px 24px #0008;
  padding: 36px 40px;
  min-width: 340px;
  max-width: 400px;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  position: relative;
}
.user-group-btn-inside {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 2px 8px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: box-shadow 0.2s;
}
.user-group-btn-inside:hover {
  box-shadow: 0 4px 16px #0004;
}
.user-group-btn-inside img {
  width: 28px;
  height: 28px;
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
.profile-card h2 {
  text-align: center;
  width: 100%;
  color: #fff;
  margin-bottom: 18px;
}
.profile-info {
  font-size: 1.1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
}
.profile-info strong {
  color: #fff;
}
.view-city-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  background: #69f0ae;
  color: #222;
  border: none;
  border-radius: 24px;
  padding: 14px 36px;
  font-size: 1.1em;
  font-weight: bold;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
  z-index: 50;
  transition: background 0.2s, box-shadow 0.2s;
}
.view-city-btn:hover {
  background: #00e676;
  box-shadow: 0 4px 16px #0004;
}
.welcome-center {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
}
.planora-title {
  font-family: 'Sacramento', cursive;
  font-size: 6.5rem;
  color: #388e3c;
  margin-bottom: 44px;
  letter-spacing: 3px;
}
.btn-group {
  display: flex;
  gap: 18px;
  margin-bottom: 24px;
}
.green-btn {
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 18px;
  padding: 20px 56px;
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #0002;
  transition: background 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.green-btn:hover {
  background: #388e3c;
  box-shadow: 0 4px 16px #43a04744;
}
.add-task-btn {
  margin-top: 16px;
  width: 100%;
  max-width: 340px;
}
.logo-img {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px #0002;
  background: #fff;
  z-index: 1001;
}
</style> 