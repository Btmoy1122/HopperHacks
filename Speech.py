
import speech_recognition as sr
import openai

openai.api_key = "your-api-key"

def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    
    try:
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return "Sorry, I couldn't understand that."
    except sr.RequestError:
        return "API request error."

def ask_chatbot(query):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a virtual health assistant."},
                  {"role": "user", "content": query}]
    )
    return response["choices"][0]["message"]["content"]

if __name__ == "__main__":
    user_input = recognize_speech()
    print("You said:", user_input)
    response = ask_chatbot(user_input)
    print("Chatbot:", response)
