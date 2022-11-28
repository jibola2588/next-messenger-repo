
'use client'

import useSWR from 'swr';
import { fetcher } from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';
import { useEffect } from 'react';
import { clientPusher } from '../pusher';
import { IMessage } from '../typing';

type IntialMessageProps = { 
  initialMessages: IMessage[]
}

const MessageList = ({initialMessages} : IntialMessageProps) => {
  const { data : messages,error,mutate} = useSWR<IMessage[]>('api/getMessages',fetcher)

       useEffect(() => {
         const channel = clientPusher.subscribe('messages')
         channel.bind('new-message',async(data:IMessage) => {
         
          // no need to add new message if found in cache
          if(messages?.find(message => message.id === data.id)) return;
          
          if(!messages){ 
            mutate(fetcher)
          }else{ 
            mutate(fetcher,{ 
              optimisticData:[data,...messages!],
              rollbackOnError:true
            })
          }

       })
      
       return () =>{ 
        channel.unbind_all();
        channel.unsubscribe()
       }

       }, [messages,mutate,fetcher]);


  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'> 
        { 
           (initialMessages || messages)?.map(message => ( 
            <MessageComponent   key={message.id} message={message}  />
           ))
        }
    </div>
  );
}

export default MessageList;
