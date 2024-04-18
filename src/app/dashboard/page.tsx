
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { MealsTable } from '@/components/meals-table';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { AddMealForm } from '@/components/add-meal-form';
import { AiAnalysis } from '@/components/ai-analysis';

export default function Dashboard() {
    const { userId } = auth();
    if (!userId) {
      return redirect("/sign-in");
    }
      return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-1 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-2">
                <div className="ml-4"> 
                    <UserButton afterSignOutUrl="/" />
                </div>
                </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <MealsTable />
              <AiAnalysis />
            </div>
            <AddMealForm />
          </main>
        </div>
      </div>
    );

}
