from bottle import Bottle, request

app = Bottle()


@app.get('/api')
def api():
    usersDomainParam = request.query.get('users')
    usersArray = usersDomainParam.split('&')
    #result = resolve(domain)
    return dict(data=usersArray)


#def resolve():
