<template>
    <div class="bread-crumbs">
       <div class="bread-item" v-for="(item,index) in items" :key="item.name">
        <router-link :to="item.path">
            <span class="bread-name" :class="{'bread-active':index=== items.length-1}">{{item.name}}</span>
        </router-link>
        <span class="bread-split" v-if="index!== items.length-1">/</span>
       </div>
    </div>
</template>
<script>
export default {
  props: ['items']
}
</script>
<style scoped>
    .bread-crumbs{
        display: flex;
        padding: 16px 0;
        color: rgba(0,0,0,0.45);
        font-size: 14px;
    }
    .bread-split{
        display: inline-block;
        padding: 0 8px;
    }
    .bread-name{
        cursor: pointer;
    }
    .bread-active{
        color: rgba(0,0,0,0.88);
    }
    .bread-name:hover{
        color: rgba(0,0,0,0.88);
    }
</style>
