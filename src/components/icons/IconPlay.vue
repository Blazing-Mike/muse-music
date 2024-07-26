<template>
  <div class="circle flex-center">
    <div class="triangle"></div>
  </div>
</template>

<style scoped>
.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: hsla(160, 100%, 37%, 1);
}

.triangle {
  width: 0;
  height: 0;
  border-width: 15px 0 15px 26px;
  border-color: transparent transparent transparent #fff;
  border-style: solid;
  display: inline-block;
}
</style>
