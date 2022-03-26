<template>
  <div>
    <form @submit.prevent="onSubmitTask">
      <input v-model="taskText" />
      <ButtonComponent 
        :buttonText="'Create task'"
        :type="'submit'"
        @click="onSubmitTask"
      />
    </form>
  </div>
</template>

<script>
import {TasksCollection} from '../../api/collections/TasksCollection'
import ButtonComponent from './common/ButtonComponent.vue'
export default {
  components: {
    ButtonComponent
  },
  data() {
    return {
      taskText: '',
    }
  },
  methods: {
    onSubmitTask() {
      if (!this.taskText) return
      const user = Meteor.user()
      console.log('user', user)
      TasksCollection.insert({
        text: this.taskText,
        complete: false,
        createdAt: new Date(),
        userId: user._id,
      })
      this.taskText = ''
    },
  },
}
</script>