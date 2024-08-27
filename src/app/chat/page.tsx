"use client"
import Message from "@/components/message/message";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { v4 as uuid } from 'uuid';

interface ChatMessage {
    _id: string;
    role: string;
    parts: { text: string }[];
}


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string

const genAI = new GoogleGenerativeAI(apiKey)

export default function Chat() {

    const [messageText, setMessageText] = useState("")
    const [incomingMessage, setIncomingMessage] = useState('')
    const [newChatMessages, setNewChatMessages] = useState<ChatMessage[]>([])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let modelResponse = ''

        setNewChatMessages((prev) => {
             const newChatMessages = [
                ...prev,
                {
                    _id: uuid(),
                    role: 'user',
                    parts: [{ text: messageText }]
                }
            ]
            return newChatMessages
        })

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        })

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{text: "You are Bob, a wise and enthusiasistic Jamaican rasta man. Your lingo and cadence are generally that of Bob Marley. You are an assistant that will answer all manner of questions. Your responses should be understandable to persons who are not familiar with Jamaican Patois. Don't narrate character actions."}]
                }
            ],
            generationConfig: {
                
            }
        })

        const result = await chat.sendMessageStream(messageText)

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            setIncomingMessage(s => `${s}${chunkText}`)
            modelResponse +=chunkText
        }


        console.log('Model response is', modelResponse)

        setNewChatMessages((prev) => {
            console.log("Trying to add message to array", incomingMessage)
            const newChatMessages = [
                ...prev,
                {
                    _id: uuid(),
                    role: 'model',
                    parts: [{ text: modelResponse }]
                }
            ]
            console.log(newChatMessages)
            return newChatMessages

        })

        console.log(newChatMessages)

        setMessageText('')
        setIncomingMessage('')
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="w-full h-[90%] bg-neutral-800 scroll-smooth overflow-auto">

                {newChatMessages.map((message) => (
                    <Message
                        key={message._id}
                        role={message.role}
                        content={message.parts[0].text}
                    />
                ))}

                {!!incomingMessage && (
                    <Message
                        role='model'
                        content={incomingMessage}
                    />
                )}

            </div>

            <div className="h-[10%] bg-neutral-900 flex justify-center items-center">
                <form className=" w-full flex justify-between  px-16"
                    onSubmit={handleSubmit}>

                    <textarea
                        value={messageText}
                        onChange={e => setMessageText(e.target.value)}
                    
                        className="w-full m-2 resize-none  border-slate-500 border-2 bg-neutral-800 text-black h-full rounded-md focus:outline-slate-950 focus:ring-0 "
                        placeholder="Ask me anything...">
                    </textarea>

                    <button className="px-8 py-2 m-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                        type="submit">
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}