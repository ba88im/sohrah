"use client";
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'; 
import Link from 'next/link';
import { ArrowRight, LogIn } from "lucide-react";

export default function Home() {
  const { user } = useUser();
  const isAuth = !!user;

  // Define the dashboard URL based on the user's email
  let dashboardUrl = "/dashboard";
  if (user?.emailAddresses?.[0]?.emailAddress.startsWith("admin@")) {
    dashboardUrl = "/admin-dashboard";
  }

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-col items-center sm:flex-row">
                    <h1 className="text-3xl sm:text-5xl font-semibold mb-2 sm:mb-0 sm:mr-3">تتبع كل سعراتك</h1>
                    <UserButton afterSignOutUrl="/" />
                </div>
                <div className="flex mt-2">
                    {isAuth ? (
                      <Link href={dashboardUrl}>
                        <Button> لوحة التحكم <ArrowRight className='ml-2' /></Button>
                      </Link>
                    ) : (
                        <Link href="/sign-in">
                            <Button className='bg-orange-600'>تسجيل الدخول 
                                <LogIn className='w-4 h-4 ml-2'/>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
