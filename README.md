# stubjs
A REST API server for stubs with nodejs.
It returns a fixed response depending on the URI and HTTP methods written in settings.

## 1. Usage
### 1-1. Setting method
Set `config/resource/server-config.json` for your situation.
### 1-2. Setting items

|item|required|description|
| ---- | ---- | ---- |
|host|true|Server running host name.|
|port|true|Stub server standby port number|
|context| - |Context path. Set when you want to give context to URI like API. If empty, the setting is simply skipped.|
|allowCors|true|If "true" is set, the server accept CORS requests.|
|server|true|Setting of resources to be returned. Specify the object with the following items as an array. This accepts multiple settings.|
|server.name|true|Resource name. Specify the name of the stub file described below.|
|server.path|true|URI path.|
|server.method|true|HTTP method.|
|responseStatus|true|HTTP status code. If specified, it will be returned with the specified response code.|


This is a setting sample:
```js
{
    "host" : "localhost",
    "port" : 18080,
    "context" : "/api/v1",
    "allowCors" : true,
    "server" : [
        {
            "name" : "color-retrieving",
            "path" : "/color",
            "method" : "GET",
            "responseStatus" : 200
        }
    ]
}
```
### 1-3. Stub file
Place it in JSON format under `stub` directory. Match the file name with the `name` of the URI resource you want to return.
### 1-4. Request data settings
*Not Required* stubjs does not care what kind of request it receives and returns the resource according to the settings.

## 2. How to start
### 2-1. Start with local node.js
The `/ healthcheck` method is provided by default, so let's send a request to that method.
First, start it with `node app.js`.
If curl returns the result as below, it's OK.
- request : `curl http://localhost:18080/healthcheck`
- response: `{"key ":" value "}`
### 2-2. Start with Docker
You can launch it with Docker compose only below:
`$ docker-compose up`