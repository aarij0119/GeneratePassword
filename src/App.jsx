import React, { useState, useEffect, useRef, useCallback } from 'react';

const App = () => {
  const [Length, setLength] = useState(8);
  const [Number, setNumber] = useState(false);
  const [Character, setCharacter] = useState(false);
  const [Password, setPassword] = useState('');

  //Using ref to copy the password
  const passwordRef =  useRef(null)

  const getPassword = () => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Number) str += '123456789';
    if (Character) str += '!@#$%^&*()';

    let pass = '';
    for (let i = 0; i < Length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  };

  useEffect(() => {
    getPassword();
  }, [Length, Number, Character]);

  const copycode = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])


  return (
    <>
      <div className='w-full h-screen bg-zinc-900 flex justify-center items-center'>
        <div className='w-1/2 bg-zinc-800 p-4 pt-10'>
          <div>
            <input
              value={Password}
              className='p-2 w-3/4 outline-none rounded-tl-lg rounded-bl-lg'
              type="text"
              name=""
              id=""
              readOnly
              ref={passwordRef}
            />
            <button
            onClick={()=>{
              copycode()
            }}
              className='w-3/12 bg-blue-500 p-2 text-md font-bold text-white rounded-tr-lg rounded-br-lg'
            >
              Copy
            </button>
          </div>
          <div className='mt-2 flex items-center gap-3'>
            <div>
              <input
                type="range"
                min={6}
                max={100}
                value={Length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label className='text-white text-lg ml-1'>: {Length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={Number}
                onChange={(e) => setNumber(e.target.checked)}
              />
              <label className='text-lg text-white ml-1'>Number</label>
            </div>
            <div>
              <input 
                type="checkbox"
                checked={Character}
                onChange={(e) => setCharacter(e.target.checked)}
              />
              <label className='text-lg text-white ml-1'>Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
