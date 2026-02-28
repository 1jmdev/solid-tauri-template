import { createSignal } from 'solid-js';
import { invoke } from '@tauri-apps/api/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

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
    <div class="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div class="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold tracking-tight">
            Tauri + SolidJS + Tailwind
          </h1>
          <p class="text-xl text-muted-foreground">Modern desktop app boilerplate</p>
          <div class="flex justify-center gap-2">
            <Badge variant="secondary">Tauri v2</Badge>
            <Badge variant="secondary">SolidJS</Badge>
            <Badge variant="secondary">TypeScript</Badge>
          </div>
        </div>

        {/* Demo Card */}
        <Card>
          <CardHeader>
            <CardTitle>Demo</CardTitle>
            <CardDescription>Test the Tauri backend integration</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your name..."
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                onKeyPress={(e) => e.key === 'Enter' && greet()}
                class="flex-1"
              />
              <Button
                onClick={greet}
                disabled={isLoading() || !name().trim()}
              >
                {isLoading() ? <Spinner size="sm" class="text-primary-foreground" /> : 'Greet'}
              </Button>
            </div>
            {greetMsg() && (
              <Alert>
                <AlertDescription>{greetMsg()}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div class="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent class="pt-6">
              <h3 class="text-lg font-semibold mb-2">Fast</h3>
              <p class="text-muted-foreground text-sm">
                Rust-powered backend with native performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <h3 class="text-lg font-semibold mb-2">Modern</h3>
              <p class="text-muted-foreground text-sm">
                Beautiful UI with SolidJS and Tailwind CSS
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <h3 class="text-lg font-semibold mb-2">Secure</h3>
              <p class="text-muted-foreground text-sm">
                Memory safety with Rust and Tauri's security model
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div class="text-center text-sm text-muted-foreground">
          <p>Built with Tauri, SolidJS, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
