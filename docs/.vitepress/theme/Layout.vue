<template>
  <Layout>
    <template #nav-bar-content-after>
      <LocaleSwitch />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LocaleSwitch from './LocaleSwitch.vue'

const { Layout } = DefaultTheme
</script>
