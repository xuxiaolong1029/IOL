const baseUrl = process.env.NODE_ENV==='development'?'':'https://convdev.clear-sz.com'
const server = (optitons, data) => {
    let httpDefaultOpts = {
        url:baseUrl+optitons.url,
        data:optitons.data,
        beforeSend :function(xmlHttp){
            xmlHttp.setRequestHeader("If-Modified-Since","0"); 
            xmlHttp.setRequestHeader("Cache-Control","no-cache");
        },
        method: optitons.method,
        header: optitons.method == 'GET' ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
       'content-type': 'application/x-www-form-urlencoded'
    },
        dataType: 'json',
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then((res) => {
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
};
export default {
    server
}