<template>
  <div id="app">
    <bookings-form/>
    <bookings-list :bookings="bookings"/>

  </div>
</template>

<script>

import BookingsList from './components/BookingsList.vue'
import BookingsForm from './components/BookingsForm.vue'
import { eventBus } from './main.js'

export default {
  name: 'app',
  data(){
    return {
      bookings: [],
      newData: ""
    }
  },
  components: {
    'bookings-list': BookingsList,
    'bookings-form': BookingsForm
  },
  mounted(){
    fetch('http://localhost:3000/api/bookings')
    .then((res) => res.json())
    .then((data) => this.bookings = data)

    eventBus.$on("booking-added", (data) => {
      this.bookings.push(data)
    })

    eventBus.$on("delete-booking", (id) => {
      this.deleteBooking(id)
    })

    eventBus.$on("update-booking", (id) => {
      this.updateBooking(id)
    })
  },
  methods: {
    deleteBooking(id){
      for (let i = 0; i < this.bookings.length; i++){
        const booking = this.bookings[i]
        if (id == booking._id){
          this.bookings.splice(i,1)
        }
      }
    },
    updateBooking(id){
      for (let i = 0; i < this.bookings.length; i++){
        const booking = this.bookings[i]
        if (id == booking._id){
          this.bookings[i].checked_in = !(this.bookings[i].checked_in)
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
