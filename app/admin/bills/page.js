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
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  FileText,
  Download,
  Printer,
  Send,
  AlertTriangle,
  Zap,
  Droplets,
  Filter,
  X,
  CheckCircle,
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

// Mock bill data
const mockBills = [
  {
    id: "ELEC-2024-001",
    customerId: "CUST-001",
    customerName: "John Doe",
    type: "electricity",
    amount: 125.5,
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    status: "pending",
    period: "December 2023",
    usage: 450,
    unit: "kWh",
    meterReading: {
      previous: 12450,
      current: 12900,
    },
    breakdown: {
      consumption: 112.5,
      fixedCharges: 10.0,
      taxes: 3.0,
    },
  },
  {
    id: "WATER-2024-001",
    customerId: "CUST-001",
    customerName: "John Doe",
    type: "water",
    amount: 78.25,
    dueDate: "2024-01-20",
    issueDate: "2024-01-01",
    status: "pending",
    period: "December 2023",
    usage: 2500,
    unit: "gallons",
    meterReading: {
      previous: 45600,
      current: 48100,
    },
    breakdown: {
      consumption: 68.75,
      fixedCharges: 7.5,
      taxes: 2.0,
    },
  },
  {
    id: "ELEC-2023-012",
    customerId: "CUST-002",
    customerName: "Jane Smith",
    type: "electricity",
    amount: 98.75,
    dueDate: "2023-12-15",
    issueDate: "2023-12-01",
    status: "paid",
    paidDate: "2023-12-10",
    period: "November 2023",
    usage: 380,
    unit: "kWh",
    meterReading: {
      previous: 12070,
      current: 12450,
    },
    breakdown: {
      consumption: 88.75,
      fixedCharges: 10.0,
      taxes: 0.0,
    },
  },
  {
    id: "WATER-2023-012",
    customerId: "CUST-002",
    customerName: "Jane Smith",
    type: "water",
    amount: 65.3,
    dueDate: "2023-12-20",
    issueDate: "2023-12-01",
    status: "paid",
    paidDate: "2023-12-15",
    period: "November 2023",
    usage: 2100,
    unit: "gallons",
    meterReading: {
      previous: 43500,
      current: 45600,
    },
    breakdown: {
      consumption: 55.8,
      fixedCharges: 7.5,
      taxes: 2.0,
    },
  },
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
    usage: 410,
    unit: "kWh",
    meterReading: {
      previous: 11660,
      current: 12070,
    },
    breakdown: {
      consumption: 97.25,
      fixedCharges: 10.0,
      taxes: 3.0,
    },
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
    usage: 2300,
    unit: "gallons",
    meterReading: {
      previous: 41200,
      current: 43500,
    },
    breakdown: {
      consumption: 63.0,
      fixedCharges: 7.5,
      taxes: 2.0,
    },
  },
]

// Mock customers for dropdown
const mockCustomers = [
  { id: "CUST-001", name: "John Doe" },
  { id: "CUST-002", name: "Jane Smith" },
  { id: "CUST-003", name: "Bob Johnson" },
  { id: "CUST-004", name: "Alice Brown" },
  { id: "CUST-005", name: "Charlie Wilson" },
]

