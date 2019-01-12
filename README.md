# stubjs
スタブサーバ。URIおよびHTTPメソッドに応じて固定のレスポンスを返却。

# 1. 使い方
## 1-1. 設定方法
`config/resource/server-config.json`を必要に応じて書き換える。  
## 1-2. 設定項目
- `port` : スタブサーバ待受ポート番号。
- `context` : コンテキストパス。APIなどのように、URIにコンテキストをもたせたい場合に設定する。
- `server` : 返却するリソースの設定。以下項目をもったオブジェクトを配列で指定する。
  - `name` : リソース名。後述のスタブファイルの名前を指定すること。
  - `path` : URIパス。
  - `method` : HTTPメソッド。
  - `responseStatus` : HTTPのステータスコード。指定がある場合、指定されたレスポンスコードで返却する。
### 1-3. スタブファイル
`stub`配下に、JSON形式で配置する。ファイル名は、返却したいURIリソースの`name`に合わせること。
### 1-4. サーバの起動
`node app.js`で起動。curlにて、以下のように結果が返却されればOK。  
`curl localhost:18080/healthcheck  
{"key":"value"}`