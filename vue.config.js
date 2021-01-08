module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: 'http://35.186.198.220/'
        /* proxy: {
            'v1/ads': {
                target: 'http://localhost:8081/'
            },
            'v1/user': {
                target: 'http://localhost:8083/'
            },
            'v1/sms': {
                target: 'http://localhost:8084/'
            }
        } */
    }
}