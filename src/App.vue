<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" />

    <div class="wrapper">
      <HelloWorld msg="Vue on Amplify" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/api-test">API GET</RouterLink>
        <RouterLink to="/contact">API POST</RouterLink>
        <RouterLink to="/contacts-list">View Contacts</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 1.5rem;
  width: 100px;
  height: 100px;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 1.5rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  border-left: 1px solid var(--color-border);
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 768px) {
  .logo {
    width: 125px;
    height: 125px;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  nav a {
    padding: 0 1rem;
  }
}
</style>
