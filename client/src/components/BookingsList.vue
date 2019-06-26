<template lang="html">
  <div class="">
    <ul>
      <li v-for="booking in bookings">
        <p>{{ booking.name }}</p>
        <p>{{ booking.email}}</p>
        <p>checked in: {{ booking.checked_in}}</p>
        <button type="button" v-on:click="deleteBooking (booking)">Delete Booking</button>
        <button v-if="booking.checked_in" v-on:click="handleChange(booking)">Check Out</button>
        <button v-if="!booking.checked_in" v-on:click="handleChange(booking)">Check In</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { eventBus } from '@/main'

export default {
  name: "bookings-list",
  props: ["bookings"],

  methods: {
    deleteBooking(targetBooking){
      const id=targetBooking._id
      fetch("http://localhost:3000/api/bookings/" + id, {
        method: "DELETE"
      })
      .then((res) => res.json())
      .then((res) => {
        eventBus.$emit("delete-booking", id)
      })
    },

    handleChange(booking){
      const edited = {
        checked_in: !booking.checked_in
      }
      const id = booking._id
      fetch("http://localhost:3000/api/bookings/" + id, {
        method: "PUT",
        body: JSON.stringify(edited),
        headers: { 'Content-Type': 'application/json'}
      })
      .then((res) => res.json())
      .then((res) => {
        eventBus.$emit("update-booking", id)
      })
    }
  }

}
</script>

<style lang="css" scoped>
</style>
