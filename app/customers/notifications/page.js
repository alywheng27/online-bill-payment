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
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Search,
  Filter,
  CheckCircle,
  Info,
  Zap,
  Droplets,
  CreditCard,
  FileText,
  Settings,
  Save,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react"

// Mock data for notification history
const mockNotifications = [
  {
    id: "not-001",
    type: "bill_ready",
    title: "Your bill is ready",
    message: "Your electricity and water bill for June 2023 is now available. Total amount: $78.50",
    date: "2023-06-10T09:30:00",
    read: true,
    channel: "email",
    category: "billing",
  },
  {
    id: "not-002",
    type: "payment_confirmation",
    title: "Payment confirmed",
    message: "Your payment of $78.50 has been successfully processed. Thank you!",
    date: "2023-06-15T14:45:00",
    read: true,
    channel: "email",
    category: "payment",
  },
  {
    id: "not-003",
    type: "payment_reminder",
    title: "Payment reminder",
    message: "Your bill of $82.75 is due in 3 days. Please make a payment to avoid late fees.",
    date: "2023-07-12T10:15:00",
    read: false,
    channel: "sms",
    category: "billing",
  },
  {
    id: "not-004",
    type: "outage_alert",
    title: "Scheduled maintenance",
    message: "There will be a scheduled water outage in your area on July 20, 2023, from 10:00 AM to 2:00 PM.",
    date: "2023-07-15T08:00:00",
    read: false,
    channel: "email",
    category: "service",
  },
  {
    id: "not-005",
    type: "usage_alert",
    title: "High usage alert",
    message: "Your electricity usage is 30% higher than your usual consumption. Check your appliances.",
    date: "2023-07-18T16:20:00",
    read: false,
    channel: "push",
    category: "usage",
  },
  {
    id: "not-006",
    type: "bill_ready",
    title: "Your bill is ready",
    message: "Your electricity and water bill for July 2023 is now available. Total amount: $82.75",
    date: "2023-07-10T09:30:00",
    read: true,
    channel: "email",
    category: "billing",
  },
  {
    id: "not-007",
    type: "service_update",
    title: "Service request update",
    message: "Your service request SR-001 has been resolved. Please let us know if you need further assistance.",
    date: "2023-07-08T11:45:00",
    read: true,
    channel: "email",
    category: "service",
  },
  {
    id: "not-008",
    type: "account_update",
    title: "Profile updated",
    message: "Your account information has been successfully updated.",
    date: "2023-07-05T15:30:00",
    read: true,
    channel: "email",
    category: "account",
  },
]

