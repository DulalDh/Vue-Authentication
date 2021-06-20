<template>
  <div class="home">
    <button @click="logout()" class="btn btn-primary">logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    logout() {
      this.$store.dispatch("authentication/logout");
      this.$router.replace({ path: "/login" });
    }
  }
};
</script>
