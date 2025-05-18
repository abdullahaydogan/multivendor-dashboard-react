import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAlOcQgaP6uB3V1Ut6pJZs78iV70thBxug");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const HomeChatAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const result = await model.generateContent([input]);
      const aiMsg = {
        role: "ai",
        text: result.response.text(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Error:", err);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 4,
        background: "linear-gradient(135deg, #fafafa, #f0f4f8)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
        🤖 KOU AI Assistant
      </Typography>
      <Divider />

      {/* Chat Messages */}
      <Box
        ref={chatRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          py: 2,
          pr: 1,
          mt: 1,
        }}
      >
        <Stack spacing={1}>
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    msg.role === "user" ? "#1976d2" : "#e0e0e0",
                  color: msg.role === "user" ? "#fff" : "#000",
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  boxShadow: 2,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {msg.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Input Field */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Type your message..."
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        />
        <IconButton
          onClick={handleSend}
          color="primary"
          disabled={!input.trim()}
          sx={{
            borderRadius: 2,
            bgcolor: "#1976d2",
            color: "#fff",
            "&:hover": {
              bgcolor: "#1565c0",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default HomeChatAi;
