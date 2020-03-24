import ffmpeg
from src.recording import Recording

#Service to store the audio file into the db
# def convert_audio(audio_input):
#     stream = ffmpeg.input(audio_input)


def make_recording(id, name, length):
    return Recording(id,name, length)





