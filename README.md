# backend_chai_code


what is http hearder

metadata => key-value sent along with req & res
=>  caching , authentication , manage state
                x-prefix -> 2012(x-deprecated)


request Headers => from Client
response Headers => from server
representation Headers => encoding / compression  (grapchart (zerodha , razorpay))
payload Headers => data


<!-- most commom headers -->

Accept : appliction/json => (json) common
user-agent   => kaha se request aaya tha
authorization => berar (jwt token)
content-type  => pdf de rhai ho img de rhai kuch bhi
cookie  =>key-value obj  jo batata hai kitne time tak cookie rhai gi kuch bhi 
cache-control  => data kab expiry  hai vo 


<!-- CORS -->
acces-control-allow-origin => konse se website allow hai req kaha se aati hai 
acces-control-allow-Credentials => konse se allow hai 
acces-control-allow-Method => konse se allow hai  get allow hai ya post 

<!-- Security -->
<!-- ye sab hum hi define krte hai -->
corss-origin-embedder-Policy
corss-origin-Opener-Policy
Content-Security-policy
x-xss-Protection


HTTP Method 
baisc set of operation that can be used to interact with server 

GET : retrieve a resource
HEAD: no message body (response heafers only )
Options : what operations are available
<!-- debugging ke liya  -->
trace: loopback test (get same data)
Delete: remove a resource
Put : replace a resource
Post : interact with resource (mostly add)
<!-- only change one part of the resource  -->
Patch: change part of a resource




<!-- HTTP STATS CODE -->
1** informational
2**  Success
3**  Redirection
4**  Client error
5**  Servererror


100 Continue
102 Processing
200 Ok
201 created
202 accepted
307 temporary redirect
308  permanent redirect
400 bad request
401 unauthorized
402 PAyment required
404 not found 
500 internal serve Error
504 gateway time out 





<!--  -->