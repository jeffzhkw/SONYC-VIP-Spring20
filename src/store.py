import ffmpeg
from src.recording import Recording
import sounddevice as sd
from scipy.io.wavfile import write
import soundfile as sf
#Service to store the audio file into the db
# def convert_audio(audio_input):
#     stream = ffmpeg.input(audio_input)


def make_recording(id, name, length):
    return Recording(id,name, length)

def record(filename):
    fs = 44100; #sample rate
    seconds = 10 #duration of recording
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
    sd.wait()
    write(filename, fs,recording)

def playback(filename):
    data, fs = sf.read(filename, dtype='float32')
    sd.play(data, fs)
    status = sd.wait()
    return status








