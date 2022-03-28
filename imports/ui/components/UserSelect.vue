<template>
  <select
    v-model="selectedUser"
    @change="onUserSelect"
  >
    <option 
      v-for="(user, i) in users"
      :key="i"
      :value="user"
    >
      {{user.username}}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedUser: null,
    }
  },
  methods: {
    onUserSelect() {
      this.$emit('userSelected', this.selectedUser)
    }
  }
}
</script>