"use client"


import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  CreditCard,
  Bell,
  Shield,
  BarChart3,
  FileText,
  Phone,
  Mail,
  Home,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Droplets,
  Download,
  Eye,
  EyeOff,
  Save,
  Loader2,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data
const mockUserData = {
  id: "USR12345",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: {
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  },
  accountNumber: "ACCT-98765",
  serviceAddress: {
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  },
  services: ["electricity", "water"],
  balance: 78.5,
  joinDate: "2022-03-15",
  billingPreferences: {
    paymentMethod: "credit_card",
    billingCycle: "monthly",
    paperlessBilling: true,
    autoPayEnabled: true,
    reminderDays: 3,
  },
  securitySettings: {
    lastPasswordChange: "2023-11-10",
    twoFactorEnabled: true,
    twoFactorMethod: "email",
  },
}

const mockUsageData = [
  { month: "Jan", electricity: 420, water: 2200 },
  { month: "Feb", electricity: 380, water: 2100 },
  { month: "Mar", electricity: 410, water: 2300 },
  { month: "Apr", electricity: 390, water: 2150 },
  { month: "May", electricity: 400, water: 2250 },
  { month: "Jun", electricity: 450, water: 2500 },
  { month: "Jul", electricity: 480, water: 2700 },
  { month: "Aug", electricity: 460, water: 2600 },
  { month: "Sep", electricity: 430, water: 2400 },
  { month: "Oct", electricity: 410, water: 2300 },
  { month: "Nov", electricity: 380, water: 2100 },
  { month: "Dec", electricity: 450, water: 2500 },
]

const mockServiceRequests = [
  {
    id: "SR-001",
    type: "Problem Report",
    description: "Flickering lights in the kitchen",
    status: "in_progress",
    dateSubmitted: "2023-12-05",
    lastUpdated: "2023-12-07",
  },
  {
    id: "SR-002",
    type: "Meter Reading",
    description: "Submitting current meter reading",
    status: "completed",
    dateSubmitted: "2023-11-15",
    lastUpdated: "2023-11-16",
  },
  {
    id: "SR-003",
    type: "Service Change",
    description: "Request to add water service",
    status: "pending",
    dateSubmitted: "2023-12-10",
    lastUpdated: "2023-12-10",
  },
]

