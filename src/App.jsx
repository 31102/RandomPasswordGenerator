import React, { useEffect, useState, useCallback, useRef } from 'react'

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [chngname,setchangename] = useState("Copy")
  const abc = useRef()

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (charAllowed) str += "!@#$%^&*()?>/\|{}[]";
    if (numberAllowed) {
      str += "0123456789"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char)
    }
    setPassword(pass)
    console.log("first")
  }, [length, setPassword, numberAllowed, charAllowed])

  const copytoclipboard = useCallback(() => {
    console.log("second")
    window.navigator.clipboard.writeText(password);
    abc.current?.select();
    setchangename("Copied")
    setTimeout(() => {
      setchangename("Copy")
    }, 3000);
  }, [password])

  useEffect(() => {
    passwordGenerator();

  }, [length, setPassword, numberAllowed, charAllowed])

  return (
    <>
      <div className="main">
        <input
          ref={abc}
          type="text"
          value={password}
          readOnly

        />
        <input
          type="range"
          value={length}
          min={5}
          max={50}
          onChange={(e) => {
            setLength(e.target.value)
          }}
        />
        <label>Length {length}</label>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onClick={() => {
            setNumberAllowed((prevValue) => !prevValue);
          }}
        />

        <label>Numbers</label>

        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onClick={() => {
            setCharAllowed((prevValue) => !prevValue);
          }}
        />
        <label>Special Characters</label>

      </div>
      <div className="button">
        <button onClick={copytoclipboard}>{chngname}</button>
      </div>
    </>
  )
}

export default App
