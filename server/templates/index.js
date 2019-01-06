module.exports = function ({ isLoggedIn, loginUrl }) {
    return `<html>

<body>
    <div class="wrapper">
        <div id="root"> </div>
        ${!isLoggedIn ? "<a href=\"" + loginUrl + "\">Login</a>" : ""}
        <script src="/bundle.js"></script>
    </div>
</body>

</html>`
}