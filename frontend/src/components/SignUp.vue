<template>
  <div class="signup-page">
    <div class="signup-form-container">
      <form @submit.prevent="handleSignUp">
        <h2>Sign Up</h2>
        <div class="input-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-success">Create Account</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleSignUp = () => {
  // Gerçek bir uygulamada burada sunucuya kayıt isteği gönderilir.
  console.log('Hesap oluşturuluyor:', name.value, email.value, password.value);
  // Başarılı kayıt sonrası login sayfasına yönlendirebiliriz.
  router.push('/login');
};
</script>

<style scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.signup-form-container {
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
  box-sizing: border-box;
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
</style> 