class Recording(object):
    '''
    Storing the recording itself
    '''
    def __init__(self, name, length, data):
        self.name = name
        self.length = length
        self.data = data