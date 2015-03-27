# +++++++++++ HELLO WORLD +++++++++++
# A little pure-wsgi hello world we've cooked up, just
# to prove everything works.  You should delete this
# code to get your own working.


HELLO_WORLD = """<!DOCTYPE html>
<html>
<head>
    <title>Effective JavaScript: Frogger</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <script src="js/resources.js"></script>
    <script src="js/app.js"></script>
    <script src="js/engine.js"></script>
</body>
</html>"""


def application(environ, start_response):
    if environ.get('PATH_INFO') == '/':
        status = '200 OK'
        content = HELLO_WORLD
    else:
        status = '404 NOT FOUND'
        content = 'Page not found.'
    response_headers = [('Content-Type', 'text/html'), ('Content-Length', str(len(content)))]
    start_response(status, response_headers)
    yield content.encode('utf8')