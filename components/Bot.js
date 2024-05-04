import { View, Text } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const YOUR_CHATGPT_API_KEY =
    "";

  const handleSend = async (newMessages = []) => {
    const userMessage = newMessages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, userMessage)
    );

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: userMessage.text,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
          },
        }
      );

      if (response.data.choices && response.data.choices.length > 0) {
        const reply = response.data.choices[0].message.content;
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: reply,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "TOUBIDOU BOT",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 429) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "Trop de requêtes, essayez plus tard.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "TOUBIDOU BOT",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginTop: 40,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          TOUBIDOU BOT
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default ChatBot;
