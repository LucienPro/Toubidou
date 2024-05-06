import { View, Text } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { Divider } from "react-native-paper";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const YOUR_CHATGPT_API_KEY =
    "sk-proj-lbjmoeiptr11xjwAWxtLT3BlbkFJOupxi4jHPapXk0q8AZeK";

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
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <View
        style={{
          padding: 10,
          marginTop: 10,
          backgroundColor: 'white',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#262626",
          }}
        >
          IA TOUBIDOU
        </Text>
        <Text
          style={{
            color: "#A6A6A6",
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          Tu as une question à poser à ChatGPT ? Pose là ici, on s'occupe du reste 🧠
        </Text>
        <Divider />
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
