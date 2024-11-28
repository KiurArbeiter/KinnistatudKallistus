const vue = Vue.createApp({
    data() {
      return {
        hugInModal: {name: null},
        hugs: []
      }
    },
    async created() {
      this.hugs = await (await fetch('http://localhost:3001/hugs')).json();
    },
  methods: {
    getHug: async function (id) {
      this.hugInModal = await (await fetch(`http://localhost:8080/hugs`)).json()
      let hugInfoModal = new bootstrap.Modal(document.getElementById('hugInfoModal'), {})
      hugInfoModal.show()
    },
  }
  }).mount('#app')