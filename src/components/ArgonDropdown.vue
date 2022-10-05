<template>
    <select class="form-select" :id="id">
        <option disabled value="">{{ title }}</option>
        <option :value="value1">{{ name1 }}</option>
        <option :value="value2">{{ name2 }}</option>
        <option :value="value3">{{ name3 }}</option>
    </select>

    <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
</template>

<script>
    export default {
      name: "argon-dropdown",
      props: {
        id: String,
        title: String,
        value1: String,
        value2: String,
        value3: String,
        name1: String,
        name2: String,
        name3: String,
      },
    };
    </script>