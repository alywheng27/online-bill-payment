"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertCircle,
  Bell,
  Calendar,
  Clock,
  Database,
  Download,
  Globe,
  Key,
  Mail,
  Palette,
  Save,
  Search,
  Settings,
  Shield,
  Upload,
  User,
  Users,
} from "lucide-react"
import { toast } from "sonner"

export default function SystemSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [testingIntegration, setTestingIntegration] = useState(false)
  const [backingUp, setBackingUp] = useState(false)
  const [restoring, setRestoring] = useState(false)

  const handleSaveSettings = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      toast.success("Your system settings have been saved successfully.")
    }, 1500)
  }

  const handleTestIntegration = () => {
    setTestingIntegration(true)
    // Simulate API call
    setTimeout(() => {
      setTestingIntegration(false)
      toast.success("The connection to the payment gateway was successful.")
    }, 2000)
  }

  const handleBackup = () => {
    setBackingUp(true)
    // Simulate API call
    setTimeout(() => {
      setBackingUp(false)
      toast.success("System backup has been created successfully.")
    }, 2500)
  }

  const handleRestore = () => {
    setRestoring(true)
    // Simulate API call
    setTimeout(() => {
      setRestoring(false)
      toast.success("System has been restored from the selected backup.")
    }, 3000)
  }

  // Define variables for notification templates
  const customer_name = "{{customer_name}}"
  const account_number = "{{account_number}}"
  const bill_number = "{{bill_number}}"
  const billing_period = "{{billing_period}}"
  const due_date = "{{due_date}}"
  const amount_due = "{{amount_due}}"
  const website_url = "{{website_url}}"
  const company_name = "{{company_name}}"

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure and manage system-wide settings and parameters.</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 lg:w-fit">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Backup</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Logs</span>
            </TabsTrigger>
            <TabsTrigger value="customization" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Customization</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general system settings and parameters.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website-name">Website Name</Label>
                    <Input id="website-name" defaultValue="UtilityPay" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website-url">Website URL</Label>
                    <Input id="website-url" defaultValue="https://utilitypay.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Electricity and Water District" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" defaultValue="contact@utilitypay.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="default-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                        <SelectItem value="aud">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-payments">Enable Online Payments</Label>
                      <Switch id="enable-payments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-notifications">Enable Email Notifications</Label>
                      <Switch id="enable-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-sms">Enable SMS Notifications</Label>
                      <Switch id="enable-sms" />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-reports">Enable Reports Module</Label>
                      <Switch id="enable-reports" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-tariffs">Enable Tariff Management</Label>
                      <Switch id="enable-tariffs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-maintenance">Maintenance Mode</Label>
                      <Switch id="enable-maintenance" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Company logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <Input id="logo-upload" type="file" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Recommended size: 512x512px. Max file size: 2MB.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security-related settings and policies.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="min-password-length">Minimum Password Length</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="min-password-length"
                          defaultValue={[8]}
                          max={20}
                          min={6}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">8</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">Password Expiry (Days)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="password-expiry"
                          defaultValue={[90]}
                          max={180}
                          min={30}
                          step={15}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">90</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
                      <Switch id="require-uppercase" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="require-lowercase">Require Lowercase Letters</Label>
                      <Switch id="require-lowercase" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="require-numbers">Require Numbers</Label>
                      <Switch id="require-numbers" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="require-special">Require Special Characters</Label>
                      <Switch id="require-special" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="prevent-reuse">Prevent Password Reuse</Label>
                      <Switch id="prevent-reuse" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-login-attempts">Max Failed Login Attempts</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="max-login-attempts">
                          <SelectValue placeholder="Select attempts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lockout-duration">Account Lockout Duration</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="lockout-duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="1440">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="session-timeout">
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                      <Switch id="enable-2fa" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="require-2fa-admin">Require 2FA for Admin Users</Label>
                      <Switch id="require-2fa-admin" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="2fa-methods">Available 2FA Methods</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="2fa-email" defaultChecked />
                        <Label htmlFor="2fa-email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="2fa-sms" defaultChecked />
                        <Label htmlFor="2fa-sms">SMS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="2fa-app" defaultChecked />
                        <Label htmlFor="2fa-app">Authenticator App</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="2fa-security-key" />
                        <Label htmlFor="2fa-security-key">Security Key</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure email and notification settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input id="smtp-server" defaultValue="smtp.example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" defaultValue="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-username">SMTP Username</Label>
                      <Input id="smtp-username" defaultValue="notifications@utilitypay.example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <Input id="smtp-password" type="password" defaultValue="••••••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sender-name">Sender Name</Label>
                      <Input id="sender-name" defaultValue="UtilityPay Notifications" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sender-email">Sender Email</Label>
                      <Input id="sender-email" defaultValue="notifications@utilitypay.example.com" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="enable-smtp-ssl">Enable SMTP SSL/TLS</Label>
                    <Switch id="enable-smtp-ssl" defaultChecked />
                  </div>
                  <Button variant="outline" className="mt-2">
                    <Mail className="mr-2 h-4 w-4" />
                    Test Email Configuration
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Templates</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-select">Select Template to Edit</Label>
                      <Select defaultValue="new-bill">
                        <SelectTrigger id="template-select">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-bill">New Bill Notification</SelectItem>
                          <SelectItem value="payment-confirmation">Payment Confirmation</SelectItem>
                          <SelectItem value="payment-reminder">Payment Reminder</SelectItem>
                          <SelectItem value="overdue-notice">Overdue Notice</SelectItem>
                          <SelectItem value="account-created">Account Created</SelectItem>
                          <SelectItem value="password-reset">Password Reset</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-subject">Email Subject</Label>
                      <Input id="template-subject" defaultValue="Your New Utility Bill is Ready" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-content">Email Content</Label>
                      <Textarea
                        id="template-content"
                        rows={10}
                        defaultValue={`Dear ${customer_name},

We are writing to inform you that your new utility bill for account ${account_number} is now available.

Bill Details:
- Bill Number: ${bill_number}
- Billing Period: ${billing_period}
- Due Date: ${due_date}
- Amount Due: ${amount_due}

You can view and pay your bill online by logging into your account at ${website_url}.

Thank you for using our online billing system.

Regards,
${company_name} Team`}
                      />
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Available Variables</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{customer_name}</Badge>
                        <Badge variant="outline">{account_number}</Badge>
                        <Badge variant="outline">{bill_number}</Badge>
                        <Badge variant="outline">{billing_period}</Badge>
                        <Badge variant="outline">{due_date}</Badge>
                        <Badge variant="outline">{amount_due}</Badge>
                        <Badge variant="outline">{website_url}</Badge>
                        <Badge variant="outline">{company_name}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notify-new-bill">New Bill Notifications</Label>
                      <Switch id="notify-new-bill" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notify-payment">Payment Confirmations</Label>
                      <Switch id="notify-payment" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notify-reminder">Payment Reminders</Label>
                      <Switch id="notify-reminder" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notify-overdue">Overdue Notices</Label>
                      <Switch id="notify-overdue" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notify-account">Account Updates</Label>
                      <Switch id="notify-account" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notify-system">System Notifications</Label>
                      <Switch id="notify-system" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure third-party service integrations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Gateways</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="Stripe logo"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Stripe</h4>
                          <p className="text-sm text-muted-foreground">Credit card and ACH payments</p>
                        </div>
                      </div>
                      <Switch id="enable-stripe" defaultChecked />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="stripe-public-key">Stripe Public Key</Label>
                        <Input id="stripe-public-key" defaultValue="pk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                        <Input id="stripe-secret-key" defaultValue="sk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-webhook-secret">Webhook Secret</Label>
                        <Input id="stripe-webhook-secret" defaultValue="whsec_..." />
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleTestIntegration} disabled={testingIntegration}>
                      {testingIntegration ? (
                        <>
                          <span className="animate-spin mr-2">◌</span>
                          Testing...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Test Stripe Integration
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="PayPal logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">PayPal</h4>
                        <p className="text-sm text-muted-foreground">PayPal and credit card payments</p>
                      </div>
                    </div>
                    <Switch id="enable-paypal" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
                      <Input id="paypal-client-id" placeholder="Enter client ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-secret">PayPal Secret</Label>
                      <Input id="paypal-secret" placeholder="Enter secret" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-environment">Environment</Label>
                      <Select defaultValue="sandbox">
                        <SelectTrigger id="paypal-environment">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sandbox">Sandbox</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Providers</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Twilio logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Twilio</h4>
                        <p className="text-sm text-muted-foreground">SMS notifications</p>
                      </div>
                    </div>
                    <Switch id="enable-twilio" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="twilio-account-sid">Account SID</Label>
                      <Input id="twilio-account-sid" placeholder="Enter account SID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twilio-auth-token">Auth Token</Label>
                      <Input id="twilio-auth-token" placeholder="Enter auth token" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twilio-phone-number">Phone Number</Label>
                      <Input id="twilio-phone-number" placeholder="+1234567890" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Analytics</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Google Analytics logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Google Analytics</h4>
                        <p className="text-sm text-muted-foreground">Website analytics</p>
                      </div>
                    </div>
                    <Switch id="enable-ga" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ga-tracking-id">Tracking ID</Label>
                    <Input id="ga-tracking-id" defaultValue="G-XXXXXXXXXX" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Backup and Restore */}
          <TabsContent value="backup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Backup and Restore</CardTitle>
                <CardDescription>Manage system backups and restore data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Create Backup</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="backup-type">Backup Type</Label>
                      <Select defaultValue="full">
                        <SelectTrigger id="backup-type">
                          <SelectValue placeholder="Select backup type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Backup</SelectItem>
                          <SelectItem value="data">Data Only</SelectItem>
                          <SelectItem value="config">Configuration Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-format">Backup Format</Label>
                      <Select defaultValue="zip">
                        <SelectTrigger id="backup-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zip">ZIP Archive</SelectItem>
                          <SelectItem value="sql">SQL Dump</SelectItem>
                          <SelectItem value="json">JSON Export</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="include-logs">Include System Logs</Label>
                    <Switch id="include-logs" />
                  </div>
                  <Button onClick={handleBackup} disabled={backingUp}>
                    {backingUp ? (
                      <>
                        <span className="animate-spin mr-2">◌</span>
                        Creating Backup...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Create Backup Now
                      </>
                    )}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Scheduled Backups</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-time">Backup Time</Label>
                      <Select defaultValue="02:00">
                        <SelectTrigger id="backup-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="00:00">12:00 AM</SelectItem>
                          <SelectItem value="02:00">2:00 AM</SelectItem>
                          <SelectItem value="04:00">4:00 AM</SelectItem>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-retention">Retention Period (Days)</Label>
                      <Input id="backup-retention" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-storage">Backup Storage Location</Label>
                      <Select defaultValue="local">
                        <SelectTrigger id="backup-storage">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="s3">Amazon S3</SelectItem>
                          <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                          <SelectItem value="azure">Azure Blob Storage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="enable-scheduled-backups">Enable Scheduled Backups</Label>
                    <Switch id="enable-scheduled-backups" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Restore from Backup</h3>
                  <div className="space-y-2">
                    <Label htmlFor="restore-file">Upload Backup File</Label>
                    <Input id="restore-file" type="file" />
                  </div>
                  <Alert variant="warning">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Warning: Restoring from a backup will overwrite current data. This action cannot be undone.
                    </AlertDescription>
                  </Alert>
                  <Button variant="destructive" onClick={handleRestore} disabled={restoring}>
                    {restoring ? (
                      <>
                        <span className="animate-spin mr-2">◌</span>
                        Restoring...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Restore from Backup
                      </>
                    )}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Backups</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2023-06-13 02:00:00</TableCell>
                          <TableCell>Full</TableCell>
                          <TableCell>256 MB</TableCell>
                          <TableCell>
                            <Badge variant="success" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-12 02:00:00</TableCell>
                          <TableCell>Full</TableCell>
                          <TableCell>254 MB</TableCell>
                          <TableCell>
                            <Badge variant="success" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-11 02:00:00</TableCell>
                          <TableCell>Full</TableCell>
                          <TableCell>252 MB</TableCell>
                          <TableCell>
                            <Badge variant="success" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All Backups</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user roles and permissions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">User Roles</h3>
                    <Button variant="outline" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      Add New Role
                    </Button>
                  </div>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Users</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Super Admin</TableCell>
                          <TableCell>Full system access with all permissions</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Administrator</TableCell>
                          <TableCell>System administration with limited access</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Billing Manager</TableCell>
                          <TableCell>Manage bills and payments</TableCell>
                          <TableCell>8</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Customer Support</TableCell>
                          <TableCell>Handle customer inquiries and issues</TableCell>
                          <TableCell>12</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Report Viewer</TableCell>
                          <TableCell>View reports and analytics</TableCell>
                          <TableCell>6</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Permission Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="role-select">Select Role to Edit Permissions</Label>
                    <Select defaultValue="admin">
                      <SelectTrigger id="role-select">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="billing">Billing Manager</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="reports">Report Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-4">Administrator Permissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium">Customer Management</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-view-customers" defaultChecked />
                            <Label htmlFor="perm-view-customers">View Customers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-edit-customers" defaultChecked />
                            <Label htmlFor="perm-edit-customers">Edit Customers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-delete-customers" />
                            <Label htmlFor="perm-delete-customers">Delete Customers</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium">Bill Management</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-view-bills" defaultChecked />
                            <Label htmlFor="perm-view-bills">View Bills</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-create-bills" defaultChecked />
                            <Label htmlFor="perm-create-bills">Create Bills</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-edit-bills" defaultChecked />
                            <Label htmlFor="perm-edit-bills">Edit Bills</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-delete-bills" />
                            <Label htmlFor="perm-delete-bills">Delete Bills</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium">Payment Management</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-view-payments" defaultChecked />
                            <Label htmlFor="perm-view-payments">View Payments</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-process-payments" defaultChecked />
                            <Label htmlFor="perm-process-payments">Process Payments</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-refund-payments" />
                            <Label htmlFor="perm-refund-payments">Refund Payments</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium">Reports & Analytics</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-view-reports" defaultChecked />
                            <Label htmlFor="perm-view-reports">View Reports</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-export-reports" defaultChecked />
                            <Label htmlFor="perm-export-reports">Export Reports</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-create-reports" />
                            <Label htmlFor="perm-create-reports">Create Custom Reports</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium">System Settings</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-view-settings" defaultChecked />
                            <Label htmlFor="perm-view-settings">View Settings</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-edit-settings" />
                            <Label htmlFor="perm-edit-settings">Edit Settings</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-manage-users" />
                            <Label htmlFor="perm-manage-users">Manage Users</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium">Tariff Management</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-view-tariffs" defaultChecked />
                            <Label htmlFor="perm-view-tariffs">View Tariffs</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-edit-tariffs" />
                            <Label htmlFor="perm-edit-tariffs">Edit Tariffs</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-approve-tariffs" />
                            <Label htmlFor="perm-approve-tariffs">Approve Tariff Changes</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Logs and Auditing */}
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Logs and Auditing</CardTitle>
                <CardDescription>View system logs and audit trails.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">System Logs</h3>
                    <p className="text-sm text-muted-foreground">View and filter system logs.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Filter by Date
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search logs..." className="pl-10" />
                  </div>
                </div>
                <div className="border rounded-md">
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>User</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2023-06-13 14:32:45</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-red-100 text-red-800">
                              ERROR
                            </Badge>
                          </TableCell>
                          <TableCell>PaymentService</TableCell>
                          <TableCell>Failed to process payment: Invalid card number</TableCell>
                          <TableCell>customer@example.com</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-13 14:30:12</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              WARN
                            </Badge>
                          </TableCell>
                          <TableCell>AuthService</TableCell>
                          <TableCell>Multiple failed login attempts detected</TableCell>
                          <TableCell>unknown</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-13 14:28:05</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              INFO
                            </Badge>
                          </TableCell>
                          <TableCell>BillingService</TableCell>
                          <TableCell>Generated 150 new bills for June cycle</TableCell>
                          <TableCell>admin@example.com</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-13 14:25:30</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              DEBUG
                            </Badge>
                          </TableCell>
                          <TableCell>DatabaseService</TableCell>
                          <TableCell>Database connection pool initialized with 10 connections</TableCell>
                          <TableCell>system</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-13 14:20:18</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              INFO
                            </Badge>
                          </TableCell>
                          <TableCell>UserService</TableCell>
                          <TableCell>User account created</TableCell>
                          <TableCell>admin@example.com</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-13 14:15:42</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              INFO
                            </Badge>
                          </TableCell>
                          <TableCell>AuthService</TableCell>
                          <TableCell>User logged in successfully</TableCell>
                          <TableCell>admin@example.com</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-06-13 14:10:05</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              INFO
                            </Badge>
                          </TableCell>
                          <TableCell>SystemService</TableCell>
                          <TableCell>System started successfully</TableCell>
                          <TableCell>system</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Audit Trail</h3>
                  <div className="border rounded-md">
                    <ScrollArea className="h-[300px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Resource</TableHead>
                            <TableHead>Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2023-06-13 14:45:12</TableCell>
                            <TableCell>admin@example.com</TableCell>
                            <TableCell>UPDATE</TableCell>
                            <TableCell>System Settings</TableCell>
                            <TableCell>Updated SMTP configuration</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-06-13 14:40:30</TableCell>
                            <TableCell>billing@example.com</TableCell>
                            <TableCell>CREATE</TableCell>
                            <TableCell>Tariff</TableCell>
                            <TableCell>Created new electricity tariff &ldquo;Residential Standard&rdquo;</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-06-13 14:35:22</TableCell>
                            <TableCell>admin@example.com</TableCell>
                            <TableCell>DELETE</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Deleted user account test@example.com</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-06-13 14:30:15</TableCell>
                            <TableCell>support@example.com</TableCell>
                            <TableCell>UPDATE</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Updated contact information for customer ID 12345</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-06-13 14:25:08</TableCell>
                            <TableCell>billing@example.com</TableCell>
                            <TableCell>UPDATE</TableCell>
                            <TableCell>Bill</TableCell>
                            <TableCell>Adjusted bill amount for bill ID 98765</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Log Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select defaultValue="info">
                        <SelectTrigger id="log-level">
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="log-retention">Log Retention (Days)</Label>
                      <Input id="log-retention" type="number" defaultValue="90" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-audit-trail">Enable Audit Trail</Label>
                      <Switch id="enable-audit-trail" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="log-user-actions">Log User Actions</Label>
                      <Switch id="log-user-actions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="log-system-events">Log System Events</Label>
                      <Switch id="log-system-events" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="log-api-requests">Log API Requests</Label>
                      <Switch id="log-api-requests" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Clear Logs</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Customization */}
          <TabsContent value="customization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customization Options</CardTitle>
                <CardDescription>Customize the appearance and branding of the website.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Branding</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id="primary-color"
                          defaultValue="#0070f3"
                          className="w-10 h-10 rounded-md border"
                        />
                        <Input defaultValue="#0070f3" className="flex-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id="secondary-color"
                          defaultValue="#f5f5f5"
                          className="w-10 h-10 rounded-md border"
                        />
                        <Input defaultValue="#f5f5f5" className="flex-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id="accent-color"
                          defaultValue="#ff4081"
                          className="w-10 h-10 rounded-md border"
                        />
                        <Input defaultValue="#ff4081" className="flex-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-color">Text Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id="text-color"
                          defaultValue="#333333"
                          className="w-10 h-10 rounded-md border"
                        />
                        <Input defaultValue="#333333" className="flex-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logo and Favicon</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="header-logo">Header Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=64&width=64"
                            alt="Header logo"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <Input id="header-logo" type="file" />
                          <p className="text-sm text-muted-foreground mt-1">
                            Recommended size: 200x50px. Max file size: 1MB.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="favicon">Favicon</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=32&width=32"
                            alt="Favicon"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <Input id="favicon" type="file" />
                          <p className="text-sm text-muted-foreground mt-1">
                            Recommended size: 32x32px. Max file size: 100KB.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Typography</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="heading-font">Heading Font</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger id="heading-font">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="open-sans">Open Sans</SelectItem>
                          <SelectItem value="montserrat">Montserrat</SelectItem>
                          <SelectItem value="lato">Lato</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="body-font">Body Font</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger id="body-font">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="open-sans">Open Sans</SelectItem>
                          <SelectItem value="montserrat">Montserrat</SelectItem>
                          <SelectItem value="lato">Lato</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="base-font-size">Base Font Size</Label>
                      <Select defaultValue="16">
                        <SelectTrigger id="base-font-size">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="14">14px</SelectItem>
                          <SelectItem value="16">16px</SelectItem>
                          <SelectItem value="18">18px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Layout and Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-dark-mode">Enable Dark Mode</Label>
                      <Switch id="enable-dark-mode" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="user-theme-toggle">Allow Users to Toggle Theme</Label>
                      <Switch id="user-theme-toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="rounded-corners">Rounded Corners</Label>
                      <Switch id="rounded-corners" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="enable-animations">Enable Animations</Label>
                      <Switch id="enable-animations" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="container-width">Container Width</Label>
                    <Select defaultValue="lg">
                      <SelectTrigger id="container-width">
                        <SelectValue placeholder="Select width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small (640px)</SelectItem>
                        <SelectItem value="md">Medium (768px)</SelectItem>
                        <SelectItem value="lg">Large (1024px)</SelectItem>
                        <SelectItem value="xl">Extra Large (1280px)</SelectItem>
                        <SelectItem value="2xl">2XL (1536px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Custom CSS</h3>
                  <div className="space-y-2">
                    <Label htmlFor="custom-css">Custom CSS</Label>
                    <Textarea
                      id="custom-css"
                      rows={10}
                      placeholder="/* Add your custom CSS here */"
                      className="font-mono text-sm"
                    />
                    <p className="text-sm text-muted-foreground">
                      Custom CSS will be applied to the entire website. Use with caution.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Preview Changes</Button>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
