<template lang="html">
  <div class="">
    <form class="" v-on:submit.prevent="addBooking" method="post">
      <input type="text" v-model="name" required/>
      <input type="email" v-model="email" />
      <input type="checkbox" v-model="checked_in"/>
      <input type="submit" value="add booking" />
    </form>
  </div>
</template>

<script>
import { eventBus } from '@/main';
export default {
  name: "bookings-form",
  data(){
    return {
      name: "",
      email: "",
      checked_in: false
    }
  },
  methods: {
    addBooking(){
      const booking = {
        name: this.name,
        email: this.email,
        checked_in: this.checked_in
      }
      fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        body: JSON.stringify(booking),
        headers: { 'Content-Type': 'application/json'}
      })
      .then((res)=> res.json())
      .then((data) => {
        eventBus.$emit("booking-added", data)
      })
      this.name = this.email = ""
      this.checked_in = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
