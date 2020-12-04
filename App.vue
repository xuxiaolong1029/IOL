<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success:function(res){
					uni.setStorage({
					    key:'screenHeight',
					    data:res.screenHeight-94		
					});
				}
			});
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	 /* #ifndef APP-PLUS-NVUE */
/*  @import './common/uni.css'; */
html,body{
	user-select: none;
	width: 100%;
	height: 100%;
	touch-action: none;
}
  /* #endif*/
</style>
