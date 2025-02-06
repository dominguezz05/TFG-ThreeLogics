export default function TrustedBy() {
  return (
    <section className="py-8 bg-black text-gray-400">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm uppercase tracking-wide mb-6">
          Trusted by teams at
        </p>
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
          <img
            src="/logos/gitroom.png"
            alt="Gitroom"
            className="h-10 grayscale opacity-80 hover:opacity-100 transition"
          />
          <img
            src="/logos/postiz.png"
            alt="Postiz"
            className="h-10 grayscale opacity-80 hover:opacity-100 transition"
          />
          <img
            src="/logos/tavily.png"
            alt="Tavily"
            className="h-10 grayscale opacity-80 hover:opacity-100 transition"
          />
          <img
            src="/logos/copilotkit.png"
            alt="CopilotKit"
            className="h-10 grayscale opacity-80 hover:opacity-100 transition"
          />
          <img
            src="/logos/voum.png"
            alt="Voum"
            className="h-10 grayscale opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>
    </section>
  );
}
