import React, { useState } from 'react';
import PasswordGenerator from './PasswordGenerator';
import TabsPassword from './TabsPassword';

interface ModalProps {
  onClose: () => void;
  onAdd: (service: string, password: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onAdd }) => {
  const [service, setService] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onAdd(service, password);
    setService('');
    setPassword('');
    onClose();
  };

  const handleAddPassword = (password: string) => {
    setPassword(password);
  };
  const tabs = [
    {
      label: 'Сгенерировать',
      content: <PasswordGenerator onGenerate={handleAddPassword} />,
    },
    {
      label: 'Сохранить',
      content: (
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="mt-2 p-3 border border-gray-500 rounded-xl w-full bg-gray-600 text-white shadow-md "
        />
      ),
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-gray-700 p-5 rounded-xl w-96">
        <h2 className="te text-xl text-center text-white">Название сервиса</h2>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Сервис"
          className="mt-2 p-3 border border-gray-500 rounded-xl w-full bg-gray-600  shadow-md "
        />
        <TabsPassword tabs={tabs} />
        <div className="flex gap-3  ">
          <button
            onClick={handleSubmit}
            className="mt-3 p-2 flex-1 bg-gray-500 text-white rounded"
          >
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="mt-3 p-2 flex-1 bg-gray-500 text-white rounded"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
