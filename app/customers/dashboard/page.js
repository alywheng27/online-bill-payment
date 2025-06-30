"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Droplets, CreditCard, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

// Mock data
const mockBills = [
  {
    id: "ELEC-2024-001",
    type: "electricity",
    amount: 125.5,
    dueDate: "2024-01-15",
    status: "pending",
    period: "December 2023",
    usage: 450,
    unit: "kWh",
  },
  {
    id: "WATER-2024-001",
    type: "water",
    amount: 78.25,
    dueDate: "2024-01-20",
    status: "pending",
    period: "December 2023",
    usage: 2500,
    unit: "gallons",
  },
  {
    id: "ELEC-2023-012",
    type: "electricity",
    amount: 98.75,
    dueDate: "2023-12-15",
    status: "paid",
    period: "November 2023",
    usage: 380,
    unit: "kWh",
  },
]

const mockUsageData = [
  { month: "Aug", electricity: 420, water: 2200 },
  { month: "Sep", electricity: 380, water: 2100 },
  { month: "Oct", electricity: 410, water: 2300 },
  { month: "Nov", electricity: 380, water: 2100 },
  { month: "Dec", electricity: 450, water: 2500 },
]

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const email = localStorage.getItem("userEmail")

    if (role !== "customer") {
      router.push("/auth/login")
      return
    }

    setUserEmail(email || "")
  }, [router])

  const pendingBills = mockBills.filter((bill) => bill.status === "pending")
  const totalDue = pendingBills.reduce((sum, bill) => sum + bill.amount, 0)
  const overdueBills = pendingBills.filter((bill) => new Date(bill.dueDate) < new Date())

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600">Here&apos;s an overview of your utility accounts</p>
        </div>

        {/* Alerts */}
        {overdueBills.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You have {overdueBills.length} overdue bill{overdueBills.length > 1 ? "s" : ""}. Please pay immediately to
              avoid service interruption.
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Due</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {pendingBills.length} pending bill{pendingBills.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Electricity Usage</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">450 kWh</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,500 gal</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 15</div>
              <p className="text-xs text-muted-foreground">5 days remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Bills
                <Button variant="outline" size="sm" asChild>
                  <Link href="/bills">View All</Link>
                </Button>
              </CardTitle>
              <CardDescription>Your latest utility bills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBills.slice(0, 3).map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {bill.type === "electricity" ? (
                      <Zap className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Droplets className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{bill.period}</p>
                      <p className="text-sm text-gray-600">{bill.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${bill.amount.toFixed(2)}</p>
                    <Badge variant={bill.status === "paid" ? "default" : "destructive"}>
                      {bill.status === "paid" ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" /> Paid
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" /> Due {bill.dueDate}
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Usage Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Usage Trends</span>
              </CardTitle>
              <CardDescription>Last 5 months consumption</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockUsageData.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{data.month}</span>
                    <span>
                      {data.electricity} kWh | {data.water} gal
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={(data.electricity / 500) * 100} className="h-2" />
                    <Progress value={(data.water / 3000) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/bills/pay">
                  <CreditCard className="h-6 w-6" />
                  <span>Pay Bills</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/bills">
                  <Calendar className="h-6 w-6" />
                  <span>View Bills</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2">
                <Link href="/profile">
                  <TrendingUp className="h-6 w-6" />
                  <span>Usage History</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
