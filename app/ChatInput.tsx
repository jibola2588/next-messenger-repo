"use client"

import {FormEvent, useState} from 'react'
import useSWR from 'swr'
import {v4 as uuid} from 'uuid'
import redis from '../redis'
import { IMessage } from '../typing'
import { fetcher } from '../utils/fetchMessages'

 
const ChatInput = () => {

    const [input,setInput] = useState('')

    const { data : messages,error,mutate} = useSWR('api/getMessages',fetcher)

    console.log(messages)

    const handleSubmit = async  ( e : FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        console.log(input)

       if(!input) return

        const messageToSend = input;

        setInput('')

        const id  = uuid();

        const message : IMessage  = { 
          id,
          message:messageToSend,
          created_at:Date.now(),
          userName:'jheebolar',
          profilePic: 'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
          email:'jheebolar@gmail.com' 
         }
        
         console.log(message)
         const uploadMessageToUpstash = async () => { 
          const data = await fetch('api/addMessage',{ 
            method:'POST',
            headers: { 
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({message})
          }).then(res => res.json())
         
        return [data.message, ...messages!]
         }
         uploadMessageToUpstash()

         await mutate(uploadMessageToUpstash,{ 
          optimisticData:[message,...messages!],
          rollbackOnError:true,
         })
    }

  return (
    <div>
       <form 
       onSubmit = {handleSubmit}
       className='fixed bottom-0 w-full z-50 flex px-10 py-5 items-center space-x-2 border-t border-gray-100'>
            <input 
            value = {input}
            onChange = {e => setInput(e.target.value)}
            placeholder='Enter message here...'
            className='flex-1
            rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'
            type="text" />
            <button
            type='submit'
            disabled = {!input ? true : false}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
            >send</button>
       </form>
    </div>
  ); 
}

export default ChatInput;
