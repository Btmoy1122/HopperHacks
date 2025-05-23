import os
import openai
import speech_recognition as sr
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/chatbot": {"origins": "https://hopperhacks-2.onrender.com"}})
# Initialize OpenAI API client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize speech recognizer
recognizer = sr.Recognizer()

def recognize_speech():
    """Capture voice input and convert to text"""
    with sr.Microphone() as source:
        print("Listening for voice input...")
        recognizer.adjust_for_ambient_noise(source)
        try:
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio)
            print(f"Recognized Speech: {text}")
            return text
        except sr.UnknownValueError:
            return "Sorry, I couldn't understand that."
        except sr.RequestError:
            return "Speech recognition service error."

@app.route("/chatbot", methods=["POST"])
def chatbot():
    """API endpoint for chatbot"""
    data = request.json
    user_input = data.get("message", "")

    if user_input == "voice":
        user_input = recognize_speech()  # Capture voice input

    if not user_input:
        return jsonify({"response": "Please provide a valid input."})

    try:
        response = client.chat.completions.create(
            model="gpt-4",  # Use "gpt-3.5-turbo" if needed
            messages=[
                {"role": "system", "content": "You are a virtual health assistant."},
                {"role": "user", "content": user_input}
            ]
        )
        ai_response = response.choices[0].message.content
    except Exception as e:
        ai_response = f"Error: {str(e)}"

    return jsonify({"response": ai_response})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
