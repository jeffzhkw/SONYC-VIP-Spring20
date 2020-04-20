class User(object):
    '''
    Storing the recording itself
    '''
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __str__(self):
        return "Username: " + self.username + " ,Password: " + self.password

def make_user(username, password):
    user = User(username, password)
    return user