<template>
  <div class="circle flex-center">
    <div class="triangle"></div>
  </div>
</template>

<style scoped>
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: hsla(160, 100%, 37%, 1);
}

.triangle {
  width: 0;
  height: 0;
  border-width: 10px 0 10px 20px;
  border-color: transparent transparent transparent #fff;
  border-style: solid;
  display: inline-block;
}
</style>
