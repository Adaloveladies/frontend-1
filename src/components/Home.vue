<script setup>
import logoUrl from '../assets/WhatsApp Görsel 2025-06-20 saat 22.53.39_40691020.jpg';
</script>

<template>
  <div class="button-container">
    <img :src="logoUrl" alt="Company Logo" class="top-left-logo" />
    <h1 class="logo-text">PLANORA</h1>
    <div class="btn-group">
      <router-link to="/login" class="btn btn-success">Log In</router-link>
      <router-link to="/signup" class="btn btn-success">Sign Up</router-link>
    </div>
    <router-link to="/login" class="btn btn-success btn-add-task">Add a Task</router-link>
  </div>
</template>

<style scoped>
.top-left-logo {
  position: absolute;
  top: 20px;
  left: 40px;
  width: 150px;
  height: auto;
  border-radius: 50%;
}

.logo-text {
  font-family: 'Great Vibes', cursive;
  font-size: 8em;
  color: #28a745;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Sayfanın tamamını kaplaması için */
  background-color: transparent;
}

.btn-group {
  display: flex;
  width: 400px;
  margin-bottom: 15px; /* Buton grupları arasına boşluk ekler */
}

.btn-group .btn {
  flex: 1;
  margin: 0 5px; /* Butonlar arasına boşluk ekler */
}

.btn-add-task {
  width: 450px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
}

.btn-success {
  background-color: #28a745; /* Yeşil renk */
  color: white;
}

.btn-success:hover {
  background-color: #218838; /* Hover durumunda biraz daha koyu yeşil */
}
</style> 