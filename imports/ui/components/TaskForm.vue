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
import { Meteor } from 'meteor/meteor';
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
      Meteor.call('tasks.insert', this.taskText.trim())
      this.taskText = ''
    },
  },
}
</script>