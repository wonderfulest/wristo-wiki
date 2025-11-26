<template>
  <section class="home-demo">
    <h2>wristo 一体化工作流预览</h2>
    <p class="subtitle">
      从产品规划、设计协作到工程实现与运维沉淀，所有知识都在同一空间。
    </p>
    <div class="grid">
      <article class="card">
        <h3>产品</h3>
        <p>用结构化的页面记录需求、场景和路线图，随时追踪状态。</p>
      </article>
      <article class="card">
        <h3>设计</h3>
        <p>设计原则、组件规范、Token 一站式沉淀，方便设计与前端对齐。</p>
      </article>
      <article class="card">
        <h3>工程</h3>
        <p>统一技术架构与代码规范，配合 Vue 3 组件 Demo 快速验证想法。</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-demo {
  padding: 2rem 0 0;
}

.subtitle {
  color: var(--vp-c-text-2);
  margin: 0.5rem 0 1.5rem;
}

.grid {
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
