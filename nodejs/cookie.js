const http = require('http')
const cookie = require('cookie')

http.createServer((request, response) => {
    var cookies = {}
    if( request.headers.cookie !== undefined ) {
        cookies = cookie.parse(request.headers.cookie)
    }

    console.log(cookies)

    // session (브라우저 닫힘시 삭제) <-> permanent (지속가능)
    // permanent - expire : 언제 만료 시킬 것인가.
    // permanent - max-age : 현재 기준 얼마나 유지 할 것인가. 
    response.writeHead(200, {
        'Set-Cookie' : [
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`,
            'Secure=Secure; Secure',    // https 에서만 전달하는 옵션 (client -> server)
            'HttpOnly=HttpOnly; HttpOnly',   // 프로토콜 통신만 가능 (javascript 추출 불가)
            'Path=Path; Path=/cookie', // 해당 path 와 그 하위에서만.
            'Domain=Domain; Domain=o2.org',
        ]
    })

    response.end('Cookie!!')
}).listen('3000 ')

