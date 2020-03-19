<template>
  <el-aside id="aside-menu">
    <el-menu :default-openeds="['1', '3']">
      <el-menu-item index="1">
        <i class="el-icon-user-solid"></i>
        <span>Personajes</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-video-camera-solid"></i>Temporadas</template>
        <el-menu-item index="2-1"><i class="el-icon-film"></i>1ª Temporada</el-menu-item>
        <el-menu-item index="2-2"><i class="el-icon-film"></i>2ª Temporada</el-menu-item>
        <el-menu-item index="2-3"><i class="el-icon-film"></i>3ª Temporada</el-menu-item>
        <el-menu-item index="2-4"><i class="el-icon-film"></i>4ª Temporada</el-menu-item>
        <el-menu-item index="2-5"><i class="el-icon-film"></i>5ª Temporada</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
        <el-menu-item-group>
          <template slot="title">Group 1</template>
          <el-menu-item index="3-1">Option 1</el-menu-item>
          <el-menu-item index="3-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="3-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">Option 4</template>
          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>

export default {
  name: 'Menu',
  components: {},
};
</script>

<style lang="scss">

#aside-menu {
  width: 200px;
  height: 100vh;

  > ul {
    height: 100vh;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
}
</style>
