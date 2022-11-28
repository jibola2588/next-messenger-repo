import React from 'react';
import { IMessage } from '../typing';
import ChatInput from './ChatInput';
import MessageList from './MessageList';


const page = async () => {

   const data  = await fetch(`${process.env.Vercel_URL}/api/getMessages`).then(res => res.json())
  //  console.log(data)
  //  console.log(data.messages)

   const messages:IMessage[] = data.messages
   console.log(messages)
  return (
    <>
       <MessageList initialMessages = {messages}/>
       <ChatInput />
    </>
  );
}

export default page;
