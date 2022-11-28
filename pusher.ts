import Pusher from 'pusher'
import ClientPusher from 'pusher-js'


export const serverPusher = new Pusher({ 
    appId: "1514342",
    key: "83d5478cf8a7e0a0520d",
    secret: "066ba667380e8e9f0f27",
    cluster: "eu",
    useTLS: true
})


export const clientPusher = new ClientPusher('83d5478cf8a7e0a0520d', {
    cluster: 'eu',
    forceTLS:true
  });