// Mock data for notification preferences
const mockPreferences = {
  channels: {
    email: "john.doe@example.com",
    sms: "(555) 123-4567",
    push: true,
  },
  preferences: {
    billing: {
      bill_ready: {
        email: true,
        sms: false,
        push: true,
      },
      payment_reminder: {
        email: true,
        sms: true,
        push: true,
      },
      payment_confirmation: {
        email: true,
        sms: false,
        push: true,
      },
      payment_overdue: {
        email: true,
        sms: true,
        push: true,
      },
    },
    usage: {
      high_usage_alert: {
        email: true,
        sms: true,
        push: true,
      },
      usage_report: {
        email: true,
        sms: false,
        push: false,
      },
    },
    service: {
      outage_alert: {
        email: true,
        sms: true,
        push: true,
      },
      maintenance_notice: {
        email: true,
        sms: false,
        push: true,
      },
      service_update: {
        email: true,
        sms: false,
        push: true,
      },
    },
    account: {
      account_update: {
        email: true,
        sms: false,
        push: false,
      },
      password_change: {
        email: true,
        sms: false,
        push: false,
      },
    },
  },
  frequency: {
    daily_summary: false,
    weekly_summary: true,
    monthly_summary: true,
  },
  quiet_hours: {
    enabled: true,
    start_time: "22:00",
    end_time: "07:00",
  },
}

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [preferences, setPreferences] = useState(mockPreferences)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterChannel, setFilterChannel] = useState("all")
  const [filterRead, setFilterRead] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [expandedNotification, setExpandedNotification] = useState(null)
  const [showRealTimeNotification, setShowRealTimeNotification] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "customer") {
      router.push("/auth/login")
    }
  }, [router])

  // Filter notifications based on search and filters
  const filteredNotifications = notifications.filter((notification) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = filterCategory === "all" || notification.category === filterCategory

    // Channel filter
    const matchesChannel = filterChannel === "all" || notification.channel === filterChannel

    // Read status filter
    const matchesRead =
      filterRead === "all" ||
      (filterRead === "read" && notification.read) ||
      (filterRead === "unread" && !notification.read)

    return matchesSearch && matchesCategory && matchesChannel && matchesRead
  })

  const handleSavePreferences = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("Notification preferences saved successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const handleToggleExpand = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id)
  }

  const handleTestNotification = () => {
    setShowRealTimeNotification(true)

    // Hide the notification after 5 seconds
    setTimeout(() => {
      setShowRealTimeNotification(false)
    }, 5000)
  }

  const getNotificationIcon = (category) => {
    switch (category) {
      case "billing":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "payment":
        return <CreditCard className="h-5 w-5 text-green-500" />
      case "service":
        return <Settings className="h-5 w-5 text-purple-500" />
      case "usage":
        switch (true) {
          case category.includes("electricity"):
            return <Zap className="h-5 w-5 text-yellow-500" />
          case category.includes("water"):
            return <Droplets className="h-5 w-5 text-blue-500" />
          default:
            return <Info className="h-5 w-5 text-gray-500" />
        }
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4 text-gray-500" />
      case "sms":
        return <MessageSquare className="h-4 w-4 text-gray-500" />
      case "push":
        return <Bell className="h-4 w-4 text-gray-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Manage your notification preferences and view your notification history</p>
        </div>

        {successMessage && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
          </Alert>
        )}

        {showRealTimeNotification && (
          <div className="fixed top-4 right-4 w-80 z-50 animate-in fade-in slide-in-from-right-5">
            <Alert className="bg-blue-50 border-blue-200 shadow-lg">
              <div className="flex justify-between w-full">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <AlertTitle className="text-blue-800">Test Notification</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      This is a test notification to demonstrate real-time alerts.
                    </AlertDescription>
                  </div>
                </div>
                <button
                  onClick={() => setShowRealTimeNotification(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </Alert>
          </div>
        )}

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notification History</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Notification Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Notification Channels</span>
            </TabsTrigger>
          </TabsList>

          {/* Notification History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>View and manage your past notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[130px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>Category</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="usage">Usage</SelectItem>
                        <SelectItem value="account">Account</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterChannel} onValueChange={setFilterChannel}>
                      <SelectTrigger className="w-[130px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>Channel</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterRead} onValueChange={setFilterRead}>
                      <SelectTrigger className="w-[130px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>Status</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Showing {filteredNotifications.length} of {notifications.length} notifications
                  </p>
                  <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                    Mark All as Read
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg ${notification.read ? "" : "bg-blue-50 border-blue-200"}`}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">{getNotificationIcon(notification.category)}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{notification.title}</h3>
                                {!notification.read && <Badge className="bg-blue-500 text-xs">New</Badge>}
                              </div>
                              <p
                                className={`text-sm mt-1 ${
                                  expandedNotification === notification.id ? "" : "line-clamp-2"
                                }`}
                              >
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(notification.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {new Date(notification.date).toLocaleTimeString()}
                                </div>
                                <div className="flex items-center">
                                  {getChannelIcon(notification.channel)}
                                  <span className="ml-1 capitalize">{notification.channel}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleToggleExpand(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {expandedNotification === notification.id ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="mt-3 flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs"
                            >
                              Mark as Read
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">No notifications found</h3>
                      <p className="text-gray-500 mt-1">
                        {searchQuery || filterCategory !== "all" || filterChannel !== "all" || filterRead !== "all"
                          ? "Try adjusting your filters"
                          : "You don't have any notifications yet"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setNotifications(mockNotifications)}>
                  Reset
                </Button>
                <Button variant="outline" onClick={handleTestNotification}>
                  Test Real-time Notification
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose which notifications you want to receive and how</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Billing Notifications</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="font-medium">Notification Type</div>
                        <div className="text-center font-medium">Email</div>
                        <div className="text-center font-medium">SMS</div>
                        <div className="text-center font-medium">Push</div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Bill Ready</Label>
                          <p className="text-xs text-gray-500">When your new bill is available</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.bill_ready.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    bill_ready: {
                                      ...preferences.preferences.billing.bill_ready,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.bill_ready.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    bill_ready: {
                                      ...preferences.preferences.billing.bill_ready,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.bill_ready.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    bill_ready: {
                                      ...preferences.preferences.billing.bill_ready,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Payment Reminder</Label>
                          <p className="text-xs text-gray-500">When your payment is due soon</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_reminder.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_reminder: {
                                      ...preferences.preferences.billing.payment_reminder,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_reminder.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_reminder: {
                                      ...preferences.preferences.billing.payment_reminder,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_reminder.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_reminder: {
                                      ...preferences.preferences.billing.payment_reminder,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Payment Confirmation</Label>
                          <p className="text-xs text-gray-500">When your payment is processed</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_confirmation.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_confirmation: {
                                      ...preferences.preferences.billing.payment_confirmation,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_confirmation.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_confirmation: {
                                      ...preferences.preferences.billing.payment_confirmation,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_confirmation.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_confirmation: {
                                      ...preferences.preferences.billing.payment_confirmation,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Payment Overdue</Label>
                          <p className="text-xs text-gray-500">When your payment is past due</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_overdue.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_overdue: {
                                      ...preferences.preferences.billing.payment_overdue,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_overdue.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_overdue: {
                                      ...preferences.preferences.billing.payment_overdue,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.billing.payment_overdue.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  billing: {
                                    ...preferences.preferences.billing,
                                    payment_overdue: {
                                      ...preferences.preferences.billing.payment_overdue,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Usage Notifications</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>High Usage Alert</Label>
                          <p className="text-xs text-gray-500">When your usage is higher than normal</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.usage.high_usage_alert.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  usage: {
                                    ...preferences.preferences.usage,
                                    high_usage_alert: {
                                      ...preferences.preferences.usage.high_usage_alert,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.usage.high_usage_alert.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  usage: {
                                    ...preferences.preferences.usage,
                                    high_usage_alert: {
                                      ...preferences.preferences.usage.high_usage_alert,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.usage.high_usage_alert.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  usage: {
                                    ...preferences.preferences.usage,
                                    high_usage_alert: {
                                      ...preferences.preferences.usage.high_usage_alert,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Usage Report</Label>
                          <p className="text-xs text-gray-500">Periodic reports on your usage</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.usage.usage_report.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  usage: {
                                    ...preferences.preferences.usage,
                                    usage_report: {
                                      ...preferences.preferences.usage.usage_report,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.usage.usage_report.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  usage: {
                                    ...preferences.preferences.usage,
                                    usage_report: {
                                      ...preferences.preferences.usage.usage_report,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.usage.usage_report.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  usage: {
                                    ...preferences.preferences.usage,
                                    usage_report: {
                                      ...preferences.preferences.usage.usage_report,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Service Notifications</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Outage Alert</Label>
                          <p className="text-xs text-gray-500">When there&apos;s a service outage in your area</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.outage_alert.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    outage_alert: {
                                      ...preferences.preferences.service.outage_alert,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.outage_alert.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    outage_alert: {
                                      ...preferences.preferences.service.outage_alert,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.outage_alert.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    outage_alert: {
                                      ...preferences.preferences.service.outage_alert,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Maintenance Notice</Label>
                          <p className="text-xs text-gray-500">When scheduled maintenance is planned</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.maintenance_notice.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    maintenance_notice: {
                                      ...preferences.preferences.service.maintenance_notice,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.maintenance_notice.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    maintenance_notice: {
                                      ...preferences.preferences.service.maintenance_notice,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.maintenance_notice.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    maintenance_notice: {
                                      ...preferences.preferences.service.maintenance_notice,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Service Update</Label>
                          <p className="text-xs text-gray-500">Updates on your service requests</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.service_update.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    service_update: {
                                      ...preferences.preferences.service.service_update,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.service_update.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    service_update: {
                                      ...preferences.preferences.service.service_update,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.service.service_update.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  service: {
                                    ...preferences.preferences.service,
                                    service_update: {
                                      ...preferences.preferences.service.service_update,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Notifications</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Account Update</Label>
                          <p className="text-xs text-gray-500">When your account information is updated</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.account.account_update.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  account: {
                                    ...preferences.preferences.account,
                                    account_update: {
                                      ...preferences.preferences.account.account_update,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.account.account_update.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  account: {
                                    ...preferences.preferences.account,
                                    account_update: {
                                      ...preferences.preferences.account.account_update,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.account.account_update.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  account: {
                                    ...preferences.preferences.account,
                                    account_update: {
                                      ...preferences.preferences.account.account_update,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Password Change</Label>
                          <p className="text-xs text-gray-500">When your password is changed</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.account.password_change.email}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  account: {
                                    ...preferences.preferences.account,
                                    password_change: {
                                      ...preferences.preferences.account.password_change,
                                      email: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.account.password_change.sms}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  account: {
                                    ...preferences.preferences.account,
                                    password_change: {
                                      ...preferences.preferences.account.password_change,
                                      sms: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={preferences.preferences.account.password_change.push}
                            onCheckedChange={(checked) =>
                              setPreferences({
                                ...preferences,
                                preferences: {
                                  ...preferences.preferences,
                                  account: {
                                    ...preferences.preferences.account,
                                    password_change: {
                                      ...preferences.preferences.account.password_change,
                                      push: checked,
                                    },
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Summary Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="daily-summary">Daily Summary</Label>
                          <p className="text-xs text-gray-500">Receive a daily summary of your account activity</p>
                        </div>
                        <Switch
                          id="daily-summary"
                          checked={preferences.frequency.daily_summary}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              frequency: {
                                ...preferences.frequency,
                                daily_summary: checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="weekly-summary">Weekly Summary</Label>
                          <p className="text-xs text-gray-500">Receive a weekly summary of your account activity</p>
                        </div>
                        <Switch
                          id="weekly-summary"
                          checked={preferences.frequency.weekly_summary}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              frequency: {
                                ...preferences.frequency,
                                weekly_summary: checked,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="monthly-summary">Monthly Summary</Label>
                          <p className="text-xs text-gray-500">Receive a monthly summary of your account activity</p>
                        </div>
                        <Switch
                          id="monthly-summary"
                          checked={preferences.frequency.monthly_summary}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              frequency: {
                                ...preferences.frequency,
                                monthly_summary: checked,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Quiet Hours</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                          <p className="text-xs text-gray-500">
                            Don&apos;t send notifications during specified hours (except for critical alerts)
                          </p>
                        </div>
                        <Switch
                          id="quiet-hours"
                          checked={preferences.quiet_hours.enabled}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              quiet_hours: {
                                ...preferences.quiet_hours,
                                enabled: checked,
                              },
                            })
                          }
                        />
                      </div>
                      {preferences.quiet_hours.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="start-time">Start Time</Label>
                            <Input
                              id="start-time"
                              type="time"
                              value={preferences.quiet_hours.start_time}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  quiet_hours: {
                                    ...preferences.quiet_hours,
                                    start_time: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="end-time">End Time</Label>
                            <Input
                              id="end-time"
                              type="time"
                              value={preferences.quiet_hours.end_time}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  quiet_hours: {
                                    ...preferences.quiet_hours,
                                    end_time: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={isLoading}>
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
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Channels Tab */}
          <TabsContent value="channels">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Manage your notification delivery methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-address">Email Address</Label>
                        <Input
                          id="email-address"
                          type="email"
                          value={preferences.channels.email}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              channels: {
                                ...preferences.channels,
                                email: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verify-email" checked={true} disabled />
                        <Label htmlFor="verify-email" className="text-sm text-gray-500">
                          Email address verified
                        </Label>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
                          Email Preview
                        </h4>
                        <div className="border rounded-lg bg-white p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">From: Utility Billing System</span>
                              <span className="text-sm text-gray-500">June 10, 2023</span>
                            </div>
                            <div className="text-sm font-medium">To: {preferences.channels.email}</div>
                            <div className="text-sm font-medium">Subject: Your Bill is Ready</div>
                            <Separator />
                            <div className="pt-2">
                              <p className="text-sm">Dear Customer,</p>
                              <p className="text-sm mt-2">
                                Your electricity and water bill for June 2023 is now available. The total amount due is
                                $78.50.
                              </p>
                              <p className="text-sm mt-2">Payment is due by June 25, 2023.</p>
                              <div className="mt-4 text-center">
                                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                  View Bill
                                </Button>
                              </div>
                              <p className="text-sm mt-4">Thank you for using our services.</p>
                              <p className="text-sm">Utility Billing System</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                          id="phone-number"
                          type="tel"
                          value={preferences.channels.sms}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              channels: {
                                ...preferences.channels,
                                sms: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verify-phone" checked={true} disabled />
                        <Label htmlFor="verify-phone" className="text-sm text-gray-500">
                          Phone number verified
                        </Label>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                          SMS Preview
                        </h4>
                        <div className="border rounded-lg bg-white p-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Utility Billing System</p>
                                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                              </div>
                            </div>
                            <p className="text-sm">
                              Your bill of $78.50 is due in 3 days. Please make a payment to avoid late fees. Log in to
                              view details.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-opt-in">SMS Opt-in</Label>
                          <p className="text-xs text-gray-500">Standard message and data rates may apply</p>
                        </div>
                        <Switch
                          id="sms-opt-in"
                          checked={true}
                          onCheckedChange={(checked) => {
                            // Handle SMS opt-in/out
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                          <p className="text-xs text-gray-500">Receive notifications on your browser or mobile app</p>
                        </div>
                        <Switch
                          id="push-enabled"
                          checked={preferences.channels.push}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              channels: {
                                ...preferences.channels,
                                push: checked,
                              },
                            })
                          }
                        />
                      </div>
                      {preferences.channels.push && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Bell className="h-4 w-4 mr-2 text-blue-500" />
                            Push Notification Preview
                          </h4>
                          <div className="border rounded-lg bg-white p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                                    <Bell className="h-4 w-4 text-blue-500" />
                                  </div>
                                  <p className="text-sm font-medium">Utility Billing System</p>
                                </div>
                                <p className="text-xs text-gray-500">now</p>
                              </div>
                              <p className="text-sm">
                                Your payment of $78.50 has been successfully processed. Thank you!
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="all" className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all-devices" />
                            <Label htmlFor="all-devices">All Devices</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="current" id="current-device" />
                            <Label htmlFor="current-device">Current Device Only</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Templates</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Bill Ready Template</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm">
                                Your {"{service_type}"} bill for {"{billing_period}"} is now available. Total amount:{" "}
                                {"{amount}"}.
                              </p>
                              <p className="text-xs text-gray-500">
                                Variables: service_type, billing_period, amount, due_date
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Payment Reminder Template</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm">
                                Your bill of {"{amount}"} is due in {"{days_remaining}"} days. Please make a payment to
                                avoid late fees.
                              </p>
                              <p className="text-xs text-gray-500">
                                Variables: amount, days_remaining, due_date, account_number
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Payment Confirmation Template</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm">
                                Your payment of {"{amount}"} has been successfully processed. Thank you!
                              </p>
                              <p className="text-xs text-gray-500">
                                Variables: amount, payment_date, payment_method, confirmation_number
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Outage Alert Template</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="text-sm">
                                There will be a scheduled {"{service_type}"} outage in your area on {"{date}"}, from{" "}
                                {"{start_time}"} to {"{end_time}"}.
                              </p>
                              <p className="text-xs text-gray-500">
                                Variables: service_type, date, start_time, end_time, affected_area
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <p className="text-sm text-gray-500">
                        Note: Notification templates are managed by system administrators. Contact customer support if
                        you have suggestions for template improvements.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Channel Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
