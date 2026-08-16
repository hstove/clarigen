import { useQueryClient } from '@tanstack/react-query';
import { KeyRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getHiroApiKey, setHiroApiKey } from '@/lib/hiro-api-key';

export function HiroApiKeyButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => getHiroApiKey() ?? '');
  const hasApiKey = Boolean(getHiroApiKey());

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) setApiKey(getHiroApiKey() ?? '');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHiroApiKey(apiKey);
    queryClient.invalidateQueries();
    setOpen(false);
  }

  function handleRemove() {
    setApiKey('');
    setHiroApiKey('');
    queryClient.invalidateQueries();
    setOpen(false);
  }

  return (
    <AlertDialog onOpenChange={handleOpenChange} open={open}>
      <AlertDialogTrigger
        render={
          <Button
            aria-label="configure Hiro API key"
            size="sm"
            variant="ghost"
          />
        }
      >
        <KeyRound data-icon="inline-start" />
        <span className="hidden sm:inline">api key</span>
        {hasApiKey ? (
          <span
            className="text-green-600 dark:text-green-500"
            title="Hiro API key configured"
          >
            ●
          </span>
        ) : null}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono">
              Hiro API key
            </AlertDialogTitle>
            <AlertDialogDescription>
              Optional. Stored only in this browser and sent as{' '}
              <code>x-api-key</code> with Hiro API requests.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="hiro-api-key">API key</Label>
            <Input
              autoComplete="off"
              id="hiro-api-key"
              name="hiro-api-key"
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="paste your Hiro API key"
              spellCheck={false}
              type="password"
              value={apiKey}
            />
          </div>
          <AlertDialogFooter>
            {hasApiKey ? (
              <Button
                onClick={handleRemove}
                type="button"
                variant="destructive"
              >
                remove
              </Button>
            ) : null}
            <AlertDialogCancel type="button">cancel</AlertDialogCancel>
            <Button type="submit">save</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
