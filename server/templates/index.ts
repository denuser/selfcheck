export default function ({ isLoggedIn, loginUrl }) {
    return `<html>

<body>
    <div class="wrapper">
        ${!isLoggedIn
            ? "<a href=\"" + loginUrl + "\">Login</a>"
            : "<div id=\"root\"><script src=\"/bundle.js\"></script></div>"}
    </div>
</body>

</html>`
}