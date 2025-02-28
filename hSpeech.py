import speech_recognition as sr
import pyttsx3
from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Load the DeepSeek-R1-Distill-Qwen-32B model and tokenizer
model_name = "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

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

# Function to interact with DeepSeek-R1-Distill-Qwen-32B model
def ask_deepseek(query):
    try:
        # Prepare the input for the model
        input_text = f"You are a virtual health assistant. Provide helpful and professional advice. User: {query}"
        input_ids = tokenizer(input_text, return_tensors="pt").input_ids

        # Generate the response
        outputs = model.generate(input_ids, max_length=100)
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return response
    except Exception as e:
        return f"Error: {str(e)}"

# Main function
def main():
    user_input = recognize_speech()
    if user_input:
        # Get response from DeepSeek-R1-Distill-Qwen-32B model
        chatbot_response = ask_deepseek(user_input)
        
        # Analyze symptoms (optional)
        symptom_advice = symptom_analysis(user_input)
        
        # Combine responses
        final_response = f"{chatbot_response}\n\n{symptom_advice}"
        print("Chatbot:", final_response)
        speak(final_response)

if __name__ == "__main__":
    main()