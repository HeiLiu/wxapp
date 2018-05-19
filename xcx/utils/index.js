import * as Mock from './mock';
// Mock["list"]
// 在opt对象没有传该传的 使用默认的
const DEFAULT_REQUEST_OPTIONS = {
    url: '',
    data: {},
    header: {
        'Content-Type': 'application/json'
    },
    method: 'GET',
    dataType: 'json'
}
let util = {
    request(opt) {
        // 将opt中的所有复制给新的对象 用opt生成对象
        // let options = Object.assign({},opt,obj2);
        let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt);
        // console.log(options);
        // 内容解構
        let {
            url,
            data,
            header,
            method,
            dataType,
            mock = false
        } = options;
        // console.log(url,
        //     data,
        //     header,
        //     method,
        //     dataType,
        //     mock);
        return new Promise((resolve, reject) => {
            if (mock) {
                let res = {
                    statusCode: 200,
                    data:Mock[url]
                }
                resolve(res.data);
                return
            }
            // resolve('i am okay');
            wx.request({
                url,
                data,
                header,
                method,
                dataType,
                success(res) {
                    resolve(res.data)
                },
                fail(err) {
                    reject(err);
                }
            });
        });
    }
}
export default util