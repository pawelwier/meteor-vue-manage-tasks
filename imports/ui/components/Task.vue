<template>
  <div>
    <RadioComponent
      :id="task._id"
      :isChecked="task.complete"
      @change="onCompleteChange"
    />
    <label :for="task._id">
    {{task.text}}
    </label>
    <ButtonComponent 
      @click="onDeleteTask"
      :buttonText="'X'"
    />
  </div>
</template>

<script>
import RadioComponent from './common/RadioComponent.vue'
import {TasksCollection} from '../../api/collections/TasksCollection'
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
      TasksCollection.update(
        this.task._id,
        {
          $set: {
            complete,
          }
        }
      )
    },
    onDeleteTask() {
      TasksCollection.remove(this.task._id)
    },
  },
}
</script>