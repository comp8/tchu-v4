import { createContext } from "react";
import { ChatClient } from "../TwitchApi/ChatClient";

const ChatClientContext = createContext<ChatClient>(null);

export default ChatClientContext;