<template>
  <div>
    <form
      class="login-form"
      @submit.prevent="onLoginSubmit"
    >
      <input
        required
        v-model="user.username"
      />
      <input
        required
        type="password"
        v-model="user.password"
      />
      <ButtonComponent 
        :buttonText="'Login'"
        @click="onLoginSubmit"
      />
    </form>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import ButtonComponent from "./common/ButtonComponent.vue"

export default {
  components: { 
    ButtonComponent
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  computed: {
    u() {
      return Meteor.user()
    }
  },
  methods: {
    onLoginSubmit() {
      const {username, password} = this.user
      Meteor.loginWithPassword(username, password)
    },
  },
}
</script>