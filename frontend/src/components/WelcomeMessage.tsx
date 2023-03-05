const WelcomeMessage = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl lg:text-4xl font-extrabold">
        Join communities of programmers and start discussions about companies
      </h1>
      <p className="text-base text-gray-300">
        Search or start new company conversations with a discord-like interface.
        Built with React, Redux, MongoDB, Express, NodeJS and TypeScript.
      </p>
    </div>
  );
};

export default WelcomeMessage;
