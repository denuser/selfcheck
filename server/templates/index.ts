import { TokenPayloadRow } from '../interfaces'

export default function ({ isLoggedIn, loginUrl, userData }: { isLoggedIn: boolean, loginUrl: string, userData: TokenPayloadRow }) {
    return `<html>
<head>
</head>
<body>
    <div class="wrapper">
        ${!isLoggedIn
            ? "<a href=\"" + loginUrl + "\">Login</a>"
            : "<div id=\"root\"><script src=\"/bundle.js\"></script></div>"}
        ${isLoggedIn && userData.email}
    </div>
    <a href="/logout">Logout</a>
</body>

</html>`
}