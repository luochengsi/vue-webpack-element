<template>
    <div class="left left-menu" :style="{'width':$store.state.leftmenu.width}" id='admin-left'>
        <div id='left-menu'>
            <el-row class='tac' style="height: 100%;">
                <el-col :span="24" style="height: 100%;">
                    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose"  style="height: 95%;overflow-y: scroll;" theme="dark">
                      <el-submenu :index="route.index" v-for="(route,index) in routeList">
                          <template slot="title">                            
                            <el-tooltip 
                                class="item" 
                                effect="dark" 
                                placement="right"
                                :disabled="$store.state.leftmenu.menu_flag" 
                                :content="route.name">
                                <i :class="route.icon"></i>
                            </el-tooltip>
                            <span class='menu-name' v-if="$store.state.leftmenu.menu_flag">{{route.name}}</span>
                          </template>

                          <el-menu-item 
                          :index="item.name" 
                          v-for="(item, index) in route.children"
                          :style="{'padding-left':$store.state.leftmenu.menu_flag? '30px' : '30px'}" >
                            <el-tooltip 
                                class="item" 
                                effect="dark" 
                                placement="right"
                                :disabled="$store.state.leftmenu.menu_flag" 
                                :content="item.name">
                                <i :class="item.icon"></i>
                            </el-tooltip>
                            <span class='menu-name' v-if="$store.state.leftmenu.menu_flag">{{item.name}}</span>                            
                          </el-menu-item>
                      </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'left-menu',
        data () {
            return {
                menu_list:[],

                win_size:{
                    height:'',
                },
                routeList: ROUTE
            }
        },
        methods:{
            setSize(){
                this.win_size.height=$(window).height()+"px";
            },

            toggleMenu(){
                this.$store.dispatch(this.$store.state.leftmenu.menu_flag?'set_menu_close':'set_menu_open');
            },

            updateCurMenu(route){
                var route=route || this.$route;
                if (route.matched.length) {
                    var rootPath=route.matched[0].path,
                        fullPath=route.path;
                    this.$store.dispatch('set_cur_route',{
                        rootPath,
                        fullPath
                    });
                    var routes=this.$router.options.routes;
                    for (var i = 0; i < routes.length; i++) {
                        if (routes[i].path===rootPath && !routes[i].hidden) {
                            this.menu_list=routes[i].children;
                            break;
                        }
                    }
                }else{
                    this.$router.push('/404');
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
              },
              handleClose(key, keyPath) {
                console.log(key, keyPath);
              },
              handleSelect(index, indexPath) {
                this.$router.push({name: index})
              }
        },
        created(){
            this.setSize();
            $(window).resize(()=>{
                this.setSize();
            });
            this.updateCurMenu();
        },
        watch:{
            $route(to,from){
                this.updateCurMenu(to);
            }
        }
    }
</script>

<style scoped>
    .fa{
        margin-right: 8px;
    }
    .left-fixed-right-auto{
        padding-top: 60px;
    }
    .left{
        position:fixed;
        float:left;
        /*width:190px;
        margin-right:-190px;*/
        top:51px;
    }
    .right-content{
        float:right;
        width:100%;
    }
    #left-menu{
        height: 100%;
        background: #324057;
        position: relative;
        overflow-x: hidden;   
    }
</style>
