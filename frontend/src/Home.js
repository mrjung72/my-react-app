import React from "react";


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <nav className="w-full bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
      </nav>
      
      <main className="text-center mt-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">환영합니다!</h2>
        <p className="text-lg text-gray-600">우리 웹사이트에 오신 것을 환영합니다.</p>
      </main>
    </div>
  );
};

export default Home;
