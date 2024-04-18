/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/00IKesFP8sq
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PaginationItem, PaginationContent, Pagination } from "@/components/ui/pagination"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { UserButton } from "@clerk/nextjs"
import { File, ListFilter } from "lucide-react"
import { DatePickerWithRange } from "./ui/date-picker"

export function UserDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-1 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-2">
          {/* Adjusted padding on header and removed left margin on DatePicker container */}
          <div className="flex-1 md:grow-0">
            <div className="flex items-center gap-2">
              <DatePickerWithRange />
              <Button className="ml-2">Filter Dates</Button>

            </div>
          </div>
          <div className="ml-auto"> {/* Keeps other elements aligned to the right */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <div className="ml-auto flex items-center gap-2">

          </div>
        </div>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Meals</CardTitle>
                <CardDescription>Recent meals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-accent">
                      <TableCell>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Sale</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          Fulfilled
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Olivia Smith</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Refund</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="outline">
                          Declined
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Noah Williams</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">noah@example.com</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Subscription</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          Fulfilled
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
                      <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Emma Brown</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">Sale</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          Fulfilled
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
                      <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex items-start bg-muted/50 px-7">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Add a Meal
                </CardTitle>
                <CardDescription>Keep try of your intake with sohrah</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated
                <time dateTime="2023-11-23">November 23, 2023</time>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
  )
}

