class Recording(object):
    '''
    Storing the recording itself
    '''
    def __init__(self, name, data):
        self.name = name
        self.data = data

    def __str__(self):
        return "Audio: " + self.name + " Data: " + self.data
