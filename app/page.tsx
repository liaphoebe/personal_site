'use client'

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  interface Entry {
    type: string,
    content: string
  }

  interface Commands {
    [key: string]: {
      desc: string,
      content: Function
    }
  }

  const [inputText, setInputText] = useState('');
  const [log, setLog] = useState<Array<Entry>>([]);

  const commands: Commands = {
    'help': {
      'desc': 'display available commands',
      'content': () => {
        return (
          <div className="flex-grow flex flex-col">
            {Object.keys(commands).map((item, idx) => (
              <div key={idx}>
                <span className="pl-5 text-white-400 font-bold">{item}</span>
                <span className="text-white-400"> - {commands[item]['desc']}</span>
              </div>
            ))}
          </div>
        )
      }
    },
    'echo': {
      'desc': 'repeat text. usage: echo <text>',
      'content': (text: string[]) => {
        return (
          <div className="flex-grow flex">
            {text.join(' ')}
          </div>
        )
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let args = inputText.split(' ');
    if (event.key === 'Enter') {
      setLog(prevLog => [...prevLog, { 'type': 'input', 'content': inputText }])

      let command = args[0];

      if (commands[command]) {
        setLog(prevLog => [...prevLog, { 'type': 'output', 'content': commands[command]['content'](args.slice(1)) } ])
      }
      setInputText('');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 ">

      <div className="w-full">
        <div className="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-800  pb-6 pt-4 rounded-lg leading-normal overflow-hidden">
          <div className="top mb-2 flex">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="mt-4 flex flex-col">

            <div className="flex-grow flex">
              <span className="text-green-400">computer:~$</span>
              <p className="flex-1 typing items-center pl-2">
                help
              </p>
              <br/>
            </div>

            <div className="flex-grow flex">
              {commands['help']['content']()}
            </div>

            <div id="log" className="flex-grow flex flex-col">
              {log.map((item, idx) => (
                <div key={idx} className="flex-grow flex">
                  { item['type'] == 'input' && <span className="text-green-400">computer:~$</span> }
                  <p className="flex-1 typing items-center pl-2">{item['content']}</p>
                </div>
              ))}
            </div>

            <div id="prompt" className="flex-grow flex">
              <span className="text-green-400">computer:~$</span>
              <p className="flex-1 typing items-center pl-2">
                <input id="terminal-input" className="text-white-400 text-white bg-transparent w-full outline-none" 
                  value={inputText} autoFocus onKeyDown={handleKeyDown} onChange={(e) => setInputText(e.target.value)}></input>
                <br></br>
              </p>
            </div>
  
          </div>
        </div>
      </div>
   
    </main>
  );
}