export default function BillManagementPage() {
  const [bills, setBills] = useState(mockBills)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedBill, setSelectedBill] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewBillDialogOpen, setIsNewBillDialogOpen] = useState(false)
  const [isVoidDialogOpen, setIsVoidDialogOpen] = useState(false)
  const [editedBill, setEditedBill] = useState(null)
  const [newBill, setNewBill] = useState({
    customerId: "",
    type: "electricity",
    period: "",
    issueDate: formatDate(new Date()),
    dueDate: formatDate(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)),
    previousReading: "",
    currentReading: "",
    fixedCharges: "",
    taxes: "",
  })

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.period.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || bill.status === statusFilter
    const matchesType = typeFilter === "all" || bill.type === typeFilter

    let matchesDate = true
    if (dateFilter === "current-month") {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const billDate = new Date(bill.issueDate)
      matchesDate = billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear
    } else if (dateFilter === "last-month") {
      const lastMonth = new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1
      const lastMonthYear = new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear()
      const billDate = new Date(bill.issueDate)
      matchesDate = billDate.getMonth() === lastMonth && billDate.getFullYear() === lastMonthYear
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge variant="default">Paid</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "voided":
        return <Badge variant="outline">Voided</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type) => {
    return type === "electricity" ? (
      <Zap className="h-4 w-4 text-yellow-500" />
    ) : (
      <Droplets className="h-4 w-4 text-blue-500" />
    )
  }

  const handleViewBill = (bill) => {
    setSelectedBill(bill)
    setIsViewDialogOpen(true)
  }

  const handleEditBill = (bill) => {
    setEditedBill({
      ...bill,
      previousReading: bill.meterReading.previous,
      currentReading: bill.meterReading.current,
      fixedCharges: bill.breakdown.fixedCharges,
      taxes: bill.breakdown.taxes,
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    // Calculate new values based on readings
    const usage =
      editedBill.type === "electricity"
        ? editedBill.currentReading - editedBill.previousReading
        : editedBill.currentReading - editedBill.previousReading

    const consumptionRate = editedBill.type === "electricity" ? 0.25 : 0.025 // Example rates
    const consumptionCharge = usage * consumptionRate
    const totalAmount =
      consumptionCharge + Number.parseFloat(editedBill.fixedCharges) + Number.parseFloat(editedBill.taxes)

    const updatedBill = {
      ...editedBill,
      usage,
      amount: totalAmount,
      meterReading: {
        previous: Number.parseInt(editedBill.previousReading),
        current: Number.parseInt(editedBill.currentReading),
      },
      breakdown: {
        consumption: consumptionCharge,
        fixedCharges: Number.parseFloat(editedBill.fixedCharges),
        taxes: Number.parseFloat(editedBill.taxes),
      },
    }

    // Update bills array
    const updatedBills = bills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill))

    setBills(updatedBills)
    setIsEditDialogOpen(false)
  }

  const handleCreateBill = () => {
    // Find customer name
    const customer = mockCustomers.find((c) => c.id === newBill.customerId)
    if (!customer) return

    // Calculate usage and charges
    const usage = Number.parseInt(newBill.currentReading) - Number.parseInt(newBill.previousReading)
    const consumptionRate = newBill.type === "electricity" ? 0.25 : 0.025 // Example rates
    const consumptionCharge = usage * consumptionRate
    const fixedCharges = Number.parseFloat(newBill.fixedCharges)
    const taxes = Number.parseFloat(newBill.taxes)
    const totalAmount = consumptionCharge + fixedCharges + taxes

    // Generate bill ID
    const billType = newBill.type.toUpperCase()
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const billCount = bills.filter((b) => b.type === newBill.type && b.issueDate.startsWith(`${year}`)).length + 1

    const billId = `${billType}-${year}-${month}${String(billCount).padStart(3, "0")}`

    // Create new bill object
    const bill = {
      id: billId,
      customerId: newBill.customerId,
      customerName: customer.name,
      type: newBill.type,
      amount: totalAmount,
      dueDate: newBill.dueDate,
      issueDate: newBill.issueDate,
      status: "pending",
      period: newBill.period,
      usage,
      unit: newBill.type === "electricity" ? "kWh" : "gallons",
      meterReading: {
        previous: Number.parseInt(newBill.previousReading),
        current: Number.parseInt(newBill.currentReading),
      },
      breakdown: {
        consumption: consumptionCharge,
        fixedCharges,
        taxes,
      },
    }

    // Add to bills array
    setBills([bill, ...bills])

    // Reset form and close dialog
    setNewBill({
      customerId: "",
      type: "electricity",
      period: "",
      issueDate: formatDate(new Date()),
      dueDate: formatDate(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)),
      previousReading: "",
      currentReading: "",
      fixedCharges: "",
      taxes: "",
    })
    setIsNewBillDialogOpen(false)
  }

  const handleVoidBill = () => {
    if (!selectedBill) return

    // Update bill status to voided
    const updatedBills = bills.map((bill) => (bill.id === selectedBill.id ? { ...bill, status: "voided" } : bill))

    setBills(updatedBills)
    setIsVoidDialogOpen(false)
  }

  const handleMarkAsPaid = (billId) => {
    // Update bill status to paid
    const updatedBills = bills.map((bill) =>
      bill.id === billId
        ? {
            ...bill,
            status: "paid",
            paidDate: formatDate(new Date()),
          }
        : bill,
    )

    setBills(updatedBills)
  }

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bill Management</h1>
            <p className="text-gray-600">Create, view, and manage utility bills</p>
          </div>
          <Button onClick={() => setIsNewBillDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Generate New Bill
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bills.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bills.filter((b) => b.status === "pending").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bills.filter((b) => b.status === "overdue").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Amount Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {bills
                  .filter((b) => b.status === "pending" || b.status === "overdue")
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Search & Filter Bills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, customer..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="voided">Voided</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bills Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bills</CardTitle>
            <CardDescription>
              {filteredBills.length} bill{filteredBills.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Bills</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBills.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-medium">{bill.id}</TableCell>
                          <TableCell>
                            <div>
                              <p>{bill.customerName}</p>
                              <p className="text-xs text-gray-500">{bill.customerId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(bill.type)}
                              <span className="capitalize">{bill.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{bill.period}</TableCell>
                          <TableCell>
                            {bill.usage.toLocaleString()} {bill.unit}
                          </TableCell>
                          <TableCell className="font-medium">${bill.amount.toFixed(2)}</TableCell>
                          <TableCell>{bill.dueDate}</TableCell>
                          <TableCell>{getStatusBadge(bill.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewBill(bill)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              {(bill.status === "pending" || bill.status === "overdue") && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleEditBill(bill)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleMarkAsPaid(bill.id)}>
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {bill.status !== "voided" && bill.status !== "paid" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedBill(bill)
                                    setIsVoidDialogOpen(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
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

              <TabsContent value="pending" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBills
                        .filter((bill) => bill.status === "pending")
                        .map((bill) => (
                          <TableRow key={bill.id}>
                            <TableCell className="font-medium">{bill.id}</TableCell>
                            <TableCell>{bill.customerName}</TableCell>
                            <TableCell className="capitalize">{bill.type}</TableCell>
                            <TableCell className="font-medium">${bill.amount.toFixed(2)}</TableCell>
                            <TableCell>{bill.dueDate}</TableCell>
                            <TableCell>
                              <Button size="sm" onClick={() => handleMarkAsPaid(bill.id)}>
                                Mark as Paid
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="paid" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Paid Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBills
                        .filter((bill) => bill.status === "paid")
                        .map((bill) => (
                          <TableRow key={bill.id}>
                            <TableCell className="font-medium">{bill.id}</TableCell>
                            <TableCell>{bill.customerName}</TableCell>
                            <TableCell className="capitalize">{bill.type}</TableCell>
                            <TableCell className="font-medium">${bill.amount.toFixed(2)}</TableCell>
                            <TableCell>{bill.paidDate}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="overdue" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBills
                        .filter((bill) => bill.status === "overdue")
                        .map((bill) => {
                          const dueDate = new Date(bill.dueDate)
                          const today = new Date()
                          const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 3600 * 24))

                          return (
                            <TableRow key={bill.id}>
                              <TableCell className="font-medium">{bill.id}</TableCell>
                              <TableCell>{bill.customerName}</TableCell>
                              <TableCell className="capitalize">{bill.type}</TableCell>
                              <TableCell className="font-medium">${bill.amount.toFixed(2)}</TableCell>
                              <TableCell>{bill.dueDate}</TableCell>
                              <TableCell className="text-red-600 font-medium">{daysOverdue} days</TableCell>
                              <TableCell>
                                <Button size="sm" onClick={() => handleMarkAsPaid(bill.id)}>
                                  Mark as Paid
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

        {/* View Bill Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Bill Details</DialogTitle>
              <DialogDescription>Detailed information about bill {selectedBill?.id}</DialogDescription>
            </DialogHeader>

            {selectedBill && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {getTypeIcon(selectedBill.type)}
                      <span className="capitalize">{selectedBill.type} Bill</span>
                    </h3>
                    <p className="text-sm text-gray-500">Bill ID: {selectedBill.id}</p>
                  </div>
                  <div className="text-right">
                    <div>{getStatusBadge(selectedBill.status)}</div>
                    <p className="text-sm text-gray-500 mt-1">Issued: {selectedBill.issueDate}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Customer Information</h4>
                    <div className="space-y-1">
                      <p>
                        <span className="text-gray-500">Name:</span> {selectedBill.customerName}
                      </p>
                      <p>
                        <span className="text-gray-500">ID:</span> {selectedBill.customerId}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Bill Information</h4>
                    <div className="space-y-1">
                      <p>
                        <span className="text-gray-500">Period:</span> {selectedBill.period}
                      </p>
                      <p>
                        <span className="text-gray-500">Due Date:</span> {selectedBill.dueDate}
                      </p>
                      {selectedBill.status === "paid" && (
                        <p>
                          <span className="text-gray-500">Paid Date:</span> {selectedBill.paidDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Meter Readings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-500">Previous Reading</p>
                      <p className="text-lg font-medium">{selectedBill.meterReading.previous.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-500">Current Reading</p>
                      <p className="text-lg font-medium">{selectedBill.meterReading.current.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-gray-500">Total Consumption</p>
                    <p className="text-lg font-medium">
                      {selectedBill.usage.toLocaleString()} {selectedBill.unit}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Charges Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Consumption Charges</span>
                      <span>${selectedBill.breakdown.consumption.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fixed Charges</span>
                      <span>${selectedBill.breakdown.fixedCharges.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${selectedBill.breakdown.taxes.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>${selectedBill.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  {selectedBill.status === "pending" && (
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send to Customer
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Bill Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Bill</DialogTitle>
              <DialogDescription>Make changes to bill {editedBill?.id}</DialogDescription>
            </DialogHeader>

            {editedBill && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Bill Period</Label>
                  <Input
                    value={editedBill.period}
                    onChange={(e) => setEditedBill({ ...editedBill, period: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <Input
                      type="date"
                      value={editedBill.issueDate}
                      onChange={(e) => setEditedBill({ ...editedBill, issueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={editedBill.dueDate}
                      onChange={(e) => setEditedBill({ ...editedBill, dueDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Previous Reading</Label>
                    <Input
                      type="number"
                      value={editedBill.previousReading}
                      onChange={(e) => setEditedBill({ ...editedBill, previousReading: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Reading</Label>
                    <Input
                      type="number"
                      value={editedBill.currentReading}
                      onChange={(e) => setEditedBill({ ...editedBill, currentReading: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fixed Charges ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editedBill.fixedCharges}
                      onChange={(e) => setEditedBill({ ...editedBill, fixedCharges: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Taxes ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editedBill.taxes}
                      onChange={(e) => setEditedBill({ ...editedBill, taxes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Add any notes about this bill adjustment"
                    value={editedBill.notes || ""}
                    onChange={(e) => setEditedBill({ ...editedBill, notes: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Bill Dialog */}
        <Dialog open={isNewBillDialogOpen} onOpenChange={setIsNewBillDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate New Bill</DialogTitle>
              <DialogDescription>Create a new utility bill for a customer</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="details">Bill Details</TabsTrigger>
                <TabsTrigger value="readings">Meter Readings</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Customer</Label>
                  <Select
                    value={newBill.customerId}
                    onValueChange={(value) => setNewBill({ ...newBill, customerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} ({customer.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Utility Type</Label>
                  <Select value={newBill.type} onValueChange={(value) => setNewBill({ ...newBill, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Billing Period</Label>
                  <Input
                    placeholder="e.g., January 2024"
                    value={newBill.period}
                    onChange={(e) => setNewBill({ ...newBill, period: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <Input
                      type="date"
                      value={newBill.issueDate}
                      onChange={(e) => setNewBill({ ...newBill, issueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={newBill.dueDate}
                      onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="readings" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Previous Meter Reading</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 12450"
                      value={newBill.previousReading}
                      onChange={(e) => setNewBill({ ...newBill, previousReading: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">{newBill.type === "electricity" ? "in kWh" : "in gallons"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Current Meter Reading</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 12900"
                      value={newBill.currentReading}
                      onChange={(e) => setNewBill({ ...newBill, currentReading: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">{newBill.type === "electricity" ? "in kWh" : "in gallons"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fixed Charges ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 10.00"
                      value={newBill.fixedCharges}
                      onChange={(e) => setNewBill({ ...newBill, fixedCharges: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Taxes ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 3.00"
                      value={newBill.taxes}
                      onChange={(e) => setNewBill({ ...newBill, taxes: e.target.value })}
                    />
                  </div>
                </div>

                {newBill.previousReading && newBill.currentReading && (
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-gray-500">Estimated Consumption</p>
                    <p className="text-lg font-medium">
                      {(
                        Number.parseInt(newBill.currentReading) - Number.parseInt(newBill.previousReading)
                      ).toLocaleString()}
                      {newBill.type === "electricity" ? " kWh" : " gallons"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewBillDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateBill}
                disabled={
                  !newBill.customerId ||
                  !newBill.period ||
                  !newBill.previousReading ||
                  !newBill.currentReading ||
                  !newBill.fixedCharges ||
                  !newBill.taxes
                }
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Bill
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Void Bill Dialog */}
        <Dialog open={isVoidDialogOpen} onOpenChange={setIsVoidDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Void Bill</DialogTitle>
              <DialogDescription>
                Are you sure you want to void this bill? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            {selectedBill && (
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(selectedBill.type)}
                    <span className="font-medium">{selectedBill.id}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Customer:</span> {selectedBill.customerName}
                    </div>
                    <div>
                      <span className="text-gray-500">Amount:</span> ${selectedBill.amount.toFixed(2)}
                    </div>
                    <div>
                      <span className="text-gray-500">Period:</span> {selectedBill.period}
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span> {selectedBill.status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    Voiding this bill will mark it as invalid and remove it from the customer&apos;s outstanding balance.
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsVoidDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleVoidBill}>
                    <X className="h-4 w-4 mr-2" />
                    Void Bill
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  )
}
