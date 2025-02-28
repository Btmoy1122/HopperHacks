import os
from openai import OpenAI  # Import the OpenAI class
import speech_recognition as sr
import pyttsx3
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Function to convert text to speech
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Function to recognize voice input
def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        try:
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio)
            print(f"You said: {text}")
            return text
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand that.")
            return None
        except sr.RequestError:
            print("Speech recognition service error.")
            return None

# Function to analyze symptoms (basic health risk detection)
def symptom_analysis(user_input):
    symptoms = {
        "fever": "You might have an infection or flu. Stay hydrated and rest.",
        "cough": "Persistent cough could indicate a cold, allergy, or respiratory infection.",
        "headache": "Could be stress-related, dehydration, or migraine. Drink water and relax.",
        "tired": "Fatigue might be due to lack of sleep, low iron levels, or overwork.",
        "chest pain": "Serious symptom! Seek medical attention immediately.",
        "sore throat": "It might be a common cold, flu, or infection. Gargle with warm salt water."
    }
    
    for symptom, advice in symptoms.items():
        if symptom in user_input.lower():
            return f"Health Alert: {advice}"
    
    return "I couldn't detect any specific symptoms. Would you like general health advice?"

# Function to interact with OpenAI Chatbot
def ask_chatbot(query):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Use "gpt-4" as another option
            messages=[
                {"role": "system", "content": "You are a virtual health assistant. Provide helpful and professional advice."},
                {"role": "user", "content": query}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

# Main function
def main():
    user_input = recognize_speech()
    if user_input:
        # Get response from OpenAI Chatbot
        chatbot_response = ask_chatbot(user_input)
        
        # Analyze symptoms (optional)
        symptom_advice = symptom_analysis(user_input)
        
        # Combine responses
        final_response = f"{chatbot_response}\n\n{symptom_advice}"
        print("Chatbot:", final_response)
        speak(final_response)

if __name__ == "__main__":
    main()