<script setup></script>

<template>
  <div class="w-[30px] h-[30px] flex items-center justify-center text-white">
    <span
      class="relative inline-block w-[4px] h-[16px] bg-current rounded-[2px]
        animate-[pulse-bar_0.3s_0.3s_linear_infinite_alternate]"
    >
      <span
        class="absolute top-1/2 -left-[10px] w-[4px] h-[16px] bg-current rounded-[2px]
          animate-[pulse-bar_0.3s_0s_linear_infinite_alternate] -translate-y-1/2"
      ></span>
      <span
        class="absolute top-1/2 left-[10px] w-[4px] h-[16px] bg-current rounded-[2px]
          animate-[pulse-bar_0.3s_0.45s_linear_infinite_alternate] -translate-y-1/2"
      ></span>
    </span>
  </div>
</template>

<style>
@keyframes pulse-bar {
  0% {
    height: 20px;
  }
  100% {
    height: 4px;
  }
}
</style>