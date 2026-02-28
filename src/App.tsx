import { createSignal } from 'solid-js';
import { invoke } from '@tauri-apps/api/core';

export default function App() {
  const [greetMsg, setGreetMsg] = createSignal('');
  const [name, setName] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);

  async function greet() {
    if (!name().trim()) return;

    setIsLoading(true);
    try {
      const message = await invoke<string>('greet', { name: name() });
      setGreetMsg(message);
    } catch (error) {
      console.error('Failed to greet:', error);
      setGreetMsg('Failed to connect to Tauri backend');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div class="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div class="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold tracking-tight">
            Tauri + SolidJS + Tailwind
          </h1>
          <p class="text-xl text-gray-600">Modern desktop app boilerplate</p>
          <div class="flex justify-center gap-2">
            <span class="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
              Tauri v2
            </span>
            <span class="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
              SolidJS
            </span>
            <span class="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
              TypeScript
            </span>
          </div>
        </div>

        {/* Demo Card */}
        <div class="border border-gray-300 rounded-lg shadow-sm">
          <div class="border-b border-gray-300 p-6">
            <h2 class="text-xl font-semibold">Demo</h2>
            <p class="text-gray-600 text-sm mt-1">
              Test the Tauri backend integration
            </p>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex gap-2">
              <input
                type="text"
                placeholder="Enter your name..."
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                onKeyPress={(e) => e.key === 'Enter' && greet()}
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={greet}
                disabled={isLoading() || !name().trim()}
                class="px-4 py-2 bg-blue-600 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                {isLoading() ? '...' : 'Greet'}
              </button>
            </div>
            {greetMsg() && (
              <div class="p-3 bg-gray-100 rounded-md">
                <p class="text-sm text-gray-800">{greetMsg()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div class="grid md:grid-cols-3 gap-4">
          <div class="border border-gray-300 rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-2">⚡ Fast</h3>
            <p class="text-gray-600 text-sm">
              Rust-powered backend with native performance
            </p>
          </div>

          <div class="border border-gray-300 rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-2">🎨 Modern</h3>
            <p class="text-gray-600 text-sm">
              Beautiful UI with SolidJS and Tailwind CSS
            </p>
          </div>

          <div class="border border-gray-300 rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-2">🔐 Secure</h3>
            <p class="text-gray-600 text-sm">
              Memory safety with Rust and Tauri's security model
            </p>
          </div>
        </div>

        {/* Footer */}
        <div class="text-center text-sm text-gray-600">
          <p>Built with Tauri, SolidJS, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}