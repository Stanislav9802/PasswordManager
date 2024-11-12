import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import PasswordList from './components/PasswordList';

const App: React.FC = () => {
  const [passwords, setPasswords] = useState<
    { service: string; password: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const savedPasswords = localStorage.getItem('passwords');
    if (savedPasswords) {
      setPasswords(JSON.parse(savedPasswords));
    }
  }, []);

  const handleAddPassword = (service: string, password: string) => {
    const success = Math.random() < 0.5;
    const lengthServices = service.length < 3;
    const lengthPassword = password.length < 6;
    setIsLoading(true);
    setTimeout(() => {
      if (lengthServices) {
        alert('Слишком короткое навзвание сервиса');
      }
      if (lengthPassword) {
        alert('Слишком короткий пароль ');
      } else if (success) {
        alert('Ошибка при сохранении пароля. Попробуйте еще раз.');
      } else {
        const newPasswords = [...passwords, { service, password }];
        setPasswords(newPasswords);
        localStorage.setItem('passwords', JSON.stringify(newPasswords));
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleDeletePassword = (service: string) => {
    const success = Math.random() < 0.5;
    setIsDelete(true);
    setTimeout(() => {
      if (success) {
        alert('Ошибка при удалении пароля. Попробуйте еще раз.');
      } else {
        const newPasswords = passwords.filter(
          (password) => password.service !== service,
        );
        setPasswords(newPasswords);
        localStorage.setItem('passwords', JSON.stringify(newPasswords));
      }
      setIsDelete(false);
    }, 2000);
  };

  return (
    <div className="p-5 mt-5 rounded-xl just text-white">
      <h1 className="text-2xl font-bold">Менеджер паролей</h1>

      <PasswordList passwords={passwords} onDelete={handleDeletePassword} />
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddPassword}
        />
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-3 p-2 flex-1 bg-gray-500 text-white rounded"
      >
        Добавить пароль
      </button>
      {/* Отображаем окно загрузки, если isLoading равно true */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60">
          <div className="flex flex-col justify-center items-center  bg-gray-600 rounded-md shadow-lg p-6">
            <div className=" animate-spin rounded-full h-10 w-10 border-4 border-t-4 border-x-gray-400 border-y-gray-500" />
            <p className="mt-4 text-white">Идет сохранение данных...</p>
          </div>
        </div>
      )}
      {isDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60">
          <div className="flex flex-col justify-center items-center  bg-gray-600 rounded-md shadow-lg p-6">
            <div className=" animate-spin rounded-full h-10 w-10 border-4 border-t-4 border-x-gray-400 border-y-gray-500" />
            <p className="mt-4 text-white">Идет удаление данных...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
