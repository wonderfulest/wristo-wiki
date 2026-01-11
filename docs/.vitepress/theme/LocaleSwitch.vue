<template>
  <button
    class="locale-switch"
    type="button"
    @click="toggleLocale"
  >
    <span v-if="isZh">中文</span>
    <span v-else>EN</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vitepress'

const route = useRoute()
const router = useRouter()

const isZh = computed(() => route.path.startsWith('/zh/'))

function toggleLocale() {
  const current = route.path

  if (isZh.value) {
    // zh -> en: 去掉 /zh 前缀
    const next = current.replace(/^\/zh\//, '/') || '/'
    router.go(next)
  } else {
    // en -> zh: 给路径加 /zh 前缀
    if (current === '/') {
      router.go('/zh/')
    } else if (current.startsWith('/zh/')) {
      router.go(current)
    } else {
      router.go(`/zh${current}`)
    }
  }
}
</script>

<style scoped>
.locale-switch {
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 13px;
  line-height: 1;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.locale-switch:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand);
}
</style>
