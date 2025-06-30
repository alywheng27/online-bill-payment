"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, CreditCard, TrendingUp, AlertTriangle, Zap, Droplets, DollarSign, Calendar } from "lucide-react"

// Mock data
const mockStats = {
  totalCustomers: 1247,
  totalRevenue: 156780.5,
  pendingPayments: 23450.75,
  overdueAccounts: 45,
  electricityConsumption: 125000,
  waterConsumption: 89000,
  paymentSuccessRate: 94.5,
  newCustomersThisMonth: 23,
}

const mockRecentActivity = [
  { id: 1, type: "payment", customer: "John Doe", amount: 125.5, time: "2 minutes ago" },
  { id: 2, type: "registration", customer: "Jane Smith", amount: null, time: "15 minutes ago" },
  { id: 3, type: "payment", customer: "Bob Johnson", amount: 78.25, time: "1 hour ago" },
  { id: 4, type: "overdue", customer: "Alice Brown", amount: 156.75, time: "2 hours ago" },
]

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/auth/login")
    }
  }, [router])

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your utility management system</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+{mockStats.newCustomersThisMonth} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStats.pendingPayments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{mockStats.overdueAccounts} overdue accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.paymentSuccessRate}%</div>
              <Progress value={mockStats.paymentSuccessRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>Electricity Consumption</span>
              </CardTitle>
              <CardDescription>Total kWh consumed this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{mockStats.electricityConsumption.toLocaleString()} kWh</div>
              <Progress value={75} className="mb-2" />
              <p className="text-sm text-gray-600">75% of monthly target</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span>Water Consumption</span>
              </CardTitle>
              <CardDescription>Total gallons consumed this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{mockStats.waterConsumption.toLocaleString()} gal</div>
              <Progress value={60} className="mb-2" />
              <p className="text-sm text-gray-600">60% of monthly target</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {activity.type === "payment" && <CreditCard className="h-4 w-4 text-green-500" />}
                    {activity.type === "registration" && <Users className="h-4 w-4 text-blue-500" />}
                    {activity.type === "overdue" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <div>
                      <p className="font-medium">{activity.customer}</p>
                      <p className="text-sm text-gray-600">
                        {activity.type === "payment" && "Payment received"}
                        {activity.type === "registration" && "New customer registered"}
                        {activity.type === "overdue" && "Payment overdue"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && <p className="font-medium">${activity.amount.toFixed(2)}</p>}
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>System Alerts</span>
              </CardTitle>
              <CardDescription>Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">45 Overdue Accounts</p>
                    <p className="text-sm text-red-600">Requires immediate attention</p>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>
              </div>

              <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-yellow-800">Server Maintenance</p>
                    <p className="text-sm text-yellow-600">Scheduled for tonight at 2 AM</p>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
              </div>

              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-800">Monthly Report Ready</p>
                    <p className="text-sm text-blue-600">December 2023 analytics available</p>
                  </div>
                  <Badge variant="outline">Info</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-medium">Manage Customers</p>
                  <p className="text-sm text-gray-600">Add, edit, or view customer accounts</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">Generate Bills</p>
                  <p className="text-sm text-gray-600">Create monthly utility bills</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-medium">View Reports</p>
                  <p className="text-sm text-gray-600">Analytics and financial reports</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="font-medium">Payment Reconciliation</p>
                  <p className="text-sm text-gray-600">Match payments to bills</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
