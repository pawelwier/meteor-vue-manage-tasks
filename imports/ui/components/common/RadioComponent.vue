<template>
  <span>
    <input 
      type="checkbox" 
      @change="$emit('change', $event.target.checked)"
      :checked="isChecked"
      :id="id"
    />
  </span>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
  }
}
</script>

<style>

</style>