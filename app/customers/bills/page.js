"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Zap,
  Droplets,
  Search,
  Filter,
  Download,
  Eye,
  CreditCard,
  Calendar,
  Home,
  Receipt,
  AlertCircle,
  FileText,
  Clock,
} from "lucide-react"
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
    issueDate: "2024-01-01",
    serviceAddress: "123 Main St, Anytown, USA",
    accountNumber: "ELEC-12345",
    previousReading: 12450,
    currentReading: 12900,
    readingDate: "2023-12-28",
    charges: [
      { description: "Basic Charge", amount: 15.0 },
      { description: "Energy Charge (450 kWh @ $0.22/kWh)", amount: 99.0 },
      { description: "Environmental Surcharge", amount: 5.5 },
      { description: "City Tax", amount: 6.0 },
    ],
    message:
      "Thank you for using our online billing system. Please note that rates have been updated as of January 1, 2024.",
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
    issueDate: "2024-01-01",
    serviceAddress: "123 Main St, Anytown, USA",
    accountNumber: "WATER-12345",
    previousReading: 45600,
    currentReading: 48100,
    readingDate: "2023-12-28",
    charges: [
      { description: "Basic Charge", amount: 12.0 },
      { description: "Water Usage (2500 gallons @ $0.025/gallon)", amount: 62.5 },
      { description: "Water Quality Fee", amount: 3.75 },
    ],
    message: "Water conservation is important. Please check our website for tips on reducing water usage.",
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
    issueDate: "2023-12-01",
    paidDate: "2023-12-10",
    paymentMethod: "Credit Card (ending in 4567)",
    transactionId: "TXN-98765",
    serviceAddress: "123 Main St, Anytown, USA",
    accountNumber: "ELEC-12345",
    previousReading: 12070,
    currentReading: 12450,
    readingDate: "2023-11-28",
    charges: [
      { description: "Basic Charge", amount: 15.0 },
      { description: "Energy Charge (380 kWh @ $0.20/kWh)", amount: 76.0 },
      { description: "Environmental Surcharge", amount: 3.75 },
      { description: "City Tax", amount: 4.0 },
    ],
  },
  {
    id: "WATER-2023-012",
    type: "water",
    amount: 65.3,
    dueDate: "2023-12-20",
    status: "paid",
    period: "November 2023",
    usage: 2100,
    unit: "gallons",
    issueDate: "2023-12-01",
    paidDate: "2023-12-15",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-87654",
    serviceAddress: "123 Main St, Anytown, USA",
    accountNumber: "WATER-12345",
    previousReading: 43500,
    currentReading: 45600,
    readingDate: "2023-11-28",
    charges: [
      { description: "Basic Charge", amount: 12.0 },
      { description: "Water Usage (2100 gallons @ $0.025/gallon)", amount: 52.5 },
      { description: "Water Quality Fee", amount: 0.8 },
    ],
  },
  {
    id: "ELEC-2023-011",
    type: "electricity",
    amount: 110.25,
    dueDate: "2023-11-15",
    status: "overdue",
    period: "October 2023",
    usage: 410,
    unit: "kWh",
    issueDate: "2023-11-01",
    serviceAddress: "123 Main St, Anytown, USA",
    accountNumber: "ELEC-12345",
    previousReading: 11660,
    currentReading: 12070,
    readingDate: "2023-10-28",
    charges: [
      { description: "Basic Charge", amount: 15.0 },
      { description: "Energy Charge (410 kWh @ $0.20/kWh)", amount: 82.0 },
      { description: "Environmental Surcharge", amount: 4.25 },
      { description: "City Tax", amount: 5.0 },
      { description: "Late Fee", amount: 4.0 },
    ],
    message: "This bill is overdue. Please make a payment as soon as possible to avoid service interruption.",
  },
]

