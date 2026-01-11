<template>
  <div class="grid">
    <article class="card">
      <h3>{{ content.product.title }}</h3>
      <p>{{ content.product.desc }}</p>
    </article>
    <article class="card">
      <h3>{{ content.design.title }}</h3>
      <p>{{ content.design.desc }}</p>
    </article>
    <article class="card">
      <h3>{{ content.engOps.title }}</h3>
      <p>{{ content.engOps.desc }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang, localePath } = useData()

const isZh = computed(() => {
  if (localePath?.value) return localePath.value === '/zh/'
  return lang?.value?.toLowerCase().startsWith('zh') ?? false
})

const copy = {
  zh: {
    product: {
      title: '产品',
      desc: '围绕 Wristo 的产品定位、能力矩阵与路线图沉淀在统一空间，便于团队对齐和迭代。'
    },
    design: {
      title: '设计',
      desc: '设计理念、规范、表盘模板库与素材处理流程完整收录，支撑高一致性的表盘体验。'
    },
    engOps: {
      title: '开发与运维',
      desc: 'ConnectIQ 与 Studio 开发实践、运维（Ops）手册集中在此，从环境搭建到部署运维一站打通。'
    }
  },
  en: {
    product: {
      title: 'Product',
      desc: 'Wristo product positioning, capability matrix, and roadmap are documented in one place for alignment and iteration.'
    },
    design: {
      title: 'Design',
      desc: 'Design principles, guidelines, watch face template libraries, and asset workflows are captured end-to-end to ensure consistency.'
    },
    engOps: {
      title: 'Engineering & Ops',
      desc: 'ConnectIQ and Studio practices plus Ops playbooks are organized here, covering everything from setup to deployment and operations.'
    }
  }
} as const

const content = computed(() => (isZh.value ? copy.zh : copy.en))
</script>

<style scoped>
.grid {
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft);
}

.card h3 {
  margin: 0 0 0.5rem;
}
</style>
