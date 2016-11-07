'user strict'

export const env = {
  production: {
    CODE_PUSH: '1TpsGMwymIbkfmoaULfwHuftguwS4yxZxs7YZ',
  },
  staging: {
    CODE_PUSH: 'FBLHx5jP2lMiFbjEcF48SnOvsOHc4yxZxs7YZ',
    API_SERVER: 'http://139.129.200.88:3000/',
    WEB_SERVER: 'http://139.129.200.88/',
    ASSET_SERVER: 'http://139.129.200.88:8000/'
  },
  development: {
    CODE_PUSH: 'FBLHx5jP2lMiFbjEcF48SnOvsOHc4yxZxs7YZ',
    API_SERVER: 'http://192.168.0.103:3000/',
    WEB_SERVER: 'http://192.168.0.103/',
    ASSET_SERVER: 'http://192.168.0.103:8000/'
  }
}