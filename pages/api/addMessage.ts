// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from '../../pusher';
import redis from '../../redis';
import { IMessage } from '../../typing';

type Data = {
 message:IMessage
}
type IError = {
errMessage : string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | IError>
  ) {
       if(req.method !==  'POST'){ 
          res.status(405).json({ errMessage :'method not allowed'})
         return;
       }

       const { message } = req.body
       console.log(req.body.message)

       const newMessage = { 
        ...message,
        // replace thre timestam the user has with server timestamp
        created_at:Date.now(),
           }

           //push to upstash  redis db
        redis.hset('message',message.id,JSON.stringify(newMessage))
        serverPusher.trigger('messages','new-message',newMessage)

         res.status(200).json({ message: newMessage })

}
