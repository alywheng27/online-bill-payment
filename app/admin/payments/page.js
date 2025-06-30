"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  LinkIcon,
  CreditCard,
  DollarSign,
  FileSpreadsheet,
  BarChart3,
  RefreshCw,
  HelpCircle,
  Eye,
} from "lucide-react"

// Custom date formatting function to replace date-fns
const formatDate = (date, format = "yyyy-MM-dd") => {
  const d = new Date(date)
  
  if (format === "yyyy-MM-dd") {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  return d.toISOString().split('T')[0] // fallback to yyyy-MM-dd
}

// Mock payment data
const mockPayments = [
  {
    id: "PAY-2024-001",
    customerId: "CUST-001",
    customerName: "John Doe",
    amount: 125.5,
    date: "2024-01-05",
    method: "credit_card",
    status: "reconciled",
    billId: "ELEC-2024-001",
    billAmount: 125.5,
    reference: "TXN-123456",
    gateway: "stripe",
  },
  {
    id: "PAY-2024-002",
    customerId: "CUST-001",
    customerName: "John Doe",
    amount: 78.25,
    date: "2024-01-07",
    method: "bank_transfer",
    status: "reconciled",
    billId: "WATER-2024-001",
    billAmount: 78.25,
    reference: "BT-789012",
    gateway: "bank",
  },
  {
    id: "PAY-2024-003",
    customerId: "CUST-002",
    customerName: "Jane Smith",
    amount: 98.75,
    date: "2023-12-10",
    method: "credit_card",
    status: "reconciled",
    billId: "ELEC-2023-012",
    billAmount: 98.75,
    reference: "TXN-345678",
    gateway: "stripe",
  },
  {
    id: "PAY-2024-004",
    customerId: "CUST-002",
    customerName: "Jane Smith",
    amount: 65.3,
    date: "2023-12-15",
    method: "e_wallet",
    status: "reconciled",
    billId: "WATER-2023-012",
    billAmount: 65.3,
    reference: "EW-901234",
    gateway: "paypal",
  },
  {
    id: "PAY-2024-005",
    customerId: "CUST-003",
    customerName: "Bob Johnson",
    amount: 110.25,
    date: "2024-01-10",
    method: "credit_card",
    status: "unreconciled",
    billId: null,
    billAmount: null,
    reference: "TXN-567890",
    gateway: "stripe",
  },
  {
    id: "PAY-2024-006",
    customerId: null,
    customerName: null,
    amount: 72.5,
    date: "2024-01-12",
    method: "bank_transfer",
    status: "unreconciled",
    billId: null,
    billAmount: null,
    reference: "BT-123789",
    gateway: "bank",
  },
  {
    id: "PAY-2024-007",
    customerId: "CUST-004",
    customerName: "Alice Brown",
    amount: 95.0,
    date: "2024-01-08",
    method: "credit_card",
    status: "discrepancy",
    billId: "ELEC-2024-002",
    billAmount: 105.75,
    reference: "TXN-678901",
    gateway: "stripe",
  },
]

// Mock bills for reconciliation
const mockUnpaidBills = [
  {
    id: "ELEC-2023-011",
    customerId: "CUST-003",
    customerName: "Bob Johnson",
    type: "electricity",
    amount: 110.25,
    dueDate: "2023-11-15",
    issueDate: "2023-11-01",
    status: "overdue",
    period: "October 2023",
  },
  {
    id: "WATER-2023-011",
    customerId: "CUST-003",
    customerName: "Bob Johnson",
    type: "water",
    amount: 72.5,
    dueDate: "2023-11-20",
    issueDate: "2023-11-01",
    status: "overdue",
    period: "October 2023",
  },
  {
    id: "ELEC-2024-002",
    customerId: "CUST-004",
    customerName: "Alice Brown",
    type: "electricity",
    amount: 105.75,
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    status: "pending",
    period: "December 2023",
  },
]

// Mock import data
const mockImportSources = [
  { id: "stripe", name: "Stripe", lastImport: "2024-01-12", count: 156 },
  { id: "paypal", name: "PayPal", lastImport: "2024-01-10", count: 43 },
  { id: "bank", name: "Bank Transfer", lastImport: "2024-01-08", count: 27 },
]

export default function PaymentReconciliationPage() {
  const [payments, setPayments] = useState(mockPayments)
  const [unpaidBills, setUnpaidBills] = useState(mockUnpaidBills)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [isReconcileDialogOpen, setIsReconcileDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [selectedBillForReconciliation, setSelectedBillForReconciliation] = useState(null)
  const [reconciliationNote, setReconciliationNote] = useState("")
  const [importSource, setImportSource] = useState("")
  const [importFile, setImportFile] = useState(null)
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [reportType, setReportType] = useState("reconciliation_summary")
  const [reportDateRange, setReportDateRange] = useState("this_month")

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false)
  const [selectedPaymentForView, setSelectedPaymentForView] = useState(null)
  const [selectedPaymentForResolve, setSelectedPaymentForResolve] = useState(null)
  const [resolutionType, setResolutionType] = useState("")
  const [adjustmentAmount, setAdjustmentAmount] = useState("")
  const [resolutionNotes, setResolutionNotes] = useState("")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.customerId && payment.customerId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.customerName && payment.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.billId && payment.billId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter

    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = payment.date === formatDate(new Date())
    } else if (dateFilter === "this_week") {
      const paymentDate = new Date(payment.date)
      const today = new Date()
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
      matchesDate = paymentDate >= weekStart
    } else if (dateFilter === "this_month") {
      const paymentDate = new Date(payment.date)
      matchesDate =
        paymentDate.getMonth() === new Date().getMonth() && paymentDate.getFullYear() === new Date().getFullYear()
    }

    return matchesSearch && matchesStatus && matchesMethod && matchesDate
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "reconciled":
        return <Badge variant="default">Reconciled</Badge>
      case "unreconciled":
        return <Badge variant="secondary">Unreconciled</Badge>
      case "discrepancy":
        return <Badge variant="destructive">Discrepancy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4 text-blue-500" />
      case "bank_transfer":
        return <FileText className="h-4 w-4 text-green-500" />
      case "e_wallet":
        return <DollarSign className="h-4 w-4 text-purple-500" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />
    }
  }

  const handleReconcilePayment = () => {
    if (!selectedPayment || !selectedBillForReconciliation) return

    const selectedBill = unpaidBills.find((bill) => bill.id === selectedBillForReconciliation)
    if (!selectedBill) return

    // Update payment with bill information
    const updatedPayments = payments.map((payment) => {
      if (payment.id === selectedPayment.id) {
        return {
          ...payment,
          status: payment.amount === selectedBill.amount ? "reconciled" : "discrepancy",
          billId: selectedBill.id,
          billAmount: selectedBill.amount,
          customerId: selectedBill.customerId,
          customerName: selectedBill.customerName,
          notes: reconciliationNote || undefined,
        }
      }
      return payment
    })

    // Remove the bill from unpaid bills
    const updatedUnpaidBills = unpaidBills.filter((bill) => bill.id !== selectedBillForReconciliation)

    setPayments(updatedPayments)
    setUnpaidBills(updatedUnpaidBills)
    setIsReconcileDialogOpen(false)
    setSelectedBillForReconciliation(null)
    setReconciliationNote("")
  }

  const handleImportPayments = () => {
    if (!importSource || !importFile) return

    setIsImporting(true)
    let progress = 0

    // Simulate import progress
    const interval = setInterval(() => {
      progress += 10
      setImportProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsImporting(false)
        setImportProgress(0)
        setIsImportDialogOpen(false)
        setImportFile(null)
        setImportSource("")

        // Add some mock imported payments
        const newPayments = [
          {
            id: `PAY-2024-${payments.length + 1}`.padStart(12, "0"),
            customerId: null,
            customerName: null,
            amount: 120.75,
            date: formatDate(new Date()),
            method:
              importSource === "stripe" ? "credit_card" : importSource === "paypal" ? "e_wallet" : "bank_transfer",
            status: "unreconciled",
            billId: null,
            billAmount: null,
            reference: `${importSource.toUpperCase()}-${Math.floor(Math.random() * 1000000)}`,
            gateway: importSource,
          },
          {
            id: `PAY-2024-${payments.length + 2}`.padStart(12, "0"),
            customerId: null,
            customerName: null,
            amount: 85.5,
            date: formatDate(new Date()),
            method:
              importSource === "stripe" ? "credit_card" : importSource === "paypal" ? "e_wallet" : "bank_transfer",
            status: "unreconciled",
            billId: null,
            billAmount: null,
            reference: `${importSource.toUpperCase()}-${Math.floor(Math.random() * 1000000)}`,
            gateway: importSource,
          },
        ]

        setPayments([...newPayments, ...payments])
      }
    }, 300)
  }

  const handleAutoReconcile = () => {
    // Simulate automatic reconciliation
    const updatedPayments = [...payments]
    const updatedUnpaidBills = [...unpaidBills]

    // Find unreconciled payments
    const unreconciledPayments = updatedPayments.filter((payment) => payment.status === "unreconciled")

    // Try to match each unreconciled payment with an unpaid bill
    unreconciledPayments.forEach((payment) => {
      // Find a bill with matching amount and customer ID if available
      const matchingBillIndex = updatedUnpaidBills.findIndex(
        (bill) =>
          bill.amount === payment.amount &&
          (!payment.customerId || bill.customerId === payment.customerId || !bill.customerId),
      )

      if (matchingBillIndex !== -1) {
        const matchingBill = updatedUnpaidBills[matchingBillIndex]

        // Update the payment with bill information
        const paymentIndex = updatedPayments.findIndex((p) => p.id === payment.id)
        if (paymentIndex !== -1) {
          updatedPayments[paymentIndex] = {
            ...payment,
            status: "reconciled",
            billId: matchingBill.id,
            billAmount: matchingBill.amount,
            customerId: matchingBill.customerId,
            customerName: matchingBill.customerName,
          }
        }

        // Remove the bill from unpaid bills
        updatedUnpaidBills.splice(matchingBillIndex, 1)
      }
    })

    setPayments(updatedPayments)
    setUnpaidBills(updatedUnpaidBills)
  }

  const handleGenerateReport = () => {
    // Simulate report generation
    setIsReportDialogOpen(false)
    // In a real application, this would generate and download a report
  }

  const handleResolveDiscrepancy = () => {
    if (!selectedPaymentForResolve) return

    const updatedPayments = payments.map((payment) => {
      if (payment.id === selectedPaymentForResolve.id) {
        const newStatus = "reconciled"
        let newAmount = payment.amount

        if (resolutionType === "adjust_payment") {
          newAmount = Number.parseFloat(adjustmentAmount) || payment.amount
        }

        return {
          ...payment,
          status: newStatus,
          amount: newAmount,
          resolutionNotes: resolutionNotes,
          resolvedAt: formatDate(new Date()),
          resolvedBy: "Admin User",
        }
      }
      return payment
    })

    setPayments(updatedPayments)
    setIsResolveDialogOpen(false)
    setSelectedPaymentForResolve(null)
    setResolutionType("")
    setAdjustmentAmount("")
    setResolutionNotes("")
  }

  const reconciliationStats = {
    total: payments.length,
    reconciled: payments.filter((p) => p.status === "reconciled").length,
    unreconciled: payments.filter((p) => p.status === "unreconciled").length,
    discrepancies: payments.filter((p) => p.status === "discrepancy").length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    reconciledAmount: payments.filter((p) => p.status === "reconciled").reduce((sum, p) => sum + p.amount, 0),
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Reconciliation</h1>
            <p className="text-gray-600">Match payments with bills and resolve discrepancies</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsReportDialogOpen(true)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Import Payments
            </Button>
            <Button onClick={handleAutoReconcile}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Auto-Reconcile
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reconciliationStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reconciled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{reconciliationStats.reconciled}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unreconciled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{reconciliationStats.unreconciled}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Discrepancies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{reconciliationStats.discrepancies}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${reconciliationStats.totalAmount.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reconciled Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${reconciliationStats.reconciledAmount.toFixed(2)}</div>
              <p className="text-xs text-gray-500">
                {((reconciliationStats.reconciledAmount / reconciliationStats.totalAmount) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reconciliation Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Reconciliation Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  {reconciliationStats.reconciled} of {reconciliationStats.total} payments reconciled
                </span>
                <span>{((reconciliationStats.reconciled / reconciliationStats.total) * 100).toFixed(1)}% complete</span>
              </div>
              <Progress value={(reconciliationStats.reconciled / reconciliationStats.total) * 100} />
            </div>

            {reconciliationStats.unreconciled > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {reconciliationStats.unreconciled} payment{reconciliationStats.unreconciled !== 1 ? "s" : ""} need
                  reconciliation.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Search & Filter Payments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="reconciled">Reconciled</SelectItem>
                  <SelectItem value="unreconciled">Unreconciled</SelectItem>
                  <SelectItem value="discrepancy">Discrepancy</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="e_wallet">E-Wallet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription>
              {filteredPayments.length} payment{filteredPayments.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="unreconciled">Unreconciled</TabsTrigger>
                <TabsTrigger value="reconciled">Reconciled</TabsTrigger>
                <TabsTrigger value="discrepancy">Discrepancies</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Bill</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            {payment.customerName ? (
                              <div>
                                <p>{payment.customerName}</p>
                                <p className="text-xs text-gray-500">{payment.customerId}</p>
                              </div>
                            ) : (
                              <span className="text-gray-500">Unknown</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getPaymentMethodIcon(payment.method)}
                              <span className="capitalize">{payment.method.replace("_", " ")}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{payment.reference}</span>
                          </TableCell>
                          <TableCell>
                            {payment.billId ? (
                              <div className="flex items-center space-x-2">
                                <LinkIcon className="h-3 w-3 text-green-500" />
                                <span>{payment.billId}</span>
                              </div>
                            ) : (
                              <span className="text-gray-500">Not linked</span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {payment.status === "unreconciled" && (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPayment(payment)
                                    setIsReconcileDialogOpen(true)
                                  }}
                                >
                                  <LinkIcon className="h-4 w-4 mr-1" />
                                  Reconcile
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedPaymentForView(payment)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              {payment.status === "discrepancy" && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPaymentForResolve(payment)
                                    setIsResolveDialogOpen(true)
                                  }}
                                >
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="unreconciled" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments
                        .filter((payment) => payment.status === "unreconciled")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getPaymentMethodIcon(payment.method)}
                                <span className="capitalize">{payment.method.replace("_", " ")}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                                {payment.reference}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedPayment(payment)
                                  setIsReconcileDialogOpen(true)
                                }}
                              >
                                Reconcile
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="reconciled" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Bill</TableHead>
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments
                        .filter((payment) => payment.status === "reconciled")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>
                              {payment.customerName ? (
                                <div>
                                  <p>{payment.customerName}</p>
                                  <p className="text-xs text-gray-500">{payment.customerId}</p>
                                </div>
                              ) : (
                                <span className="text-gray-500">Unknown</span>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <LinkIcon className="h-3 w-3 text-green-500" />
                                <span>{payment.billId}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                                {payment.reference}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="discrepancy" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Payment Amount</TableHead>
                        <TableHead>Bill Amount</TableHead>
                        <TableHead>Difference</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments
                        .filter((payment) => payment.status === "discrepancy")
                        .map((payment) => {
                          const difference = payment.amount - (payment.billAmount || 0)
                          return (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">{payment.id}</TableCell>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>
                                {payment.customerName ? (
                                  <div>
                                    <p>{payment.customerName}</p>
                                    <p className="text-xs text-gray-500">{payment.customerId}</p>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">Unknown</span>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                              <TableCell>${payment.billAmount?.toFixed(2)}</TableCell>
                              <TableCell
                                className={`font-medium ${difference > 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {difference > 0 ? "+" : ""}${difference.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button variant="destructive" size="sm">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Resolve
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* View Payment Modal */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>Detailed information about the payment and reconciliation</DialogDescription>
            </DialogHeader>

            {selectedPaymentForView && (
              <div className="space-y-6">
                <Tabs defaultValue="payment" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="payment">Payment Info</TabsTrigger>
                    <TabsTrigger value="bill">Bill Details</TabsTrigger>
                    <TabsTrigger value="history">Transaction History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="payment" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment ID:</span>
                            <span className="font-medium">{selectedPaymentForView.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-medium text-lg">${selectedPaymentForView.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">{selectedPaymentForView.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Method:</span>
                            <div className="flex items-center space-x-2">
                              {getPaymentMethodIcon(selectedPaymentForView.method)}
                              <span className="capitalize">{selectedPaymentForView.method.replace("_", " ")}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reference:</span>
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {selectedPaymentForView.reference}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gateway:</span>
                            <span className="capitalize">{selectedPaymentForView.gateway}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            {getStatusBadge(selectedPaymentForView.status)}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {selectedPaymentForView.customerName ? (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Customer:</span>
                                <span className="font-medium">{selectedPaymentForView.customerName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Customer ID:</span>
                                <span className="font-medium">{selectedPaymentForView.customerId}</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-4">
                              <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                              <p className="text-gray-600">Customer information not available</p>
                              <p className="text-sm text-gray-500">This payment needs to be reconciled</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {selectedPaymentForView.status === "discrepancy" && (
                      <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                          <CardTitle className="text-lg text-red-800 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Discrepancy Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-red-700">Payment Amount:</span>
                              <span className="font-medium">${selectedPaymentForView.amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-red-700">Bill Amount:</span>
                              <span className="font-medium">${selectedPaymentForView.billAmount?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-red-700">Difference:</span>
                              <span
                                className={`font-medium ${
                                  (selectedPaymentForView.amount - (selectedPaymentForView.billAmount || 0)) > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {selectedPaymentForView.amount - (selectedPaymentForView.billAmount || 0) > 0
                                  ? "+"
                                  : ""}
                                ${(selectedPaymentForView.amount - (selectedPaymentForView.billAmount || 0)).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="bill" className="space-y-4">
                    {selectedPaymentForView.billId ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Associated Bill</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bill ID:</span>
                            <span className="font-medium">{selectedPaymentForView.billId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bill Amount:</span>
                            <span className="font-medium">${selectedPaymentForView.billAmount?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service Type:</span>
                            <span className="capitalize">
                              {selectedPaymentForView.billId?.includes("ELEC") ? "Electricity" : "Water"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="border-amber-200 bg-amber-50">
                        <CardContent className="text-center py-8">
                          <FileText className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-amber-800 mb-2">No Associated Bill</h3>
                          <p className="text-amber-700">This payment has not been linked to a bill yet.</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Transaction History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3 pb-3 border-b">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="font-medium">Payment Received</p>
                              <p className="text-sm text-gray-600">{selectedPaymentForView.date}</p>
                              <p className="text-sm text-gray-500">
                                Amount: ${selectedPaymentForView.amount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          {selectedPaymentForView.status === "reconciled" && (
                            <div className="flex items-start space-x-3 pb-3 border-b">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="font-medium">Payment Reconciled</p>
                                <p className="text-sm text-gray-600">Linked to bill {selectedPaymentForView.billId}</p>
                              </div>
                            </div>
                          )}
                          {selectedPaymentForView.status === "discrepancy" && (
                            <div className="flex items-start space-x-3 pb-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="font-medium">Discrepancy Identified</p>
                                <p className="text-sm text-gray-600">Amount mismatch detected</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Resolve Discrepancy Modal */}
        <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Resolve Payment Discrepancy</DialogTitle>
              <DialogDescription>Address and resolve the identified discrepancy</DialogDescription>
            </DialogHeader>

            {selectedPaymentForResolve && (
              <div className="space-y-6">
                {/* Discrepancy Summary */}
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Discrepancy Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-red-700">Payment Amount</p>
                        <p className="text-xl font-bold">${selectedPaymentForResolve.amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-red-700">Bill Amount</p>
                        <p className="text-xl font-bold">${selectedPaymentForResolve.billAmount?.toFixed(2)}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-red-700">Difference</p>
                        <p
                          className={`text-xl font-bold ${
                            (selectedPaymentForResolve.amount - (selectedPaymentForResolve.billAmount || 0)) > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedPaymentForResolve.amount - (selectedPaymentForResolve.billAmount || 0) > 0
                            ? "+"
                            : ""}
                          ${(selectedPaymentForResolve.amount - (selectedPaymentForResolve.billAmount || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resolution Options */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Resolution Method</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="accept_payment"
                        name="resolution"
                        value="accept_payment"
                        checked={resolutionType === "accept_payment"}
                        onChange={(e) => setResolutionType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="accept_payment" className="cursor-pointer">
                        Accept payment amount and adjust bill
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="adjust_payment"
                        name="resolution"
                        value="adjust_payment"
                        checked={resolutionType === "adjust_payment"}
                        onChange={(e) => setResolutionType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="adjust_payment" className="cursor-pointer">
                        Adjust payment amount to match bill
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="partial_payment"
                        name="resolution"
                        value="partial_payment"
                        checked={resolutionType === "partial_payment"}
                        onChange={(e) => setResolutionType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="partial_payment" className="cursor-pointer">
                        Mark as partial payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="refund_difference"
                        name="resolution"
                        value="refund_difference"
                        checked={resolutionType === "refund_difference"}
                        onChange={(e) => setResolutionType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="refund_difference" className="cursor-pointer">
                        Process refund for overpayment
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Adjustment Amount */}
                {resolutionType === "adjust_payment" && (
                  <div className="space-y-2">
                    <Label htmlFor="adjustmentAmount">Adjusted Payment Amount</Label>
                    <Input
                      id="adjustmentAmount"
                      type="number"
                      step="0.01"
                      placeholder="Enter adjusted amount"
                      value={adjustmentAmount}
                      onChange={(e) => setAdjustmentAmount(e.target.value)}
                    />
                  </div>
                )}

                {/* Resolution Notes */}
                <div className="space-y-2">
                  <Label htmlFor="resolutionNotes">Resolution Notes</Label>
                  <Textarea
                    id="resolutionNotes"
                    placeholder="Provide details about the resolution..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsResolveDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleResolveDiscrepancy} disabled={!resolutionType || !resolutionNotes.trim()}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve Discrepancy
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reconcile Dialog */}
        <Dialog open={isReconcileDialogOpen} onOpenChange={setIsReconcileDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reconcile Payment</DialogTitle>
              <DialogDescription>Match this payment with a bill</DialogDescription>
            </DialogHeader>

            {selectedPayment && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Payment Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Payment ID:</p>
                      <p className="font-medium">{selectedPayment.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date:</p>
                      <p>{selectedPayment.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount:</p>
                      <p className="font-medium">${selectedPayment.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Method:</p>
                      <p className="capitalize">{selectedPayment.method.replace("_", " ")}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reference:</p>
                      <p className="font-mono">{selectedPayment.reference}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Gateway:</p>
                      <p className="capitalize">{selectedPayment.gateway}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Select Bill to Reconcile With</Label>
                  <Select value={selectedBillForReconciliation || ""} onValueChange={setSelectedBillForReconciliation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bill" />
                    </SelectTrigger>
                    <SelectContent>
                      {unpaidBills.map((bill) => (
                        <SelectItem key={bill.id} value={bill.id}>
                          {bill.id} - ${bill.amount.toFixed(2)} - {bill.customerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedBillForReconciliation && (
                  <div>
                    {(() => {
                      const selectedBill = unpaidBills.find((bill) => bill.id === selectedBillForReconciliation)
                      if (!selectedBill) return null

                      const amountDifference = selectedPayment.amount - selectedBill.amount
                      const hasDiscrepancy = Math.abs(amountDifference) > 0.01

                      return (
                        <div
                          className={`p-4 rounded-md ${
                            hasDiscrepancy
                              ? "bg-amber-50 border border-amber-200"
                              : "bg-green-50 border border-green-200"
                          }`}
                        >
                          <div className="flex items-start">
                            {hasDiscrepancy ? (
                              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <p
                                className={hasDiscrepancy ? "text-amber-800 font-medium" : "text-green-800 font-medium"}
                              >
                                {hasDiscrepancy
                                  ? "Amount discrepancy detected"
                                  : "Payment and bill amounts match perfectly"}
                              </p>
                              {hasDiscrepancy && (
                                <p className="text-amber-700 text-sm mt-1">
                                  Payment amount (${selectedPayment.amount.toFixed(2)}) is{" "}
                                  {amountDifference > 0 ? "greater" : "less"} than bill amount ($
                                  {selectedBill.amount.toFixed(2)}) by ${Math.abs(amountDifference).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reconciliationNote">Notes (Optional)</Label>
                  <Textarea
                    id="reconciliationNote"
                    placeholder="Add any notes about this reconciliation"
                    value={reconciliationNote}
                    onChange={(e) => setReconciliationNote(e.target.value)}
                  />
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReconcileDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReconcilePayment} disabled={!selectedBillForReconciliation}>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Reconcile Payment
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Import Dialog */}
        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Payments</DialogTitle>
              <DialogDescription>Import payment data from external sources</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Source</Label>
                <Select value={importSource} onValueChange={setImportSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment source" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockImportSources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {importSource && (
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <FileSpreadsheet className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload CSV or Excel file with payment data
                      <br />
                      <span className="text-xs">Supported formats: .csv, .xlsx</span>
                    </p>
                    <Input
                      type="file"
                      className="mx-auto max-w-xs"
                      accept=".csv,.xlsx"
                      onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              )}

              {isImporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Importing payments...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} />
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)} disabled={isImporting}>
                  Cancel
                </Button>
                <Button onClick={handleImportPayments} disabled={!importSource || !importFile || isImporting}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Report Dialog */}
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Report</DialogTitle>
              <DialogDescription>Create reconciliation and payment reports</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reconciliation_summary">Reconciliation Summary</SelectItem>
                    <SelectItem value="unreconciled_payments">Unreconciled Payments</SelectItem>
                    <SelectItem value="payment_discrepancies">Payment Discrepancies</SelectItem>
                    <SelectItem value="payment_methods">Payment Methods Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={reportDateRange} onValueChange={setReportDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="last_month">Last Month</SelectItem>
                    <SelectItem value="last_quarter">Last Quarter</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {reportDateRange === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Format</Label>
                <Select defaultValue="excel">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>Reconciliation Help</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2 flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-blue-500" />
                  Auto-Reconciliation
                </h3>
                <p className="text-sm text-gray-600">
                  Use the Auto-Reconcile feature to automatically match payments with bills based on amount and customer
                  information.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2 flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2 text-green-500" />
                  Manual Reconciliation
                </h3>
                <p className="text-sm text-gray-600">
                  For payments that can&apos;t be automatically matched, use the Reconcile button to manually link them to
                  bills.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Resolving Discrepancies
                </h3>
                <p className="text-sm text-gray-600">
                  When payment and bill amounts don&apos;t match, investigate and resolve the discrepancy using the Resolve
                  button.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
