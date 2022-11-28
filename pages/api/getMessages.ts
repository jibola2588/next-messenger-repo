// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { IMessage } from '../../typing';

type Data = {
 messages:IMessage[]
}
type IError = {
errMessage : string
}

export default async  function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | IError>
  ) {
       if(req.method !==  'GET'){ 
          res.status(405).json({ errMessage :'method not allowed'})
         return;
       }

     const messagesRes = await redis.hvals('message')

     const messages:IMessage[] = messagesRes?.map( item => JSON.parse(item)).sort((a,b ) => b.created_at - a.created_at )

     res.status(200).json({messages})

    }