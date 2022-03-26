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
      TasksCollection.insert({
        text: this.taskText,
        complete: false,
        createdAt: new Date(),
      })
      this.taskText = ''
    },
  },
}
</script>