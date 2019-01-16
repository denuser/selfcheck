export default function ({ isLoggedIn, loginUrl }) {
    return `<html>
<head>
</head>
<body>
    <div class="wrapper">
        ${!isLoggedIn
            ? "<a href=\"" + loginUrl + "\">Login</a>"
            : "<div id=\"root\"><script src=\"/bundle.js\"></script></div>"}
    </div>
    <a href="/logout">Logout</a>
</body>

</html>`
}