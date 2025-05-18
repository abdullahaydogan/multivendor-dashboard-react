// API bağlantısını import ederken require yerine import kullanıyoruz
import { GoogleGenerativeAI } from '@google/generative-ai';

// API anahtarını burada yapılandırıyoruz
const apiKey = "AIzaSyAlOcQgaP6uB3V1Ut6pJZs78iV70thBxug";

// Google Generative AI modülünü başlatıyoruz
const genAI = new GoogleGenerativeAI(apiKey);

// Modeli başlatıyoruz
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Generasyon ayarlarını yapılandırıyoruz
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Chat oturumunu başlatmak ve mesajı göndermek için bir fonksiyon yazıyoruz
const chat = async (message) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(message);
    return result.response.text();  // Yanıtı döndürüyoruz
  } catch (error) {
    console.error("API Error:", error);
    throw new Error('Error during API request');
  }
};

export default chat;
