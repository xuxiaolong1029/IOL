const server = (optitons, data) => {
	let storage_ip = uni.getStorageSync('storage_ip');
	if(!storage_ip){
		uni.showToast({
			title:'请设置IP',
			icon:'none',//不要图标
			duration: 1000//1后消失
		});
	}else{
		const storage_ip = JSON.parse(uni.getStorageSync('storage_ip'));
		let httpDefaultOpts = {
		    url:`http://${storage_ip.ip}:${storage_ip.port}${optitons.url}`,
		    data:optitons.data,
			timeout:10000,
		    method: optitons.method,
		    header:{
				"Accept": "application/json, text/plain, */*",
				"Content-Type": "application/json; charset=UTF-8"
			},
		    dataType: 'json',
		}
		let promise = new Promise(function(resolve, reject) {
		    uni.request(httpDefaultOpts).then((res) => {//res为一个数组，数组第一项为错误信息，第二项为返回数据
				let data = res[1];
				if(data.statusCode===200){
					resolve(data.data)
				}else{
					uni.showToast({
						title: data.errMsg,
						icon:'none',//不要图标
						duration: 1000//1后消失
					});
				}
			}).catch((response) => {
		        reject(response)
		    })
		})
		return promise
	}
};

export default {
    server
}