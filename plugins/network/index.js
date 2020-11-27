// 请求接口
const commoneUrl = "http://xxxxxxxxxx";
//get请求封装
function getRequest(url,data){
	var promise = new Promise((resolve,reject) => {
			var postData = data;
			uni.request({
				url:commoneUrl + url,
				data:postData,
				method:"GET",
				dataType:'json',
				header:{
					'content-type': 'application/json'
				},
				success:function(res){
					if(res.statusCode === 200)
					{
						resolve(res.data);
					}else{
						resolve(res.data)
					}
				},
				error:function(e)
				{
					reject('网络出错');
				}
			});
	});
	return promise;
}
//post请求封装
function postRequest(url,data){
	var promise = new Promise((resolve,reject) => {
		var postData = data;
		uni.request({
			url:commoneUrl + url,
			data:postData,
			method:'POST',
			header:{
				'content-type': 'application/x-www-form-urlencoded'
			},
			success:function(res)
			{
				if(res.statusCode === 200 && res.data.resultCode == 0)
				{
					resolve(res.data);
				}else{
					resolve(res.data)
				}
			},
			error:function(e)
			{
				reject('网络出错');
			}
		})
	});
	return promise;
}
module.exports = {
	postRequest,
	postHeaderRequest,
	getRequest
}