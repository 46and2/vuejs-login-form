<template>
  <div>
    <h1>{{ greeting }}</h1>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  props: {
    accessToken: {
      type: String
    }
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    fetchUserData() {
      this.axios
        .get("http://api2.denlam.ru/user/show", {
          headers: {
            Authorization: this.accessToken
          }
        })
        .then(response => {
          this.name = response.data.name;
        })
        .catch(error => {
          /* eslint-disable no-console */
          console.log(error);
          /* eslint-enable no-console */
        });
    }
  },
  computed: {
    greeting() {
      return this.name ? `Hello, ${this.name}!` : "";
    }
  },
  created() {
    this.fetchUserData();
  }
};
</script>

<style scoped>
h1 {
  color: #fafafa;
  text-align: center;
}
</style>