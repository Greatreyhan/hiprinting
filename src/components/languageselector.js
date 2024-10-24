import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div className="flex flex-row items-center right-1 border border-white rounded-md ">
          <button onClick={() => changeLanguage('en')} className="p-2 flex flex-row items-center text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-200 focus:outline-none"
          >
            <span className="text-md">EN</span>
            <span className="ml-1"> <img src="https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png" className="w-5 h-5" /></span>
          </button>

          <button onClick={() => changeLanguage('id')} className="p-2 flex flex-row items-center border-l border-white text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none "
          >
            <span className="text-md">ID</span>
            <span className="ml-1"> <img src="https://img.icons8.com/color/48/indonesia-circular.png" className="w-5 h-5" /></span>
          </button>
        </div>
    </div>
  );
}

export default LanguageSelector;
