<template>
  <div class="service-logo">
    <span class="logo-text">{{ abbreviation }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  service: {
    type: String,
    required: true,
  },
})

const serviceConfig = {
  amplify: {
    abbreviation: 'AWS',
  },
  lambda: {
    abbreviation: 'λ',
  },
  dynamodb: {
    abbreviation: 'DB',
  },
  s3: {
    abbreviation: 'S3',
  },
  infrastructure: {
    abbreviation: '{}',
  },
}

const config = computed(() => serviceConfig[props.service] || serviceConfig.amplify)

const abbreviation = computed(() => config.value.abbreviation)
</script>

<style scoped>
.service-logo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}

.logo-text {
  font-weight: bold;
  font-size: 18px;
  user-select: none;
}
</style>
