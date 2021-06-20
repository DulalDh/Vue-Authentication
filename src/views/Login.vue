<template>
  <div class="home">
    <input type="text" v-model="email" />
    <br />
    <br />
    <br />
    <input type="text" v-model="password" />
    <br />
    <br />
    <br />

    <button @click="loginRequest()" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    };
  },
  methods: {
    loginRequest() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("authentication/login", data)
        .then(response => {
          console.log("response: ", response);
          this.$router.push({ path: "/home" });
        })
        .catch(error => {
          console.log("error: ", error);
        });
    }
  }
};
</script>
