const WelcomeMessage = () => {
  return (
    <section className="lg:flex-1 flex flex-col justify-center lg:gap-10">
      <h1 className="text-gray-700 font-extrabold text-2xl lg:text-4xl">
        Join communities of programmers and start discussions about companies
      </h1>
      <p className="text-gray-500 text-base">
        Search or start new company conversations with a discord-like interface.
        Built with React, Redux, MongoDB, Express, NodeJS and TypeScript.
      </p>
    </section>
  );
};

export default WelcomeMessage;
