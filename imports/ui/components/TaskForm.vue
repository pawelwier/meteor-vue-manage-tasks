<template>
  <div>
    <form @submit.prevent="onSubmitTask">
      <input v-model="taskText" />
      <UserSelect 
        :users="users"
        @userSelected="onUserSelect"
      />
      <ButtonComponent 
        :buttonText="'Create task'"
        :type="'submit'"
        @click="onSubmitTask"
      />
    </form>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import ButtonComponent from './common/ButtonComponent.vue'
import UserSelect from './UserSelect.vue'
export default {
  components: {
    ButtonComponent,
    UserSelect
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      taskText: '',
      assignedUser: null,
    }
  },
  methods: {
    onSubmitTask() {
      if (!this.taskText) return
      Meteor.call('tasks.insert', this.taskText.trim(), this.assignedUser)
      this.taskText = ''
    },
    onUserSelect(user) {
      this.assignedUser = user
    },
  },
}
</script>