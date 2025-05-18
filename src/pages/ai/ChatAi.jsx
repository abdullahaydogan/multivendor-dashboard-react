import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAlOcQgaP6uB3V1Ut6pJZs78iV70thBxug";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chat = async (message) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Error during API request");
  }
};

const ChatAi = () => {
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [responses]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    const userMessage = { type: "user", text: message, createdAt: new Date() };
    setResponses((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      if (file) {
        setUploading(true);
        await uploadFile(file);
        setFile(null);
        setUploading(false);
      }

      const botResponseText = await chat(message);
      const botResponse = {
        type: "bot",
        text: botResponseText,
        createdAt: new Date(),
      };
      setResponses((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const uploadFile = async (file) => {
    console.log("Uploading file:", file);
  };

  return (
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        // backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          padding: "16px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
          KOU BAZAAR AI
        </Typography>
      </Box>

      <Box
        ref={chatRef}
        sx={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "900px",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          padding: "16px",
        }}
      >
        {responses.map((response, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: response.type === "user" ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <Paper
              sx={{
                padding: "10px 14px",
                backgroundColor: response.type === "user" ? "#e3f2fd" : "#f1f1f1",
                borderRadius: "12px",
                maxWidth: "70%",
              }}
            >
              <Typography variant="body2">{response.text}</Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", textAlign: "right", fontSize: "10px", color: "#888" }}
              >
                {new Date(response.createdAt).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      <Divider sx={{ width: "100%", maxWidth: "900px" }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          padding: "8px 16px",
          backgroundColor: "#ffffff",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Tooltip title="Attach File">
          <IconButton onClick={handleAttachClick}>
            <AttachFileIcon />
          </IconButton>
        </Tooltip>
        <InputBase
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          sx={{
            flexGrow: 1,
            marginX: 1,
            backgroundColor: "#f1f1f1",
            padding: "8px 12px",
            borderRadius: "20px",
          }}
        />
        <IconButton type="submit" disabled={!message || uploading}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatAi;