export default function ProfilePage() {
  const [user, setUser] = useState(mockUserData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [serviceRequest, setServiceRequest] = useState({
    type: "problem",
    description: "",
  })
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "customer") {
      router.push("/auth/login")
    }
  }, [router])

  const handlePersonalInfoUpdate = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("Personal information updated successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  const handleBillingPreferencesUpdate = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("Billing preferences updated successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("Password changed successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  const handleServiceRequestSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("Service request submitted successfully")
      setServiceRequest({
        type: "problem",
        description: "",
      })

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-blue-500">
            <Clock className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <AlertCircle className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {successMessage && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex items-center space-x-2 text-gray-500">
              <span>Account #{user.accountNumber}</span>
              <span>•</span>
              <span>Member since {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-7 lg:w-auto">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Usage</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePersonalInfoUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={user.address.street}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={user.address.city}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={user.address.state}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, state: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={user.address.zipCode}
                        onChange={(e) => setUser({ ...user, address: { ...user.address, zipCode: e.target.value } })}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Details Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>View your account information and service details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Account Number</h3>
                      <p className="text-lg font-medium">{user.accountNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Current Balance</h3>
                      <p className="text-lg font-medium">${user.balance.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                      <p className="text-lg font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Services</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {user.services.includes("electricity") && (
                          <Badge className="bg-yellow-500">
                            <Zap className="h-3 w-3 mr-1" />
                            Electricity
                          </Badge>
                        )}
                        {user.services.includes("water") && (
                          <Badge className="bg-blue-500">
                            <Droplets className="h-3 w-3 mr-1" />
                            Water
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Service Address</h3>
                      <p className="text-lg font-medium">
                        {user.serviceAddress.street}, {user.serviceAddress.city}, {user.serviceAddress.state}{" "}
                        {user.serviceAddress.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Button variant="outline" asChild>
                      <Link href="/bills">
                        <FileText className="h-4 w-4 mr-2" />
                        View Billing Statements
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/bills/pay">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Make a Payment
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Preferences Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Preferences</CardTitle>
                <CardDescription>Manage your payment methods and billing settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBillingPreferencesUpdate}>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Preferred Payment Method</Label>
                      <RadioGroup
                        defaultValue={user.billingPreferences.paymentMethod}
                        onValueChange={(value) =>
                          setUser({
                            ...user,
                            billingPreferences: {
                              ...user.billingPreferences,
                              paymentMethod: value,
                            },
                          })
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit_card" id="credit_card" />
                          <Label htmlFor="credit_card">Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank_account" id="bank_account" />
                          <Label htmlFor="bank_account">Bank Account</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="billingCycle">Billing Cycle</Label>
                      <Select
                        defaultValue={user.billingPreferences.billingCycle}
                        onValueChange={(value) =>
                          setUser({
                            ...user,
                            billingPreferences: {
                              ...user.billingPreferences,
                              billingCycle: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger id="billingCycle">
                          <SelectValue placeholder="Select billing cycle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="reminderDays">Payment Reminder (days before due date)</Label>
                      <Select
                        defaultValue={user.billingPreferences.reminderDays.toString()}
                        onValueChange={(value) =>
                          setUser({
                            ...user,
                            billingPreferences: {
                              ...user.billingPreferences,
                              reminderDays: Number.parseInt(value),
                            },
                          })
                        }
                      >
                        <SelectTrigger id="reminderDays">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="5">5 days</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="paperlessBilling"
                        checked={user.billingPreferences.paperlessBilling}
                        onCheckedChange={(checked) =>
                          setUser({
                            ...user,
                            billingPreferences: {
                              ...user.billingPreferences,
                              paperlessBilling: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor="paperlessBilling">Enroll in Paperless Billing</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="autoPayEnabled"
                        checked={user.billingPreferences.autoPayEnabled}
                        onCheckedChange={(checked) =>
                          setUser({
                            ...user,
                            billingPreferences: {
                              ...user.billingPreferences,
                              autoPayEnabled: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor="autoPayEnabled">Enable Automatic Payments</Label>
                    </div>

                    <div className="mt-6">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Preferences
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Password</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Last changed: {new Date(user.securitySettings.lastPasswordChange).toLocaleDateString()}
                  </p>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Changing Password...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </form>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication (2FA)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">2FA Status</p>
                        <p className="text-sm text-gray-500">
                          {user.securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                      <Switch
                        checked={user.securitySettings.twoFactorEnabled}
                        onCheckedChange={(checked) =>
                          setUser({
                            ...user,
                            securitySettings: {
                              ...user.securitySettings,
                              twoFactorEnabled: checked,
                            },
                          })
                        }
                      />
                    </div>

                    {user.securitySettings.twoFactorEnabled && (
                      <div className="space-y-3">
                        <Label htmlFor="twoFactorMethod">2FA Method</Label>
                        <Select
                          defaultValue={user.securitySettings.twoFactorMethod}
                          onValueChange={(value) =>
                            setUser({
                              ...user,
                              securitySettings: {
                                ...user.securitySettings,
                                twoFactorMethod: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger id="twoFactorMethod">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="app">Authenticator App</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">Started: Today, 10:30 AM</p>
                          <p className="text-sm text-gray-500">IP: 192.168.1.1</p>
                          <p className="text-sm text-gray-500">Device: Chrome on Windows</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Log Out of All Other Devices
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage History Tab */}
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
                <CardDescription>View your electricity and water consumption over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Annual Consumption</h3>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="electricity"
                        name="Electricity (kWh)"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line yAxisId="right" type="monotone" dataKey="water" name="Water (gallons)" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Usage Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                          Electricity Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Month</span>
                            <span className="font-medium">450 kWh</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Previous Month</span>
                            <span className="font-medium">380 kWh</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Change</span>
                            <span className="font-medium text-red-500">+18.4%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>12-Month Average</span>
                            <span className="font-medium">410 kWh</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                          Water Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Month</span>
                            <span className="font-medium">2,500 gallons</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Previous Month</span>
                            <span className="font-medium">2,100 gallons</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Change</span>
                            <span className="font-medium text-red-500">+19.0%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>12-Month Average</span>
                            <span className="font-medium">2,300 gallons</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Energy Saving Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Reduce Standby Power</h4>
                      <p className="text-sm">
                        Unplug electronics when not in use or use power strips to completely cut power.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Use LED Bulbs</h4>
                      <p className="text-sm">
                        Replace incandescent bulbs with LED bulbs to save up to 75% on lighting costs.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Fix Leaky Faucets</h4>
                      <p className="text-sm">A dripping faucet can waste up to 3,000 gallons of water per year.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Adjust Thermostat</h4>
                      <p className="text-sm">Lower your thermostat by 1°F to save up to 3% on heating costs.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>Submit and track your service requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Submit a New Request</h3>
                  <form onSubmit={handleServiceRequestSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="requestType">Request Type</Label>
                      <Select
                        defaultValue={serviceRequest.type}
                        onValueChange={(value) => setServiceRequest({ ...serviceRequest, type: value })}
                      >
                        <SelectTrigger id="requestType">
                          <SelectValue placeholder="Select request type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="problem">Report a Problem</SelectItem>
                          <SelectItem value="meter">Submit Meter Reading</SelectItem>
                          <SelectItem value="service">Request Service Change</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide details about your request..."
                        value={serviceRequest.description}
                        onChange={(e) => setServiceRequest({ ...serviceRequest, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </form>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Requests</h3>
                  <div className="space-y-4">
                    {mockServiceRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{request.type}</p>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">ID: {request.id}</p>
                            <p className="text-sm mt-2">{request.description}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>Submitted: {new Date(request.dateSubmitted).toLocaleDateString()}</p>
                            <p>Updated: {new Date(request.lastUpdated).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Requests
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Contact Information Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with our customer support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <Phone className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-lg mb-2">Phone Support</h3>
                        <p className="text-gray-500 mb-4">Available 24/7 for emergencies</p>
                        <p className="font-medium">(555) 123-4567</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-lg mb-2">Email Support</h3>
                        <p className="text-gray-500 mb-4">Response within 24 hours</p>
                        <p className="font-medium">support@utilitypay.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <Home className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-lg mb-2">Visit Us</h3>
                        <p className="text-gray-500 mb-4">Mon-Fri: 9am-5pm</p>
                        <p className="font-medium">123 Utility Ave, Anytown</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">How do I read my meter?</h4>
                      <p className="text-sm text-gray-600">
                        To read your meter, locate it on your property and record the numbers shown from left to right.
                        For digital meters, simply read the display. For detailed instructions, visit our Help Center.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                      <p className="text-sm text-gray-600">
                        We accept credit/debit cards, bank transfers, and PayPal. You can set up automatic payments or
                        pay manually each billing cycle through our online portal or mobile app.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">How do I report an outage?</h4>
                      <p className="text-sm text-gray-600">
                        For power outages or water service disruptions, please call our emergency line at (555) 999-8888
                        immediately. You can also report non-emergency issues through the Service Requests tab.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/support">Visit Help Center</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}

function Link({ href, children }) {
  return (
    <a href={href} className="inline-flex items-center">
      {children}
    </a>
  )
}
