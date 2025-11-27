<template>
    <div class="grid">
    <article class="card">
      <h3>产品</h3>
      <p>围绕 Wristo 的产品定位、能力矩阵与路线图沉淀在统一空间，便于团队对齐和迭代。</p>
    </article>
    <article class="card">
      <h3>设计</h3>
      <p>设计理念、规范、表盘模板库与素材处理流程完整收录，支撑高一致性的表盘体验。</p>
    </article>
    <article class="card">
      <h3>开发与运维</h3>
      <p>ConnectIQ 与 Studio 开发实践、运维（Ops）手册集中在此，从环境搭建到部署运维一站打通。</p>
    </article>
  </div>
</template>

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
