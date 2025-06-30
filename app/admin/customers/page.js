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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Eye, Trash2, UserPlus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Mock customer data
const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    status: "active",
    joinDate: "2023-01-15",
    totalBills: 12,
    totalPaid: 1450.75,
    outstandingBalance: 203.75,
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, City, State 12345",
    status: "active",
    joinDate: "2023-02-20",
    totalBills: 10,
    totalPaid: 1200.5,
    outstandingBalance: 0,
  },
  {
    id: "CUST-003",
    name: "Bob Johnson",
    email: "bob.johnson@email.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Rd, City, State 12345",
    status: "suspended",
    joinDate: "2023-03-10",
    totalBills: 8,
    totalPaid: 850.25,
    outstandingBalance: 456.5,
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "",
  })

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddCustomer = () => {
    const customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, "0")}`,
      ...newCustomer,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      totalBills: 0,
      totalPaid: 0,
      outstandingBalance: 0,
    }

    setCustomers([...customers, customer])
    setNewCustomer({ name: "", email: "", phone: "", address: "" })
    setIsAddDialogOpen(false)
  }

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    setViewModalOpen(true)
  }

  const handleUpdateCustomer = (customer) => {
    setSelectedCustomer(customer)
    setUpdateFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
    })
    setUpdateModalOpen(true)
  }

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer)
    setDeleteModalOpen(true)
  }

  const handleSaveUpdate = () => {
    if (selectedCustomer) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === selectedCustomer.id ? { ...customer, ...updateFormData } : customer,
      )
      setCustomers(updatedCustomers)
      setUpdateModalOpen(false)
      setSelectedCustomer(null)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      const updatedCustomers = customers.filter((customer) => customer.id !== selectedCustomer.id)
      setCustomers(updatedCustomers)
      setDeleteModalOpen(false)
      setSelectedCustomer(null)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600">Manage customer accounts and information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>Create a new customer account in the system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                    placeholder="Enter full address"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCustomer}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter((c) => c.status === "active").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Suspended Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter((c) => c.status === "suspended").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${customers.reduce((sum, c) => sum + c.outstandingBalance, 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell className="font-medium">${customer.outstandingBalance.toFixed(2)}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewCustomer(customer)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleUpdateCustomer(customer)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteCustomer(customer)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

      {/* View Customer Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>Detailed information for {selectedCustomer?.name}</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Customer ID</Label>
                      <p className="text-sm">{selectedCustomer.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                      <p className="text-sm">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="text-sm">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone</Label>
                      <p className="text-sm">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Address</Label>
                      <p className="text-sm">{selectedCustomer.address}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Status</Label>
                      <div className="mt-1">{getStatusBadge(selectedCustomer.status)}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Join Date</Label>
                      <p className="text-sm">{selectedCustomer.joinDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Total Bills</Label>
                      <p className="text-sm">{selectedCustomer.totalBills}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Total Paid</Label>
                      <p className="text-sm font-medium text-green-600">${selectedCustomer.totalPaid.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Outstanding Balance</Label>
                      <p
                        className={`text-sm font-medium ${selectedCustomer.outstandingBalance > 0 ? "text-red-600" : "text-green-600"}`}
                      >
                        ${selectedCustomer.outstandingBalance.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Last Payment</span>
                      <span className="text-sm font-medium">$125.50 - Dec 15, 2023</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Last Bill Generated</span>
                      <span className="text-sm font-medium">Dec 1, 2023</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm">Account Last Updated</span>
                      <span className="text-sm font-medium">Nov 28, 2023</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Customer Modal */}
      <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Customer</DialogTitle>
            <DialogDescription>Modify customer information for {selectedCustomer?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-name">Full Name</Label>
                <Input
                  id="update-name"
                  value={updateFormData.name}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-email">Email</Label>
                <Input
                  id="update-email"
                  type="email"
                  value={updateFormData.email}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-phone">Phone</Label>
                <Input
                  id="update-phone"
                  value={updateFormData.phone}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-status">Status</Label>
                <Select
                  value={updateFormData.status}
                  onValueChange={(value) => setUpdateFormData({ ...updateFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="update-address">Address</Label>
              <Textarea
                id="update-address"
                value={updateFormData.address}
                onChange={(e) => setUpdateFormData({ ...updateFormData, address: e.target.value })}
                placeholder="Enter full address"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setUpdateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUpdate}>
                <Edit className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Customer ID</Label>
                    <p className="text-sm">{selectedCustomer.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="text-sm">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-sm">{selectedCustomer.email}</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Warning</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Deleting this customer will permanently remove all associated data, including billing history and
                      payment records.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Customer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
