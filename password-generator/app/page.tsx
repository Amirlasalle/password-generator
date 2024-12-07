"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { LuCheck, LuCopy } from "react-icons/lu";

// interface SavedPassword {
//   password: string;
// }

interface PasswordEntry {
  password: string;
}

const PasswordGeneratorForm = () => {
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  // const [savedPassword, setSavedPassword] = useState<SavedPassword[]>([]);
  const [showPasswords, setShowPasswords] = useState(false);
  // const [filtersOpen, setFiltersOpen] = useState(false);

  const handlePasswordCopy = (password: string, index: number) => {
    navigator.clipboard.writeText(password).then(() => {
      setCopiedIndex(index); // Mark this password as copied
      setTimeout(() => {
        setCopiedIndex(null); // Reset after 2 seconds
      }, 2000);
    });
  };
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
    savePassword(generatedPassword); // Pass the generated password directly
  };

  useEffect(() => {
    const passwords = JSON.parse(
      localStorage.getItem("password-generator") || "[]"
    );
    setSavedPassword(passwords);
  }, []);

  const savePassword = (newPassword: string) => {
    if (!newPassword) return;
    const passwords = JSON.parse(
      localStorage.getItem("password-generator") || "[]"
    );
    const newPasswordEntry = { password: newPassword };
    passwords.push(newPasswordEntry);
    localStorage.setItem("password-generator", JSON.stringify(passwords));
    setSavedPassword(passwords); // Update state to reflect saved passwords
  };

  const [savedPassword, setSavedPassword] = useState<PasswordEntry[]>([
    { password: "abc123" },
    { password: "Zxcvbnm" },
    { password: "12345678" },
    { password: "!@#$%^&*()_+|}{][]" },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("newest"); // default to 'newest'

  // Sorting logic based on the selected filter
  const sortPasswords = (passwords: PasswordEntry[]): PasswordEntry[] => {
    switch (selectedFilter) {
      case "az":
        return [...passwords].sort((a, b) =>
          a.password.localeCompare(b.password)
        ); // A-Z
      case "za":
        return [...passwords].sort((a, b) =>
          b.password.localeCompare(a.password)
        ); // Z-A
      case "newest":
        return [...passwords].reverse(); // Newest to oldest (reverse the array)
      case "oldest":
        return [...passwords]; // Oldest to newest (default order)
      case "numbers-letters":
        return [...passwords].filter(
          (p) => /\d/.test(p.password) && /[a-zA-Z]/.test(p.password)
        ); // Numbers and letters
      case "numbers-only":
        return [...passwords].filter((p) =>
          /^[0-9]+[^a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`]+$/.test(
            p.password
          )
        );
      case "letters-only":
        return [...passwords].filter((p) =>
          /^[a-zA-Z]+[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~0-9]+$/.test(
            p.password
          )
        );
      case "symbols-only":
        return [...passwords].filter((p) => /^[^a-zA-Z0-9]+$/.test(p.password));
      default:
        return passwords;
    }
  };

  return (
    <div className="w-screen min-h-dvh px-10 xxs:px-0 flex flex-col items-center justify-start">
      <div className="max-w-2xl mx-auto p-6 bg-white w-full shadow-lg rounded-xl xxs:rounded-none xxs:mx-0">
        <div className="w-full inline-flex justify-center items-center mb-6">
          <h1 className="text-2xl xxs:text-xl font-bold text-center">Password Generator</h1>
          <Image
            src="/images/reset-password.webp"
            alt="lock"
            width={50}
            height={50}
            className="mx-2 xxs:size-8"
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generatePassword();
          }}
          className="space-y-4 flex flex-col items-start justify-start"
        >
          <div className="flex flex-col w-full items-start justify-center">
            <label
              htmlFor="length"
              className="text-sm xxs:text-xs font-medium text-gray-700 flex w-full items-center xs:justify-start xsmin:justify-center"
            >
              Password Length (8-128)
            </label>
            <input
              type="number"
              id="length"
              className="flex items-center justify-start mt-1 w-fit xxs:w-full rounded-xl border border-gray-800 px-2 py-1 xxs:px-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm xxs:text-xs"
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
          <div className="flex sm:flex-col items-start justify-start smmin:space-x-4">
            <label className="flex items-center justify-start">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="h-4 w-4 xxs:text-xs blue-600 border-gray-300 rounded"
              />
              <p className="mx-2 xxs:mx-1 xxs:text-xs text-gray-700">Lowercase</p>
            </label>
            <label className="flex items-center justify-start xxs:mt-1">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 xxs:text-xs rounded"
              />
              <span className="mx-2 xxs:mx-1 xxs:text-xs text-gray-700">Uppercase</span>
            </label>
          </div>

          <div className="flex sm:flex-col items-start justify-center sm:!mt-1 smmin:space-x-4 xxs:text-xs">
            <label className="flex items-center justify-start">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="mx-2 xxs:mx-1 text-gray-700">Numbers</span>
            </label>
            <label className="flex items-center justify-start">
              <input
                type="checkbox"
                checked={includeSpecial}
                onChange={(e) => setIncludeSpecial(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="mx-2 xxs:mx-1 text-gray-700">
                Special Characters
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 xxs:px-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 xxs:text-xs"
          >
            Generate Password
          </button>
        </form>
        <div className="w-full flex sm:flex-col items-start justify-start mt-6  ">
          <textarea
            readOnly
            value={password}
            className="w-full min-h-32 h-32 p-3 border border-gray-300 rounded-md sm:order-2 flex items-center justify-center text-center xxs:text-xs"
            placeholder="Generated password will appear here "
          />
          <div className="flex items-start justify-between xxs:text-xs">
            {copied ? (
              <p className="mx-2 xxs:mx-1 order-3 smmin:hidden">Copied</p>
            ) : (
              ""
            )}
            <button
              type="button"
              onClick={copyToClipboard}
              disabled={!password}
              className={`p-2 rounded-md smmin:ml-2 xxs:text-xs sm:mb-2 sm:order-1 text-white ${
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
        <div className="flex flex-col items-center justify-center xxs:text-xs pt-4">
          <button
            type="button"
            onClick={() => {
              setShowPasswords((prev) => !prev);
            }}
            className={`p-2 rounded-md smmin:ml-2 sm:mb-2 sm:order-1 text-white bg-blue-600 cursor-pointer capitalize hover:bg-blue-700 xxs:text-xs focus:ring-2 focus:ring-blue-500`}
          >
            {showPasswords ? (
              <p>Close password history</p>
            ) : (
              <p>Show password history</p>
            )}
          </button>
        </div>
      </div>
      {showPasswords && (
        <div className="w-full max-w-2xl h-72 flex flex-col xxs:text-xs items-center justify-center my-5 xxs:mb-0 bg-white text-black overflow-hidden rounded-xl xxs:rounded-none shadow-lg ">
          <div className="w-full flex sm:flex-col items-center justify-between sm:items-start sm:justify-center px-5 xxs:px-2">
            <div className="flex items-center justify-center">
              <h3 className="capitalize text-xl font-semibold underline underline-offset-2 py-3 text-center xxs:text-sm">
                Saved passwords
              </h3>
            </div>

            <div
              onClick={() => {
                localStorage.removeItem("password-generator"); // Clear local storage
                setSavedPassword([]); // Reset the state
              }}
              className="flex items-center justify-between text-red-500 rounded-md cursor-pointer"
            >
              <p className="w-full text-black hover:text-red-500 hover:underline underline-offset-2">
                Clear History
              </p>{" "}
              <BiTrash />
            </div>
          </div>

          <div className="w-full flex items-center justify-center py-3">
            <select
              className="flex items-center justify-center px-4 xxs:px-1 py-2 rounded-md border border-gray-300 cursor-pointer"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="newest">Newest - Oldest</option>
              <option value="oldest">Oldest - Newest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="numbers-letters">Numbers & Letters</option>
              <option value="letters-only">Letters Only</option>
              <option value="numbers-only">Numbers Only</option>
              <option value="symbols-only">Symbols Only</option>
            </select>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-start pb-5 bg-white text-black overflow-scrol l">
            <ul className="w-full flex flex-col items-center justify-start px-5 xxs:px-1 bg-white text-black">
              {sortPasswords(savedPassword).map((passwordEntry, index) => (
                <li
                  onClick={() =>
                    handlePasswordCopy(passwordEntry.password, index)
                  }
                  key={index}
                  className="w-full h-full mb-2 cursor-pointer flex items-center justify-between hover:bg-slate-200 px-5 xxs:px-2 py-2 rounded-xl  hover:text-slate-500"
                >
                  <p className="w-1/2 break-words text-left">
                    {passwordEntry.password}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handlePasswordCopy(passwordEntry.password, index)
                    }
                    className={`p-2 ml-2 rounded-md smmin:ml-2 sm:order-1 text-white bg-blue-600 cursor-pointer capitalize hover:bg-blue-700 focus:ring-2 focus:ring-blue-500`}
                  >
                    {copiedIndex === index ? (
                      <LuCheck className="text-white" />
                    ) : (
                      <LuCopy className="text-white" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordGeneratorForm;
