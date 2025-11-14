// Bismillahirrahmanirrahim 

// Bismillahirrahmanirrahim 
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammedur Resulullah
// La havle vela kuvvete illa billah
// Astagfirullah al azim
// La ilahe illallah, wahdahu la sharika lahu, lahul mulku wa lahul hamdu yuhyi wa yumit wa huwa ala kulli shay'in qadir
// Seyyidena ve nebiyyena Muhammedun abduhu ve rasuluhu
// Subhanallahi wa bihamdihi, subhanallahil azim
// ELHAMDULILLAHI RABBIL 'ALAMIN
// Allah U Ekber ve lillahi'l-hamd

// Bismillahirrahmanirrahim 
"use client";

import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat as StreamChatComponent,
  Channel as ChatChannel,
  Window,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

import { DefaultStreamChatGenerics } from "stream-chat"; // Default types

// Replace with your actual Stream API key and user token
const apiKey = "YOUR_STREAM_API_KEY";
const userToken = "USER_TOKEN";

export default function Chat() {
  const [chatClient, setChatClient] = useState<StreamChat<DefaultStreamChatGenerics> | null>(null);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const client = StreamChat.getInstance<DefaultStreamChatGenerics>(apiKey);

    async function initChat() {
      try {
        // Connect the user
        await client.connectUser(
          {
            id: "user-id",
            name: "User Name",
            image: "https://getstream.io/random_png/?id=user-id",
          },
          userToken
        );

        // Create / watch a channel
        const channel = client.channel("messaging", "general", {
          name: "General Chat",
        });
        await channel.watch();

        setChatClient(client);
        setChannel(channel);
      } catch (error) {
        console.error("Chat initialization error:", error);
      }
    }

    initChat();

    return () => {
      client.disconnectUser();
    };
  }, []);

  if (!chatClient || !channel) return <div>Loading chat...</div>;

  const chatContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  return (
    <div style={chatContainerStyle}>
      <StreamChatComponent client={chatClient} theme="messaging light">
        <ChatChannel channel={channel}>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
        </ChatChannel>
      </StreamChatComponent>
    </div>
  );
}
