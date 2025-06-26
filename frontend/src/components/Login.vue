<template>
  <div class="login-page">
    <button class="signup-btn" @click="goToSignUp">Sign Up</button>
    <div class="login-form-container">
      <form @submit.prevent="handleLogin">
        <h2>Login</h2>
        <div class="input-group">
          <label for="email">Kullanıcı Adı</label>
          <input type="text" id="email" v-model="email" required placeholder="Kullanıcı adınızı girin">
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-success">Log In</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  // API isteği simülasyonu: her zaman başarılı
  setTimeout(() => {
    router.push('/profile');
  }, 500);
};

function goToSignUp() {
  router.push('/signup');
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form-container {
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  color: white;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #555;
  box-sizing: border-box; /* padding ve width'in doğru hesaplanması için */
  color: white;
  background-color: #333;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.signup-btn {
  position: absolute;
  top: 32px;
  right: 32px;
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 18px;
  padding: 14px 32px;
  font-size: 1.1em;
  font-weight: bold;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
  z-index: 1000;
  transition: background 0.2s, box-shadow 0.2s;
}
.signup-btn:hover {
  background: #388e3c;
  box-shadow: 0 4px 16px #43a04744;
}
</style> 