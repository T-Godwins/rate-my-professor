"use client";
import { useState } from "react";
import {Box, Stack, Button, Typography, Modal} from '@mui/material';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I am assistant",
    },
  ]);
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    const res = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };
  var markdown = require("markdown").markdown;

  return (
    <Stack
    width="100%"
    height="100%"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
        >
      <section className="chat-box p-5 mx-auto mt-20 rounded-3xl">
        <div className="scroller-content">
        {messages.map((message: any, i: number) => {
            let htmlContent = markdown.toHTML(message.content);
            return (
              <div
                key={i}
                className={
                  i % 2 == 0 ? "chat-message" : "chat-message justify-end"
                }
              >
                <div className={i % 2 == 0 ? "triangle-left" : ""}></div>
                <div
                  className={
                    i % 2 == 0
                      ? "bg-green-200 max-w-[60%] p-3 rounded-2xl"
                      : "bg-gray-200 max-w-[60%] p-3 rounded-2xl"
                  }
                  dangerouslySetInnerHTML={{ __html: htmlContent }} // Render the markdown as HTML
                />
                <div className={i % 2 == 0 ? "" : "triangle-right"}></div>
              </div>
            );
          })}
        </div>
      </section>

      <h1 className="header mx-auto my-2 p-2 py-3 rounded-md uppercase rounded-3xl">
        <strong className="text-xl">Chatbot</strong>
        <span className="hidden sm:block">Rate my prof</span>
        {/* <span className="block sm:hidden">Virtual Finance Assistant</span> */}
      </h1>
      <section
        id="user-message"
        className="w-full h-[10vh] min-h-[75px] mx-auto"
      >
        <form
          className="flex justify-center p-2"
          onSubmit={(e) => {
            sendMessage();
            e.preventDefault();
          }}
        >
          <div className="w-5/6 px-4 rounded-full bg-black text-gray-200 p-2">
            <input
              className="bg-transparent h-fit w-full py-2 px-5 outline-none "
              value={message}
              placeholder="Hit Enter to send a message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* <input type="submit" value="Send" onClick={sendMessage} /> */}
        </form>
      </section>
    </Stack>
  );
}
