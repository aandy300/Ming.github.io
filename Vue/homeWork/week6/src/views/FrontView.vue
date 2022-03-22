<template>
    <FontNavbar></FontNavbar>
    <router-view></router-view>
</template>

<script>
    import FontNavbar from '@/components/FrontNavbar.vue'
export default {
    components: {
        FontNavbar
    }
}
</script>
