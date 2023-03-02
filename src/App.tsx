import { useCallback, useEffect, useState } from "react";
import axios from "axios";


interface Mensagem {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: []
}



function App() {

  const [mensagem, setMensagem] = useState<Mensagem[]>([]);
  const [remetente, setRemetente] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [message, setMessage] = useState("");

  const carregar = async () => {
    const response = await axios.get(`http://localhost:8080/api/chat/messages?sender=${remetente}&recipient=${destinatario}`)

    setMensagem(response.data)

    console.log(mensagem);

  }

  const sendeMensagem = async () => {

    const response = await axios.post(`http://localhost:8080/api/chat/message?sender=${remetente}&recipient=${destinatario}&content=${message}`)

    carregar()
  };

  const handleRemetente = (value: any) => {
    setRemetente(value)
  }

  const handleDestinatario = (value: any) => {
    setDestinatario(value)
  }
  const handleMessage = (value: any) => {
    setMessage(value)
  }

  useEffect(() => {

    carregar()

  }, []);

  return (
    <div className="flex p-2 justify-center items-center w-screen h-screen bg-green-400 ">

      <div className=" flex w-full items-center justify-center gap-4 flex-col w-1/2">


        <div className="flex w-full justify-center gap-4 lg:flex flex-wrap items-center bg-white rounded p-2 ">

          <input className="flex p-4  rounded-lg"
            type="text" name="sender" id="sender"
            placeholder="Remetente" onChange={(e) => handleRemetente(e.target.value)} />

          <input className="flex p-4  rounded-lg"
            type="text" name="recipient" id="recipient"
            placeholder="Destinatario" onChange={(e) => handleDestinatario(e.target.value)} />

        </div>

        <div className=" flex  flex-col gap-2 bg-white p-2 rounded justify-end w-full " >
          {mensagem.map((e) => (

            <div key={e.id} className="flex justify-end flex-col  bg-green-100 p-2 rounded-lg">

              <div className="flex  justify-end">
                <span className="font-bold text-md">
                  {e.sender}
                </span>
              </div>

              <span className="flex  justify-end text-sm">
                {e?.content}
              </span>

              <div className="flex  justify-end text-sm">
                <span >
                  Data
                </span>
              </div>

            </div>
          ))}
        </div>

        <div className="flex gap-8  items-center justify-between bg-gray-300 p-2 rounded">
          <input className="flex p-4  rounded-lg"
            type="text" name="message" id="message"
            placeholder="Mensagem" onChange={(e) => handleMessage(e.target.value)} />

          <button className="flex p-2 bg-green-300 rounded" onClick={sendeMensagem}>
            Enviar
          </button>
        </div>

      </div>

    </div >
  );
}

export default App;
