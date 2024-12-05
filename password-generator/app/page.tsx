"use client";
import Image from "next/image";
import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

const PasswordGeneratorForm = () => {
  // const [length, setLength] = useState<number | "">("");
  const [includeLower, setIncludeLower] = useState(false);
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(8, Number(e.target.value)); // Enforce a minimum length of 8
    setLength(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset the icon after 2 seconds
    });
  };

  const generatePassword = () => {
    if (typeof length !== "number" || length < 8 || length > 128) {
      alert("Password length must be a number between 8 and 128.");
      return;
    }

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const special = "!@#$%^&*()_+|}{][]";
    let characters = "";

    if (includeLower) characters += lower;
    if (includeUpper) characters += upper;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += special;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white w-full shadow-lg rounded-xl">
      <div className="w-full inline-flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold text-center">Password Generator</h1>
        <Image
          src="/images/reset-password.webp"
          alt="lock"
          width={50}
          height={50}
          className="mx-2"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePassword();
        }}
        className="space-y-4 flex flex-col items-start justify-start"
      >
        <div>
          <label
            htmlFor="length"
            className="block text-sm font-medium text-gray-700"
          >
            Password Length (8-128)
          </label>
          <input
            type="number"
            id="length"
            className="mt-1 w-fit rounded-xl border border-gray-800 px-2 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            // value={length}
            // onChange={(e) => setLength(Number(e.target.value))}
            value={length}
            onChange={handleLengthChange}
            required
          />
        </div>
        <p className="w-full flex items-center justify-start capitalize underline underline-offset-2">
          options to include
        </p>
        <div className="flex items-start justify-start space-x-4">
          <label className="flex items-center justify-start space-x-2">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <p className="text-gray-700">Lowercase</p>
          </label>
          <label className="flex items-center justify-start space-x-2">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">Uppercase</span>
          </label>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <label className="flex items-center justify-start space-x-2 ">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">Numbers</span>
          </label>
          <label className="flex items-center justify-start space-x-2">
            <input
              type="checkbox"
              checked={includeSpecial}
              onChange={(e) => setIncludeSpecial(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">Special Characters</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Generate Password
        </button>
      </form>
      <div className="w-full flex items-start justify-start mt-6  ">
        <textarea
          readOnly
          value={password}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Generated password will appear here"
        />
        <button
          type="button"
          onClick={copyToClipboard}
          disabled={!password}
          className={`p-2 rounded-md ml-2 text-white ${
            password
              ? "bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              : "bg-gray-400 cursor-default"
          }`}
        >
          {copied ? (
            <LuCheck className="text-white" />
          ) : (
            <LuCopy className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordGeneratorForm;
