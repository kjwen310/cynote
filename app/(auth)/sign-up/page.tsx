"use client"

import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import createSupabaseBrowserClient from '@/lib/supabase/browser';
import { useForm } from 'react-hook-form';
import { useAction } from '@/hooks/use-action';
import { signUpWithEmailAndPassword } from '@/actions/auth/sign-up-with-email-and-password';
import { InputType } from '@/actions/auth/sign-up-with-email-and-password/types';
import { SignUpWithEmailAndPasswordSchema } from '@/actions/auth/sign-up-with-email-and-password/schema';

import { Icons } from '@/components/icons/Icon'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { execute, isLoading } = useAction(signUpWithEmailAndPassword, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Signed up',
      });
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const onSubmit = (data: InputType) => {
    const { email, password, name } = data;
    execute({ email, password, name });
  }

  const form = useForm({
    resolver: zodResolver(SignUpWithEmailAndPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const goSignIn = () => {
    router.push('/sign-in')
  };

  const signInWithGoogle = async () => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  }

  const signInWithGithub = async () => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  }

  return (
    <div className='flex-1 space-y-4 mx-auto max-w-lg rounded-md bg-slate-200 p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 text-muted-foreground">
            or sign up with third party
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <Button variant="outline" type="button" disabled={isLoading} onClick={signInWithGoogle}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Continue with Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} onClick={signInWithGithub}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Continue with Github
        </Button>
        <div
          className="
            text-neutral-500
            text-center
            text-sm
            font-light
          "
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <div>Already a member?</div>
            <div
              onClick={goSignIn}
              className="text-neutral-500 cursor-pointer underline"
            >
              Sign in your account
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
