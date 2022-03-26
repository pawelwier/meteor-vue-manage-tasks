<template>
  <div class="app-wrapper">
    <template v-if="user">
      <div class="app-header">
        <div>
          To Do List
        </div>
        <LogoutForm 
          :user="user"
        />
      </div>
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
    </template>
    <template v-else>
      <LoginForm/>
    </template>
  </div>
</template>

<script>
import {TasksCollection} from '../api/collections/TasksCollection'
import Task from './components/Task.vue'
import TaskForm from './components/TaskForm.vue'
import TaskCount from './components/TaskCount.vue'
import ButtonComponent from './components/common/ButtonComponent.vue'
import LoginForm from './components/LoginForm.vue'
import LogoutForm from './components/LogoutForm.vue'

export default {
  components: {
    Task,
    TaskForm,
    TaskCount,
    ButtonComponent,
    LoginForm,
    LogoutForm,
  },
  data() {
    return {
      hideComplete: false,
    }
  },
  computed: {
    toggleCompleteText() {
      return this.hideComplete ? 'Show all' : 'Hide complete'
    },
  },
  methods: {
    toggleHideComplete() {
      this.hideComplete = !this.hideComplete
      console.log(this.currentUser)
    }
  },
  meteor: {
    tasks() {
      if (!this.user) return
      const userIdFilter = {userId: this.user._id}
      const filter = this.hideComplete ? {
        ...userIdFilter,
        complete: false,
      } : userIdFilter
      return TasksCollection.find(filter, {sort: {createdAt: -1}}).fetch()
    },
    // Meteor.userId() return undefined
    // although got eg. Meteor.userId in local storage after login
    user() {
      const userId = Meteor.userId()
      if (!userId) return
      return Meteor.users.findOne({_id: userId})
    },
  },
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