export default function BillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedBill, setSelectedBill] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredBills = mockBills.filter((bill) => {
    const matchesSearch =
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.period.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter
    const matchesType = typeFilter === "all" || bill.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge variant="default">Paid</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
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
    setIsModalOpen(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bills</h1>
            <p className="text-gray-600">Manage and view all your utility bills</p>
          </div>
          <Button asChild>
            <Link href="/bills/pay">
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Bills
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bills..."
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
            </div>
          </CardContent>
        </Card>

        {/* Bills Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Bills</CardTitle>
            <CardDescription>
              {filteredBills.length} bill{filteredBills.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill ID</TableHead>
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
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {bill.status === "pending" && (
                            <Button size="sm" asChild>
                              <Link href={`/bills/pay?billId=${bill.id}`}>Pay</Link>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bill Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedBill && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedBill.type === "electricity" ? (
                    <Zap className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Droplets className="h-5 w-5 text-blue-500" />
                  )}
                  <span>
                    {selectedBill.type === "electricity" ? "Electricity" : "Water"} Bill - {selectedBill.id}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Billing Period: {selectedBill.period} | Issue Date: {selectedBill.issueDate}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="details">Bill Details</TabsTrigger>
                  <TabsTrigger value="usage">Usage Information</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Receipt className="h-4 w-4" />
                          Bill Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Bill ID:</dt>
                            <dd className="text-sm text-gray-900">{selectedBill.id}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Account Number:</dt>
                            <dd className="text-sm text-gray-900">{selectedBill.accountNumber}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Billing Period:</dt>
                            <dd className="text-sm text-gray-900">{selectedBill.period}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Issue Date:</dt>
                            <dd className="text-sm text-gray-900">{selectedBill.issueDate}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Due Date:</dt>
                            <dd className="text-sm text-gray-900">{selectedBill.dueDate}</dd>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <dt className="text-sm">Total Amount:</dt>
                            <dd className="text-sm">{formatCurrency(selectedBill.amount)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Status:</dt>
                            <dd className="text-sm">{getStatusBadge(selectedBill.status)}</dd>
                          </div>
                          {selectedBill.paidDate && (
                            <div className="flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Payment Date:</dt>
                              <dd className="text-sm text-gray-900">{selectedBill.paidDate}</dd>
                            </div>
                          )}
                          {selectedBill.paymentMethod && (
                            <div className="flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Payment Method:</dt>
                              <dd className="text-sm text-gray-900">{selectedBill.paymentMethod}</dd>
                            </div>
                          )}
                        </dl>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          Service Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Service Type:</dt>
                            <dd className="text-sm text-gray-900 capitalize">{selectedBill.type}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Service Address:</dt>
                            <dd className="text-sm text-gray-900">{selectedBill.serviceAddress}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Total Usage:</dt>
                            <dd className="text-sm text-gray-900">
                              {selectedBill.usage.toLocaleString()} {selectedBill.unit}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Reading Date:</dt>
                            <dd className="text-sm text-gray-900">{selectedBill.readingDate}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedBill.message && (
                    <Card className="border-amber-200 bg-amber-50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-amber-800">{selectedBill.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-end gap-2">
                    {selectedBill.status === "pending" && (
                      <Button asChild>
                        <Link href={`/bills/pay?billId=${selectedBill.id}`}>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Now
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Charges Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedBill.charges.map((charge, index) => (
                            <TableRow key={index}>
                              <TableCell>{charge.description}</TableCell>
                              <TableCell className="text-right">{formatCurrency(charge.amount)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-bold">Total</TableCell>
                            <TableCell className="text-right font-bold">
                              {formatCurrency(selectedBill.amount)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Due Date:</dt>
                          <dd className="text-sm text-gray-900">{selectedBill.dueDate}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Status:</dt>
                          <dd className="text-sm">{getStatusBadge(selectedBill.status)}</dd>
                        </div>
                        {selectedBill.paidDate && (
                          <>
                            <div className="flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Payment Date:</dt>
                              <dd className="text-sm text-gray-900">{selectedBill.paidDate}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Payment Method:</dt>
                              <dd className="text-sm text-gray-900">{selectedBill.paymentMethod}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Transaction ID:</dt>
                              <dd className="text-sm text-gray-900">{selectedBill.transactionId}</dd>
                            </div>
                          </>
                        )}
                        {selectedBill.status === "pending" && (
                          <div className="pt-2">
                            <Button asChild className="w-full">
                              <Link href={`/bills/pay?billId=${selectedBill.id}`}>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Pay This Bill
                              </Link>
                            </Button>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Meter Reading Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Previous Reading:</dt>
                          <dd className="text-sm text-gray-900">{selectedBill.previousReading.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Current Reading:</dt>
                          <dd className="text-sm text-gray-900">{selectedBill.currentReading.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Usage:</dt>
                          <dd className="text-sm text-gray-900">
                            {selectedBill.usage.toLocaleString()} {selectedBill.unit}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Reading Date:</dt>
                          <dd className="text-sm text-gray-900">{selectedBill.readingDate}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Usage Visualization</CardTitle>
                      <CardDescription>
                        This chart shows your {selectedBill.type} usage for the current billing period.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                        <p className="text-gray-500">Usage chart visualization would appear here</p>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>
                          Your {selectedBill.type} usage for {selectedBill.period} was{" "}
                          <span className="font-medium">
                            {selectedBill.usage.toLocaleString()} {selectedBill.unit}
                          </span>
                          .
                          {selectedBill.type === "electricity" ? (
                            <span> This is approximately enough energy to power a typical home for 15 days.</span>
                          ) : (
                            <span> This is approximately equivalent to 62 full bathtubs of water.</span>
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
