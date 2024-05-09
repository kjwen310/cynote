"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from '@/actions/auth';
import createSupabaseBrowserClient from '@/lib/supabase/browser';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

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

const formSchema = z.object({
  email: z.string().email({message: "電子信箱格式不正確" }).min(1, { message: "帳號必填" }),
  password: z.string().min(1, { message: "密碼必填" }),
})

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await signInWithEmailAndPassword(data as any);

    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: "ERROR",
        description: error.message,
      });
    } else {
      toast({
        title: "SUCCESS",
        description: "成功",
      });
    }
  }

  const goSignUp = () => {
    router.push('/sign-up')
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
    <div className='flex-1 space-y-4 mx-auto max-w-lg'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>電子信箱</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入電子信箱" {...field} />
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
                <FormLabel>密碼</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入密碼" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">登入</Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground">
            或以第三方登入
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
            <div>第一次造訪 Cynote？</div>
            <div
              onClick={goSignUp}
              className="text-neutral-500 cursor-pointer underline"
            >
              註冊您的帳號
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
