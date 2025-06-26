<template>
  <div v-if="currentUser" class="user-status-widget">
    <span>{{ currentUser.name }}: <strong>{{ currentUser.points }}p</strong></span>
  </div>
  <div v-else class="user-status-widget loading">
    <span>Yükleniyor...</span>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { currentUser, fetchCurrentUser } from '../store/userState.js';

onMounted(async () => {
  await fetchCurrentUser();
});
</script>

<style scoped>
.user-status-widget {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #2e7d32;
  color: white;
  padding: 8px 16px;
  border-radius: 0 0 16px 0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1001; /* Diğer butonların üzerinde olmalı */
  font-size: 0.9em;
  font-weight: 500;
}

.user-status-widget.loading {
  background-color: #555;
}

.user-status-widget strong {
  font-weight: bold;
}
</style> 