<template>
  <div class="task-counter">
    Incomplete tasks: {{incompleteTaskCount}} 
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  computed: {
    incompleteTasks() {
      return this.tasks.filter(({complete}) => !complete)
    },
    incompleteTaskCount() {
      const incompleteCount = this.incompleteTasks.length
      return incompleteCount
        ? `(${incompleteCount} / ${this.tasks.length})`
          : 'none'
    },
  },
}
</script>

<style>

</style>