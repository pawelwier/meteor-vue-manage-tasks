<template>
  <div>
   <span>
     Logged in as {{user.username}}
    </span>
    <ButtonComponent
      :buttonText="'Logout'"
      @click="logout"
    />
  </div>
</template>

<script>
import ButtonComponent from "./common/ButtonComponent.vue"

export default  {
  components: {
    ButtonComponent
  },
  props: {
    user: {
      type: null,
      required: true,
    }
  },
  methods: {
    logout() {
      Meteor.logout()
    },
  },
}
</script>