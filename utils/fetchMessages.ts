import { IMessage } from "../typing"

export const fetcher = async () => { 
    const res = await fetch('api/getMessages')
    const data = await res.json()
    // console.log('data from fetcher is ' +JSON.stringify(data))
    const messages : IMessage[] = data.messages;

    return messages
  }