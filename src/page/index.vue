<template>
  <div style="width: 100%;">
  	<topNav></topNav>
  	<div style="width: 100%;height: calc(100vh - 50px);">


  		<leftmenu></leftmenu>

  		<div class="main-content" :style="{marginLeft:$store.state.leftmenu.width}">
        <bread></bread>
  			<transition name="custom-classes-transition"
			    enter-active-class="animated fadeIn"
			    leave-active-class="animated fadeOut" mode="out-in"> 



          

			    <router-view></router-view>   




		    </transition>  		
  		</div>  		
  	</div>    
  </div>
</template>

<script>
import leftmenu from '../component/leftmenu/leftmenu.vue';
import topNav from '../component/index/topNav.vue';
import bread from '../component/public/bread.vue';
  export default {
  	components: {leftmenu, topNav, bread},
    mounted() {
      var vm = this
      $.post(testAPI.selectPro, {
        PageIndex: 0,
        PageSize: 8,
        channelId: 10,
        user_id: 52897
      })
      .then(log)
      .fail(() => {
        serverError.call(vm)
      });
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData: function () {
        closeLoading.call(this)   
      }
    }
  }
</script>

