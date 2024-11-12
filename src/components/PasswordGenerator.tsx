import React, { useEffect, useState } from 'react';
import { IconButton } from './IconButton';
import { ArrowPathIcon } from '../shared/icons/ArrowPathIcon';
import { CheckIcon } from '../shared/icons/checkIcon';

interface PasswordGeneratorProps {
  onGenerate: (password: string) => void;
}
const tabs = [
  {
    label: 'a-z',
    value: 'abcdefghijklmnopqrstuvwxyz',
  },
  {
    label: 'A-Z',
    value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  {
    label: '1-9',
    value: '0123456789',
  },
  {
    label: '!@#$',
    value: '!@#$%^&*()_+[]{}|;:,.<>?',
  },
];

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  onGenerate,
}) => {
  const [password, setPassword] = useState('asdasd');
  const [length, setLength] = useState(8);
  const [activeTabs, setActiveTabs] = useState(
    tabs.slice(0, 2).map((tab) => tab.value),
  );
  useEffect(() => {
    generatePassword();
  }, []);

  const handlePassword = () => {
    onGenerate(password);
    generatePassword();
    console.log(password);
  };

  const generatePassword = () => {
    const chars = activeTabs.join('');

    let pass = '';

    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
  };

  const toggleTab = (tabValue: string) => {
    setActiveTabs((prev) => {
      if (prev.includes(tabValue)) {
        return prev.filter((t) => t !== tabValue);
      } else {
        return [...prev, tabValue];
      }
    });
  };
  return (
    <div className="rounded-xl just bg-gray-700 text-white ">
      <div className="bg-gray-600 p-2 border justify-between border-gray-500 flex  mt-2 items-center gap-3 rounded-xl">
        <IconButton onClick={generatePassword} className="w-9 h-9 text-2xl">
          <ArrowPathIcon className="w-5 " />
        </IconButton>
        <span className="h6">{password}</span>
        <IconButton onClick={handlePassword} className="w-9 h-9 text-2xl">
          <CheckIcon className="w-5 " />
        </IconButton>
      </div>
      <div className="mt-3">
        <div className="bg-gray-600 border border-gray-500 flex justify-between items-center gap-3 p-2 rounded-xl">
          <h2 className="pl-2.5 font-bold text-lg ">Длина пароля:</h2>
          <span className=" text-2xl font-medium ml-auto pr-2">{length}</span>
          <button
            onClick={() => {
              setLength((prev) => (prev === 6 ? prev : prev - 1));
            }}
            className="bg-gray-500 active:scale-95 transition w-9 h-9 rounded-full "
          >
            -
          </button>
          <button
            onClick={() => {
              setLength((prev) => (prev === 30 ? prev : prev + 1));
            }}
            className="bg-gray-500 active:scale-95 transition w-9 h-9 rounded-full "
          >
            +
          </button>
        </div>
        <div className="flex mt-3 border border-gray-500 rounded-xl shadow-md overflow-hidden">
          {tabs.map((tab, index) => (
            <button
              className={` 
                ${
                  activeTabs.includes(tab.value) ? 'bg-gray-500' : 'bg-gray-600'
                }
                text-md font-bold flex-1 items-center py-2`}
              key={index}
              onClick={() => toggleTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
