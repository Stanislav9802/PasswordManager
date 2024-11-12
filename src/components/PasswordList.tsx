import React, { useState } from 'react';
import { IconButton } from './IconButton';
import { DocumentMinusIcon } from '../shared/icons/DocumentMinusIcon';
import { ClipboardIcon } from '../shared/icons/ClipboardIcon';
import { EyeIcon } from '../shared/icons/EyeIcon';

interface Password {
  index: number;
  service: string;
  password: string;
}

interface PasswordListProps {
  passwords: Password[];
  onDelete: (service: string) => void;
}

const PasswordList: React.FC<PasswordListProps> = ({ passwords, onDelete }) => {
  // const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIndex, setShowPasswordIndex] = useState(null);

  const togglePasswordVisibility = (index: any) => {
    setShowPasswordIndex(index === showPasswordIndex ? null : index);
    console.log(showPasswordIndex);
  };

  return (
    <div className="mt-5 bg-gray-700 p-5 border border-gray-600 rounded-xl">
      <h2 className=" text-xl font-bold ">Сохраненные пароли</h2>
      <ul className="flex flex-col mt-2 gap-2">
        <li className="flex justify-between items-center  text-lg px-2">
          <span className="w-20">Сервис</span>
          <span className="w-20">Пароль</span>
          <span className="w-28 pl-5">Действия</span>
        </li>
        {passwords.map(({ service, password }) => (
          <li
            key={service}
            className=" p-2 flex justify-between items-center border border-gray-500 rounded-xl"
          >
            <span className="w-20">{service}</span>
            <span className="w-20 ">
              {showPasswordIndex === service ? password : '********'}
            </span>
            <div className="flex">
              <IconButton
                onClick={() => togglePasswordVisibility(service)}
                className="w-9 h-9"
              >
                <EyeIcon className="w-5" />
              </IconButton>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(password);
                }}
                className="w-9 h-9"
              >
                <ClipboardIcon className="w-5" />
              </IconButton>
              <IconButton onClick={() => onDelete(service)} className="w-9 h-9">
                <DocumentMinusIcon className="w-5" />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordList;
