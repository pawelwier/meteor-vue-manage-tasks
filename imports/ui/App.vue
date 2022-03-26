<template>
  <div class="app-wrapper">
    <h2>
      To Do List
    </h2>
    <TaskForm />
    <Task
      v-for="(task, i) in tasks"
      :key="i"
      :task="task"
    />
    <TaskCount
    v-if="tasks && tasks.length" 
      :tasks="tasks"
    />
    <ButtonComponent
      :buttonText="toggleCompleteText"
      @click="toggleHideComplete"
     />
  </div>
</template>

<script>
import {TasksCollection} from '../api/collections/TasksCollection'
import Task from './components/Task.vue'
import TaskForm from './components/TaskForm.vue'
import TaskCount from './components/TaskCount.vue'
import ButtonComponent from './components/common/ButtonComponent.vue'

export default {
  components: {
    Task,
    TaskForm,
    TaskCount,
    ButtonComponent,
  },
  data() {
    return {
      hideComplete: false
    }
  },
  computed: {
    toggleCompleteText() {
      return this.hideComplete ? 'Show all' : 'Hide complete'
    }
  },
  methods: {
    toggleHideComplete() {
      this.hideComplete = !this.hideComplete
    }
  },
  meteor: {
    tasks() {
      const filter = this.hideComplete ? {complete: false} : {}
      return TasksCollection.find(filter, {sort: {createdAt: -1}}).fetch()
    }
  },
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
