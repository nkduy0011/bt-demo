<script setup></script>

<template>
  <header>
    <div class="wrapper">
      <div>EzStudy</div>
      <nav>
        <RouterLink to="/student">Student</RouterLink>
        <RouterLink to="/classroom">Class</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
@import "./App.scss";
</style>
