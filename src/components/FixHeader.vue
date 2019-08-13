<template>
    <div class="header-fix">
        <div class="header-main">
            <img class="logo-img" src="@/assets/img/verterLogo.png" alt="">
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
 
        };
    },
    props: {
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import "@/style/varStyle.scss";
    .header-fix{
        z-index: 100;
        width: 100%;
        height: 60px;
        background-color: #fff;
        position: fixed;
        line-height: 60px;
        border-bottom: 1px solid #f1f1f1;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        padding: 0 20px;
        
        .header-main {
            margin: 0 auto;
            
            .header-search{
                width: 150px;
                float: right;
            }
        }
        
        .logo-img{
            // width: 50px;
            height: 50px;
            vertical-align: middle;
            margin-right: 10px;
            margin-top: -3px;
        }
        .logo-text{
            font-size: 20px;
            color: #007fff;
        }
        

    }
  
</style>
