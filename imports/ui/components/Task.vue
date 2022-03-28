<template>
  <div>
    <RadioComponent
      :id="task._id"
      :isChecked="task.complete"
      @change="onCompleteChange"
    />
    <label :for="task._id">
    {{task.text}} {{task.author ? `(${task.author.username})` : ''}}
    </label>
    <ButtonComponent 
      @click="onDeleteTask"
      :buttonText="'X'"
    />
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import RadioComponent from './common/RadioComponent.vue'
import ButtonComponent from './common/ButtonComponent.vue'
export default {
  components: {
    RadioComponent,
    ButtonComponent
  },
  props: {
    task: {
      type: null,
      required: true,
    }
  },
  methods: {
    onCompleteChange(complete) {
      Meteor.call('tasks.setIsChecked', this.task._id, complete)
    },
    onDeleteTask() {
      Meteor.call('tasks.remove', this.task._id)
    },
  },
}
</script>