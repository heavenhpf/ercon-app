<template>
  <div class="form-check form-switch">
    <input class="form-check-input" :class="inputClass" type="checkbox" :name="name" :id="id" :checked="modelValue" />
    <label class="form-check-label" :class="labelClass" :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "argon-switch",
  props: {
    name: String,
    id: String,
    modelValue: Boolean,
    labelClass: String,
    inputClass: String,
  },
};
</script>
