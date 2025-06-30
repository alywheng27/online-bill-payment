"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Zap,
  Droplets,
  Calculator,
  BarChart3,
  Clock,
  ChevronUp,
  Info,
} from "lucide-react"
import { toast } from "sonner"

// Mock tariff data
const mockTariffs = [
  {
    id: "ELEC-TARIFF-001",
    name: "Residential Electricity - Standard",
    type: "electricity",
    structure: "tiered",
    status: "active",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    customerCategory: "residential",
    description: "Standard tiered electricity tariff for residential customers",
    tiers: [
      { min: 0, max: 100, rate: 0.12, unit: "kWh" },
      { min: 101, max: 300, rate: 0.15, unit: "kWh" },
      { min: 301, max: null, rate: 0.18, unit: "kWh" },
    ],
    fixedCharges: [{ name: "Service Fee", amount: 10.0 }],
    taxes: [
      { name: "VAT", rate: 0.05, type: "percentage" },
      { name: "Environmental Levy", rate: 2.0, type: "fixed" },
    ],
  },
  {
    id: "ELEC-TARIFF-002",
    name: "Commercial Electricity - Small Business",
    type: "electricity",
    structure: "time-of-use",
    status: "active",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    customerCategory: "commercial",
    description: "Time-of-use electricity tariff for small businesses",
    timeOfUse: [
      { name: "Peak", timeStart: "09:00", timeEnd: "17:00", days: "weekdays", rate: 0.22, unit: "kWh" },
      { name: "Off-Peak", timeStart: "17:00", timeEnd: "09:00", days: "weekdays", rate: 0.14, unit: "kWh" },
      { name: "Weekend", timeStart: "00:00", timeEnd: "23:59", days: "weekends", rate: 0.12, unit: "kWh" },
    ],
    fixedCharges: [
      { name: "Service Fee", amount: 25.0 },
      { name: "Demand Charge", amount: 15.0 },
    ],
    taxes: [{ name: "VAT", rate: 0.05, type: "percentage" }],
  },
  {
    id: "WATER-TARIFF-001",
    name: "Residential Water - Standard",
    type: "water",
    structure: "tiered",
    status: "active",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    customerCategory: "residential",
    description: "Standard tiered water tariff for residential customers",
    tiers: [
      { min: 0, max: 10000, rate: 0.003, unit: "gallons" },
      { min: 10001, max: 20000, rate: 0.004, unit: "gallons" },
      { min: 20001, max: null, rate: 0.005, unit: "gallons" },
    ],
    fixedCharges: [{ name: "Service Fee", amount: 7.5 }],
    taxes: [{ name: "Water Conservation Fee", rate: 1.5, type: "fixed" }],
  },
  {
    id: "WATER-TARIFF-002",
    name: "Commercial Water - Business",
    type: "water",
    structure: "flat",
    status: "active",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    customerCategory: "commercial",
    description: "Flat rate water tariff for commercial customers",
    flatRate: { rate: 0.0045, unit: "gallons" },
    fixedCharges: [
      { name: "Service Fee", amount: 20.0 },
      { name: "Infrastructure Fee", amount: 15.0 },
    ],
    taxes: [{ name: "VAT", rate: 0.05, type: "percentage" }],
  },
  {
    id: "ELEC-TARIFF-003",
    name: "Industrial Electricity",
    type: "electricity",
    structure: "demand-based",
    status: "draft",
    effectiveDate: "2024-03-01",
    expiryDate: "2024-12-31",
    customerCategory: "industrial",
    description: "Demand-based electricity tariff for industrial customers",
    energyRate: { rate: 0.11, unit: "kWh" },
    demandRate: { rate: 12.5, unit: "kW" },
    fixedCharges: [{ name: "Service Fee", amount: 50.0 }],
    taxes: [{ name: "VAT", rate: 0.05, type: "percentage" }],
  },
  {
    id: "WATER-TARIFF-003",
    name: "Agricultural Water",
    type: "water",
    structure: "seasonal",
    status: "inactive",
    effectiveDate: "2023-01-01",
    expiryDate: "2023-12-31",
    customerCategory: "agricultural",
    description: "Seasonal water tariff for agricultural customers",
    seasonalRates: [
      { name: "Growing Season", months: [4, 5, 6, 7, 8, 9], rate: 0.0025, unit: "gallons" },
      { name: "Off Season", months: [1, 2, 3, 10, 11, 12], rate: 0.002, unit: "gallons" },
    ],
    fixedCharges: [{ name: "Service Fee", amount: 15.0 }],
    taxes: [],
  },
]

// Mock customer categories
const customerCategories = [
  { id: "residential", name: "Residential" },
  { id: "commercial", name: "Commercial" },
  { id: "industrial", name: "Industrial" },
  { id: "agricultural", name: "Agricultural" },
  { id: "government", name: "Government" },
]

export default function TariffManagementPage() {
  const [isCreateTariffDialogOpen, setIsCreateTariffDialogOpen] = useState(false)
  const [newTariff, setNewTariff] = useState({
    name: "",
    type: "electricity",
    structure: "tiered",
    customerCategory: "residential",
    status: "draft",
    effectiveDate: "",
    expiryDate: "",
    description: "",
    tiers: [{ min: 0, max: 100, rate: 0, unit: "kWh" }],
    fixedCharges: [],
    taxes: [],
  })
  const [tariffs, setTariffs] = useState(mockTariffs)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedTariff, setSelectedTariff] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSimulateDialogOpen, setIsSimulateDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [editedTariff, setEditedTariff] = useState(null)
  const [simulationParams, setSimulationParams] = useState({
    consumption: 250,
    demandReading: 15,
    timeOfUse: "peak",
    month: new Date().getMonth() + 1,
  })
  const [simulationResults, setSimulationResults] = useState(null)
  const [reportType, setReportType] = useState("tariff_comparison")
  const [reportDateRange, setReportDateRange] = useState("last_quarter")
  const [expandedTiers, setExpandedTiers] = useState({})

  const filteredTariffs = tariffs.filter((tariff) => {
    const matchesSearch =
      tariff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tariff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tariff.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || tariff.type === typeFilter
    const matchesStatus = statusFilter === "all" || tariff.status === statusFilter
    const matchesCategory = categoryFilter === "all" || tariff.customerCategory === categoryFilter

    return matchesSearch && matchesType && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
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

  const getStructureIcon = (structure) => {
    switch (structure) {
      case "tiered":
        return <ChevronUp className="h-4 w-4 text-green-500" />
      case "flat":
        return <Separator className="h-4 w-4 text-blue-500" orientation="horizontal" />
      case "time-of-use":
        return <Clock className="h-4 w-4 text-purple-500" />
      case "demand-based":
        return <BarChart3 className="h-4 w-4 text-orange-500" />
      case "seasonal":
        return <Calendar className="h-4 w-4 text-teal-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const handleViewTariff = (tariff) => {
    setSelectedTariff(tariff)
    setIsViewDialogOpen(true)
  }

  const handleEditTariff = (tariff) => {
    setEditedTariff({ ...tariff })
    setIsEditDialogOpen(true)
  }

  const handleDeleteTariff = (tariff) => {
    setSelectedTariff(tariff)
    setIsDeleteDialogOpen(true)
  }

  const handleSimulateTariff = (tariff) => {
    setSelectedTariff(tariff)
    setIsSimulateDialogOpen(true)
    // Reset simulation results
    setSimulationResults(null)
  }

  const handleDuplicateTariff = (tariff) => {
    const newTariff = {
      ...tariff,
      id: `${tariff.id.split("-").slice(0, 2).join("-")}-${String(tariffs.length + 1).padStart(3, "0")}`,
      name: `${tariff.name} (Copy)`,
      status: "draft",
    }
    setTariffs([...tariffs, newTariff])

    // Show success notification with detailed information
    toast.success("Tariff Duplicated Successfully")
  }

  const handleCreateTariff = () => {
    // Generate new tariff ID
    const typePrefix = newTariff.type === "electricity" ? "ELEC" : "WATER"
    const newId = `${typePrefix}-TARIFF-${String(tariffs.length + 1).padStart(3, "0")}`

    const tariffToCreate = {
      ...newTariff,
      id: newId,
    }

    setTariffs([...tariffs, tariffToCreate])
    setIsCreateTariffDialogOpen(false)

    // Reset form
    setNewTariff({
      name: "",
      type: "electricity",
      structure: "tiered",
      customerCategory: "residential",
      status: "draft",
      effectiveDate: "",
      expiryDate: "",
      description: "",
      tiers: [{ min: 0, max: 100, rate: 0, unit: "kWh" }],
      fixedCharges: [],
      taxes: [],
    })

    // Show success notification
    toast.success("Tariff Created Successfully")
  }

  const handleSaveEdit = () => {
    if (!editedTariff) return

    // Update tariffs array
    const updatedTariffs = tariffs.map((tariff) => (tariff.id === editedTariff.id ? editedTariff : tariff))

    setTariffs(updatedTariffs)
    setIsEditDialogOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!selectedTariff) return

    // Remove tariff from array
    const updatedTariffs = tariffs.filter((tariff) => tariff.id !== selectedTariff.id)

    setTariffs(updatedTariffs)
    setIsDeleteDialogOpen(false)
  }

  const handleRunSimulation = () => {
    if (!selectedTariff) return

    // Calculate bill based on tariff and simulation parameters
    let totalAmount = 0
    const breakdown = []

    // Calculate consumption charges based on tariff structure
    if (selectedTariff.structure === "tiered") {
      let remainingConsumption = simulationParams.consumption
      let tierCharges = 0

      for (const tier of selectedTariff.tiers) {
        const tierMin = tier.min
        const tierMax = tier.max !== null ? tier.max : Number.POSITIVE_INFINITY
        const tierRange = tierMax - tierMin

        if (remainingConsumption <= 0) break

        const consumptionInTier = Math.min(remainingConsumption, tierRange)
        const tierCharge = consumptionInTier * tier.rate
        tierCharges += tierCharge

        breakdown.push({
          description: `${tier.min}-${tier.max !== null ? tier.max : "∞"} ${tier.unit}`,
          consumption: consumptionInTier,
          rate: tier.rate,
          amount: tierCharge,
        })

        remainingConsumption -= consumptionInTier
      }

      totalAmount += tierCharges
    } else if (selectedTariff.structure === "flat") {
      const flatCharge = simulationParams.consumption * selectedTariff.flatRate.rate
      totalAmount += flatCharge
      breakdown.push({
        description: `Flat rate (${selectedTariff.flatRate.unit})`,
        consumption: simulationParams.consumption,
        rate: selectedTariff.flatRate.rate,
        amount: flatCharge,
      })
    } else if (selectedTariff.structure === "time-of-use") {
      const selectedTimeOfUse = selectedTariff.timeOfUse.find(
        (tou) => tou.name.toLowerCase() === simulationParams.timeOfUse.toLowerCase(),
      )
      if (selectedTimeOfUse) {
        const touCharge = simulationParams.consumption * selectedTimeOfUse.rate
        totalAmount += touCharge
        breakdown.push({
          description: `${selectedTimeOfUse.name} (${selectedTimeOfUse.timeStart}-${selectedTimeOfUse.timeEnd})`,
          consumption: simulationParams.consumption,
          rate: selectedTimeOfUse.rate,
          amount: touCharge,
        })
      }
    } else if (selectedTariff.structure === "demand-based") {
      // Energy charge
      const energyCharge = simulationParams.consumption * selectedTariff.energyRate.rate
      totalAmount += energyCharge
      breakdown.push({
        description: `Energy charge (${selectedTariff.energyRate.unit})`,
        consumption: simulationParams.consumption,
        rate: selectedTariff.energyRate.rate,
        amount: energyCharge,
      })

      // Demand charge
      const demandCharge = simulationParams.demandReading * selectedTariff.demandRate.rate
      totalAmount += demandCharge
      breakdown.push({
        description: `Demand charge (${selectedTariff.demandRate.unit})`,
        consumption: simulationParams.demandReading,
        rate: selectedTariff.demandRate.rate,
        amount: demandCharge,
      })
    } else if (selectedTariff.structure === "seasonal") {
      const currentMonth = simulationParams.month
      const seasonalRate = selectedTariff.seasonalRates.find((season) => season.months.includes(currentMonth))

      if (seasonalRate) {
        const seasonalCharge = simulationParams.consumption * seasonalRate.rate
        totalAmount += seasonalCharge
        breakdown.push({
          description: `${seasonalRate.name} (${seasonalRate.unit})`,
          consumption: simulationParams.consumption,
          rate: seasonalRate.rate,
          amount: seasonalCharge,
        })
      }
    }

    // Add fixed charges
    if (selectedTariff.fixedCharges && selectedTariff.fixedCharges.length > 0) {
      for (const charge of selectedTariff.fixedCharges) {
        totalAmount += charge.amount
        breakdown.push({
          description: charge.name,
          consumption: null,
          rate: null,
          amount: charge.amount,
        })
      }
    }

    // Add taxes
    if (selectedTariff.taxes && selectedTariff.taxes.length > 0) {
      for (const tax of selectedTariff.taxes) {
        let taxAmount = 0
        if (tax.type === "percentage") {
          taxAmount = totalAmount * tax.rate
        } else {
          taxAmount = tax.rate
        }
        totalAmount += taxAmount
        breakdown.push({
          description: `${tax.name} (${tax.type === "percentage" ? tax.rate * 100 + "%" : "fixed"})`,
          consumption: null,
          rate: null,
          amount: taxAmount,
        })
      }
    }

    // Set simulation results
    setSimulationResults({
      totalAmount,
      breakdown,
    })
  }

  const handleGenerateReport = () => {
    // Simulate report generation
    setIsReportDialogOpen(false)
    // In a real application, this would generate and download a report
  }

  const toggleTierExpansion = (tariffId) => {
    setExpandedTiers((prev) => ({
      ...prev,
      [tariffId]: !prev[tariffId],
    }))
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tariff Management</h1>
            <p className="text-gray-600">Create, modify, and manage utility tariffs</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsReportDialogOpen(true)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button onClick={() => setIsCreateTariffDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Tariff
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Tariffs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tariffs.length}</div>
              <p className="text-xs text-gray-500">
                {tariffs.filter((t) => t.status === "active").length} active tariffs
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Electricity Tariffs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tariffs.filter((t) => t.type === "electricity").length}</div>
              <p className="text-xs text-gray-500">
                {tariffs.filter((t) => t.type === "electricity" && t.status === "active").length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Water Tariffs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tariffs.filter((t) => t.type === "water").length}</div>
              <p className="text-xs text-gray-500">
                {tariffs.filter((t) => t.type === "water" && t.status === "active").length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Customer Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customerCategories.length}</div>
              <p className="text-xs text-gray-500">
                {new Set(tariffs.map((t) => t.customerCategory)).size} categories in use
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter Tariffs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tariffs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {customerCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tariffs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tariffs</CardTitle>
            <CardDescription>
              {filteredTariffs.length} tariff{filteredTariffs.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Tariffs</TabsTrigger>
                <TabsTrigger value="electricity">Electricity</TabsTrigger>
                <TabsTrigger value="water">Water</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tariff ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Structure</TableHead>
                        <TableHead>Customer Category</TableHead>
                        <TableHead>Effective Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTariffs.map((tariff) => (
                        <TableRow key={tariff.id} className="group">
                          <TableCell className="font-medium">{tariff.id}</TableCell>
                          <TableCell>{tariff.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(tariff.type)}
                              <span className="capitalize">{tariff.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStructureIcon(tariff.structure)}
                              <span className="capitalize">{tariff.structure.replace("-", " ")}</span>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{tariff.customerCategory}</TableCell>
                          <TableCell>
                            <div>
                              <p>{tariff.effectiveDate}</p>
                              <p className="text-xs text-gray-500">to {tariff.expiryDate}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(tariff.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewTariff(tariff)}>
                                View
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditTariff(tariff)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleSimulateTariff(tariff)}>
                                <Calculator className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDuplicateTariff(tariff)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteTariff(tariff)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="electricity" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tariff ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Structure</TableHead>
                        <TableHead>Customer Category</TableHead>
                        <TableHead>Effective Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTariffs
                        .filter((tariff) => tariff.type === "electricity")
                        .map((tariff) => (
                          <TableRow key={tariff.id}>
                            <TableCell className="font-medium">{tariff.id}</TableCell>
                            <TableCell>{tariff.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getStructureIcon(tariff.structure)}
                                <span className="capitalize">{tariff.structure.replace("-", " ")}</span>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{tariff.customerCategory}</TableCell>
                            <TableCell>
                              <div>
                                <p>{tariff.effectiveDate}</p>
                                <p className="text-xs text-gray-500">to {tariff.expiryDate}</p>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(tariff.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewTariff(tariff)}>
                                  View
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleSimulateTariff(tariff)}>
                                  <Calculator className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="water" className="m-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tariff ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Structure</TableHead>
                        <TableHead>Customer Category</TableHead>
                        <TableHead>Effective Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTariffs
                        .filter((tariff) => tariff.type === "water")
                        .map((tariff) => (
                          <TableRow key={tariff.id}>
                            <TableCell className="font-medium">{tariff.id}</TableCell>
                            <TableCell>{tariff.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getStructureIcon(tariff.structure)}
                                <span className="capitalize">{tariff.structure.replace("-", " ")}</span>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{tariff.customerCategory}</TableCell>
                            <TableCell>
                              <div>
                                <p>{tariff.effectiveDate}</p>
                                <p className="text-xs text-gray-500">to {tariff.expiryDate}</p>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(tariff.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewTariff(tariff)}>
                                  View
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleSimulateTariff(tariff)}>
                                  <Calculator className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* View Tariff Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Tariff Details</DialogTitle>
              <DialogDescription>Detailed information about tariff {selectedTariff?.id}</DialogDescription>
            </DialogHeader>

            {selectedTariff && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {getTypeIcon(selectedTariff.type)}
                      <span>{selectedTariff.name}</span>
                    </h3>
                    <p className="text-sm text-gray-500">ID: {selectedTariff.id}</p>
                  </div>
                  <div className="text-right">
                    <div>{getStatusBadge(selectedTariff.status)}</div>
                    <p className="text-sm text-gray-500 mt-1">
                      Valid: {selectedTariff.effectiveDate} to {selectedTariff.expiryDate}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Basic Information</h4>
                    <div className="space-y-1">
                      <p>
                        <span className="text-gray-500">Type:</span>{" "}
                        <span className="capitalize">{selectedTariff.type}</span>
                      </p>
                      <p>
                        <span className="text-gray-500">Structure:</span>{" "}
                        <span className="capitalize">{selectedTariff.structure.replace("-", " ")}</span>
                      </p>
                      <p>
                        <span className="text-gray-500">Customer Category:</span>{" "}
                        <span className="capitalize">{selectedTariff.customerCategory}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm">{selectedTariff.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Rate Structure</h4>
                  {selectedTariff.structure === "tiered" && (
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h5 className="text-sm font-medium mb-2">Consumption Tiers</h5>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Tier</TableHead>
                                <TableHead>Range</TableHead>
                                <TableHead>Rate</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedTariff.tiers.map((tier, index) => (
                                <TableRow key={index}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    {tier.min} - {tier.max !== null ? tier.max : "∞"} {tier.unit}
                                  </TableCell>
                                  <TableCell>
                                    ${tier.rate.toFixed(4)} per {tier.unit}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTariff.structure === "flat" && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium mb-2">Flat Rate</h5>
                      <p>
                        ${selectedTariff.flatRate.rate.toFixed(4)} per {selectedTariff.flatRate.unit}
                      </p>
                    </div>
                  )}

                  {selectedTariff.structure === "time-of-use" && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium mb-2">Time-of-Use Rates</h5>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Period</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Days</TableHead>
                              <TableHead>Rate</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedTariff.timeOfUse.map((period, index) => (
                              <TableRow key={index}>
                                <TableCell>{period.name}</TableCell>
                                <TableCell>
                                  {period.timeStart} - {period.timeEnd}
                                </TableCell>
                                <TableCell className="capitalize">{period.days}</TableCell>
                                <TableCell>
                                  ${period.rate.toFixed(4)} per {period.unit}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {selectedTariff.structure === "demand-based" && (
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h5 className="text-sm font-medium mb-2">Energy Rate</h5>
                        <p>
                          ${selectedTariff.energyRate.rate.toFixed(4)} per {selectedTariff.energyRate.unit}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h5 className="text-sm font-medium mb-2">Demand Rate</h5>
                        <p>
                          ${selectedTariff.demandRate.rate.toFixed(2)} per {selectedTariff.demandRate.unit}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedTariff.structure === "seasonal" && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium mb-2">Seasonal Rates</h5>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Season</TableHead>
                              <TableHead>Months</TableHead>
                              <TableHead>Rate</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedTariff.seasonalRates.map((season, index) => (
                              <TableRow key={index}>
                                <TableCell>{season.name}</TableCell>
                                <TableCell>
                                  {season.months
                                    .map((m) =>
                                      new Date(0, m - 1).toLocaleString("default", { month: "short" }),
                                    )
                                    .join(", ")}
                                </TableCell>
                                <TableCell>
                                  ${season.rate.toFixed(4)} per {season.unit}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Fixed Charges</h4>
                    {selectedTariff.fixedCharges && selectedTariff.fixedCharges.length > 0 ? (
                      <div className="space-y-2">
                        {selectedTariff.fixedCharges.map((charge, index) => (
                          <div key={index} className="flex justify-between p-2 bg-gray-50 rounded-md">
                            <span>{charge.name}</span>
                            <span className="font-medium">${charge.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No fixed charges</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Taxes</h4>
                    {selectedTariff.taxes && selectedTariff.taxes.length > 0 ? (
                      <div className="space-y-2">
                        {selectedTariff.taxes.map((tax, index) => (
                          <div key={index} className="flex justify-between p-2 bg-gray-50 rounded-md">
                            <span>{tax.name}</span>
                            <span className="font-medium">
                              {tax.type === "percentage"
                                ? `${(tax.rate * 100).toFixed(1)}%`
                                : `$${tax.rate.toFixed(2)}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No taxes</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline" onClick={() => handleEditTariff(selectedTariff)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button onClick={() => handleSimulateTariff(selectedTariff)}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Simulate
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Tariff Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Tariff</DialogTitle>
              <DialogDescription>Make changes to tariff {editedTariff?.id}</DialogDescription>
            </DialogHeader>

            {editedTariff && (
              <div className="space-y-6">
                <Tabs defaultValue="basic">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="rates">Rate Structure</TabsTrigger>
                    <TabsTrigger value="charges">Charges & Taxes</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tariff Name</Label>
                      <Input
                        id="name"
                        value={editedTariff.name}
                        onChange={(e) => setEditedTariff({ ...editedTariff, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Utility Type</Label>
                        <Select
                          value={editedTariff.type}
                          onValueChange={(value) => setEditedTariff({ ...editedTariff, type: value })}
                        >
                          <SelectTrigger id="type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electricity">Electricity</SelectItem>
                            <SelectItem value="water">Water</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="structure">Tariff Structure</Label>
                        <Select
                          value={editedTariff.structure}
                          onValueChange={(value) => setEditedTariff({ ...editedTariff, structure: value })}
                        >
                          <SelectTrigger id="structure">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tiered">Tiered</SelectItem>
                            <SelectItem value="flat">Flat Rate</SelectItem>
                            <SelectItem value="time-of-use">Time-of-Use</SelectItem>
                            <SelectItem value="demand-based">Demand-Based</SelectItem>
                            <SelectItem value="seasonal">Seasonal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerCategory">Customer Category</Label>
                        <Select
                          value={editedTariff.customerCategory}
                          onValueChange={(value) => setEditedTariff({ ...editedTariff, customerCategory: value })}
                        >
                          <SelectTrigger id="customerCategory">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {customerCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={editedTariff.status}
                          onValueChange={(value) => setEditedTariff({ ...editedTariff, status: value })}
                        >
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="effectiveDate">Effective Date</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          value={editedTariff.effectiveDate}
                          onChange={(e) => setEditedTariff({ ...editedTariff, effectiveDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          type="date"
                          value={editedTariff.expiryDate}
                          onChange={(e) => setEditedTariff({ ...editedTariff, expiryDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editedTariff.description}
                        onChange={(e) => setEditedTariff({ ...editedTariff, description: e.target.value })}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="rates" className="space-y-4">
                    {editedTariff.structure === "tiered" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Consumption Tiers</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setEditedTariff({
                                ...editedTariff,
                                tiers: [
                                  ...editedTariff.tiers,
                                  {
                                    min: editedTariff.tiers[editedTariff.tiers.length - 1].max + 1,
                                    max: null,
                                    rate: 0,
                                    unit: editedTariff.type === "electricity" ? "kWh" : "gallons",
                                  },
                                ],
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Tier
                          </Button>
                        </div>

                        {editedTariff.tiers.map((tier, index) => (
                          <div key={index} className="p-4 border rounded-md space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Tier {index + 1}</h4>
                              {index > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setEditedTariff({
                                      ...editedTariff,
                                      tiers: editedTariff.tiers.filter((_, i) => i !== index),
                                    })
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Minimum {tier.unit}</Label>
                                <Input
                                  type="number"
                                  value={tier.min}
                                  onChange={(e) => {
                                    const updatedTiers = [...editedTariff.tiers]
                                    updatedTiers[index] = {
                                      ...tier,
                                      min: Number(e.target.value),
                                    }
                                    setEditedTariff({ ...editedTariff, tiers: updatedTiers })
                                  }}
                                  disabled={index === 0}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Maximum {tier.unit}</Label>
                                <Input
                                  type="number"
                                  value={tier.max === null ? "" : tier.max}
                                  placeholder="No limit"
                                  onChange={(e) => {
                                    const updatedTiers = [...editedTariff.tiers]
                                    updatedTiers[index] = {
                                      ...tier,
                                      max: e.target.value === "" ? null : Number(e.target.value),
                                    }
                                    setEditedTariff({ ...editedTariff, tiers: updatedTiers })
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Rate per {tier.unit}</Label>
                                <Input
                                  type="number"
                                  step="0.0001"
                                  value={tier.rate}
                                  onChange={(e) => {
                                    const updatedTiers = [...editedTariff.tiers]
                                    updatedTiers[index] = {
                                      ...tier,
                                      rate: Number(e.target.value),
                                    }
                                    setEditedTariff({ ...editedTariff, tiers: updatedTiers })
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {editedTariff.structure === "flat" && (
                      <div className="p-4 border rounded-md space-y-4">
                        <h3 className="text-lg font-medium">Flat Rate</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Rate per {editedTariff.type === "electricity" ? "kWh" : "gallon"}</Label>
                            <Input
                              type="number"
                              step="0.0001"
                              value={editedTariff.flatRate?.rate || 0}
                              onChange={(e) =>
                                setEditedTariff({
                                  ...editedTariff,
                                  flatRate: {
                                    rate: Number(e.target.value),
                                    unit: editedTariff.type === "electricity" ? "kWh" : "gallons",
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {editedTariff.structure === "time-of-use" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Time-of-Use Periods</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setEditedTariff({
                                ...editedTariff,
                                timeOfUse: [
                                  ...(editedTariff.timeOfUse || []),
                                  {
                                    name: "New Period",
                                    timeStart: "00:00",
                                    timeEnd: "23:59",
                                    days: "weekdays",
                                    rate: 0,
                                    unit: editedTariff.type === "electricity" ? "kWh" : "gallons",
                                  },
                                ],
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Period
                          </Button>
                        </div>

                        {(editedTariff.timeOfUse || []).map((period, index) => (
                          <div key={index} className="p-4 border rounded-md space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="space-y-2">
                                <Label>Period Name</Label>
                                <Input
                                  value={period.name}
                                  onChange={(e) => {
                                    const updatedPeriods = [...editedTariff.timeOfUse]
                                    updatedPeriods[index] = {
                                      ...period,
                                      name: e.target.value,
                                    }
                                    setEditedTariff({ ...editedTariff, timeOfUse: updatedPeriods })
                                  }}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setEditedTariff({
                                    ...editedTariff,
                                    timeOfUse: editedTariff.timeOfUse.filter((_, i) => i !== index),
                                  })
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Start Time</Label>
                                <Input
                                  type="time"
                                  value={period.timeStart}
                                  onChange={(e) => {
                                    const updatedPeriods = [...editedTariff.timeOfUse]
                                    updatedPeriods[index] = {
                                      ...period,
                                      timeStart: e.target.value,
                                    }
                                    setEditedTariff({ ...editedTariff, timeOfUse: updatedPeriods })
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Time</Label>
                                <Input
                                  type="time"
                                  value={period.timeEnd}
                                  onChange={(e) => {
                                    const updatedPeriods = [...editedTariff.timeOfUse]
                                    updatedPeriods[index] = {
                                      ...period,
                                      timeEnd: e.target.value,
                                    }
                                    setEditedTariff({ ...editedTariff, timeOfUse: updatedPeriods })
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Days</Label>
                                <Select
                                  value={period.days}
                                  onChange={(value) => {
                                    const updatedPeriods = [...editedTariff.timeOfUse]
                                    updatedPeriods[index] = {
                                      ...period,
                                      days: value,
                                    }
                                    setEditedTariff({ ...editedTariff, timeOfUse: updatedPeriods })
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="weekdays">Weekdays</SelectItem>
                                    <SelectItem value="weekends">Weekends</SelectItem>
                                    <SelectItem value="all">All Days</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Rate per {period.unit}</Label>
                              <Input
                                type="number"
                                step="0.0001"
                                value={period.rate}
                                onChange={(e) => {
                                  const updatedPeriods = [...editedTariff.timeOfUse]
                                  updatedPeriods[index] = {
                                    ...period,
                                    rate: Number(e.target.value),
                                  }
                                  setEditedTariff({ ...editedTariff, timeOfUse: updatedPeriods })
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {editedTariff.structure === "demand-based" && (
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md space-y-4">
                          <h3 className="text-lg font-medium">Energy Rate</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Rate per kWh</Label>
                              <Input
                                type="number"
                                step="0.0001"
                                value={editedTariff.energyRate?.rate || 0}
                                onChange={(e) =>
                                  setEditedTariff({
                                    ...editedTariff,
                                    energyRate: {
                                      rate: Number(e.target.value),
                                      unit: "kWh",
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-md space-y-4">
                          <h3 className="text-lg font-medium">Demand Rate</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Rate per kW</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={editedTariff.demandRate?.rate || 0}
                                onChange={(e) =>
                                  setEditedTariff({
                                    ...editedTariff,
                                    demandRate: {
                                      rate: Number(e.target.value),
                                      unit: "kW",
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {editedTariff.structure === "seasonal" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Seasonal Rates</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setEditedTariff({
                                ...editedTariff,
                                seasonalRates: [
                                  ...(editedTariff.seasonalRates || []),
                                  {
                                    name: "New Season",
                                    months: [],
                                    rate: 0,
                                    unit: editedTariff.type === "electricity" ? "kWh" : "gallons",
                                  },
                                ],
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Season
                          </Button>
                        </div>

                        {(editedTariff.seasonalRates || []).map((season, index) => (
                          <div key={index} className="p-4 border rounded-md space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="space-y-2">
                                <Label>Season Name</Label>
                                <Input
                                  value={season.name}
                                  onChange={(e) => {
                                    const updatedSeasons = [...editedTariff.seasonalRates]
                                    updatedSeasons[index] = {
                                      ...season,
                                      name: e.target.value,
                                    }
                                    setEditedTariff({ ...editedTariff, seasonalRates: updatedSeasons })
                                  }}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setEditedTariff({
                                    ...editedTariff,
                                    seasonalRates: editedTariff.seasonalRates.filter((_, i) => i !== index),
                                  })
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Months</Label>
                                {/* Implement month selection component here */}
                                <Input placeholder="Select Months" />
                              </div>
                              <div className="space-y-2">
                                <Label>Rate per {season.unit}</Label>
                                <Input
                                  type="number"
                                  step="0.0001"
                                  value={season.rate}
                                  onChange={(e) => {
                                    const updatedSeasons = [...editedTariff.seasonalRates]
                                    updatedSeasons[index] = {
                                      ...season,
                                      rate: Number(e.target.value),
                                    }
                                    setEditedTariff({ ...editedTariff, seasonalRates: updatedSeasons })
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="charges" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Fixed Charges</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditedTariff({
                              ...editedTariff,
                              fixedCharges: [
                                ...(editedTariff.fixedCharges || []),
                                {
                                  name: "New Charge",
                                  amount: 0,
                                },
                              ],
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Charge
                        </Button>
                      </div>

                      {(editedTariff.fixedCharges || []).map((charge, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-2">
                              <Label>Charge Name</Label>
                              <Input
                                value={charge.name}
                                onChange={(e) => {
                                  const updatedCharges = [...editedTariff.fixedCharges]
                                  updatedCharges[index] = {
                                    ...charge,
                                    name: e.target.value,
                                  }
                                  setEditedTariff({ ...editedTariff, fixedCharges: updatedCharges })
                                }}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setEditedTariff({
                                  ...editedTariff,
                                  fixedCharges: editedTariff.fixedCharges.filter((_, i) => i !== index),
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label>Amount</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={charge.amount}
                              onChange={(e) => {
                                const updatedCharges = [...editedTariff.fixedCharges]
                                updatedCharges[index] = {
                                  ...charge,
                                  amount: Number(e.target.value),
                                }
                                setEditedTariff({ ...editedTariff, fixedCharges: updatedCharges })
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Taxes</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditedTariff({
                              ...editedTariff,
                              taxes: [
                                ...(editedTariff.taxes || []),
                                {
                                  name: "New Tax",
                                  rate: 0,
                                  type: "percentage",
                                },
                              ],
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Tax
                        </Button>
                      </div>

                      {(editedTariff.taxes || []).map((tax, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-2">
                              <Label>Tax Name</Label>
                              <Input
                                value={tax.name}
                                onChange={(e) => {
                                  const updatedTaxes = [...editedTariff.taxes]
                                  updatedTaxes[index] = {
                                    ...tax,
                                    name: e.target.value,
                                  }
                                  setEditedTariff({ ...editedTariff, taxes: updatedTaxes })
                                }}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setEditedTariff({
                                  ...editedTariff,
                                  taxes: editedTariff.taxes.filter((_, i) => i !== index),
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Rate</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={tax.rate}
                                onChange={(e) => {
                                  const updatedTaxes = [...editedTariff.taxes]
                                  updatedTaxes[index] = {
                                    ...tax,
                                    rate: Number(e.target.value),
                                  }
                                  setEditedTariff({ ...editedTariff, taxes: updatedTaxes })
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Type</Label>
                              <Select
                                value={tax.type}
                                onValueChange={(value) => {
                                  const updatedTaxes = [...editedTariff.taxes]
                                  updatedTaxes[index] = {
                                    ...tax,
                                    type: value,
                                  }
                                  setEditedTariff({ ...editedTariff, taxes: updatedTaxes })
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percentage">Percentage</SelectItem>
                                  <SelectItem value="fixed">Fixed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tariffId">Tariff ID</Label>
                      <Input id="tariffId" value={editedTariff.id} disabled />
                      <p className="text-sm text-gray-500">The Tariff ID cannot be changed.</p>
                    </div>
                  </TabsContent>
                </Tabs>

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

        {/* Delete Tariff Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Tariff</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete tariff {selectedTariff?.id}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Simulate Tariff Dialog */}
        <Dialog open={isSimulateDialogOpen} onOpenChange={setIsSimulateDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Simulate Tariff</DialogTitle>
              <DialogDescription>
                Simulate the cost of tariff {selectedTariff?.id} based on your consumption.
              </DialogDescription>
            </DialogHeader>

            {selectedTariff && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="consumption">Consumption (kWh or gallons)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    value={simulationParams.consumption}
                    onChange={(e) => setSimulationParams({ ...simulationParams, consumption: Number(e.target.value) })}
                  />
                </div>

                {selectedTariff.structure === "demand-based" && (
                  <div className="space-y-2">
                    <Label htmlFor="demandReading">Demand Reading (kW)</Label>
                    <Input
                      id="demandReading"
                      type="number"
                      value={simulationParams.demandReading}
                      onChange={(e) =>
                        setSimulationParams({ ...simulationParams, demandReading: Number(e.target.value) })
                      }
                    />
                  </div>
                )}

                {selectedTariff.structure === "time-of-use" && (
                  <div className="space-y-2">
                    <Label htmlFor="timeOfUse">Time of Use Period</Label>
                    <Select
                      value={simulationParams.timeOfUse}
                      onValueChange={(value) => setSimulationParams({ ...simulationParams, timeOfUse: value })}
                    >
                      <SelectTrigger id="timeOfUse">
                        <SelectValue placeholder="Select Period" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedTariff.timeOfUse.map((tou) => (
                          <SelectItem key={tou.name} value={tou.name}>
                            {tou.name} ({tou.timeStart} - {tou.timeEnd})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedTariff.structure === "seasonal" && (
                  <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                    <Select
                      value={simulationParams.month}
                      onValueChange={(value) => setSimulationParams({ ...simulationParams, month: Number(value) })}
                    >
                      <SelectTrigger id="month">
                        <SelectValue placeholder="Select Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month}>
                            {new Date(0, month - 1).toLocaleString("default", { month: "long" })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {simulationResults && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Simulation Results</h3>
                    <p>
                      <strong>Total Amount:</strong> ${simulationResults.totalAmount.toFixed(2)}
                    </p>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Consumption</TableHead>
                            <TableHead>Rate</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {simulationResults.breakdown.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.description}</TableCell>
                              <TableCell>{item.consumption !== null ? item.consumption : "-"}</TableCell>
                              <TableCell>{item.rate !== null ? item.rate : "-"}</TableCell>
                              <TableCell>${item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsSimulateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleRunSimulation}>Run Simulation</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Report Generation Dialog */}
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Report</DialogTitle>
              <DialogDescription>Configure the report type and date range for tariff analysis.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tariff_comparison">Tariff Comparison</SelectItem>
                    <SelectItem value="revenue_analysis">Revenue Analysis</SelectItem>
                    <SelectItem value="customer_impact">Customer Impact Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={reportDateRange} onValueChange={setReportDateRange}>
                  <SelectTrigger id="dateRange">
                    <SelectValue placeholder="Select Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_month">Last Month</SelectItem>
                    <SelectItem value="last_quarter">Last Quarter</SelectItem>
                    <SelectItem value="last_year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateReport}>Generate Report</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Create Tariff Dialog */}
        <Dialog open={isCreateTariffDialogOpen} onOpenChange={setIsCreateTariffDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Tariff</DialogTitle>
              <DialogDescription>
                Configure a new tariff with rate structures, effective dates, and associated rules
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="rates">Rate Structure</TabsTrigger>
                  <TabsTrigger value="charges">Charges & Taxes</TabsTrigger>
                  <TabsTrigger value="preview">Preview & Create</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="create-name">Tariff Name *</Label>
                      <Input
                        id="create-name"
                        placeholder="e.g., Residential Electricity - Standard"
                        value={newTariff.name}
                        onChange={(e) => setNewTariff({ ...newTariff, name: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-type">Utility Type *</Label>
                      <Select
                        value={newTariff.type}
                        onValueChange={(value) =>
                          setNewTariff({
                            ...newTariff,
                            type: value,
                            tiers:
                              value === "electricity"
                                ? [{ min: 0, max: 100, rate: 0, unit: "kWh" }]
                                : [{ min: 0, max: 10000, rate: 0, unit: "gallons" }],
                          })
                        }
                      >
                        <SelectTrigger id="create-type">
                          <SelectValue placeholder="Select utility type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electricity">
                            <div className="flex items-center space-x-2">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              <span>Electricity</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="water">
                            <div className="flex items-center space-x-2">
                              <Droplets className="h-4 w-4 text-blue-500" />
                              <span>Water</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="create-structure">Tariff Structure *</Label>
                      <Select
                        value={newTariff.structure}
                        onValueChange={(value) => setNewTariff({ ...newTariff, structure: value })}
                      >
                        <SelectTrigger id="create-structure">
                          <SelectValue placeholder="Select tariff structure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tiered">
                            <div className="flex items-center space-x-2">
                              <ChevronUp className="h-4 w-4 text-green-500" />
                              <span>Tiered Pricing</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="flat">
                            <div className="flex items-center space-x-2">
                              <Separator className="h-4 w-4 text-blue-500" orientation="horizontal" />
                              <span>Flat Rate</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="time-of-use">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-purple-500" />
                              <span>Time-of-Use</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="demand-based">
                            <div className="flex items-center space-x-2">
                              <BarChart3 className="h-4 w-4 text-orange-500" />
                              <span>Demand-Based</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="seasonal">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-teal-500" />
                              <span>Seasonal</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-category">Customer Category *</Label>
                      <Select
                        value={newTariff.customerCategory}
                        onValueChange={(value) => setNewTariff({ ...newTariff, customerCategory: value })}
                      >
                        <SelectTrigger id="create-category">
                          <SelectValue placeholder="Select customer category" />
                        </SelectTrigger>
                        <SelectContent>
                          {customerCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="create-effective">Effective Date *</Label>
                      <Input
                        id="create-effective"
                        type="date"
                        value={newTariff.effectiveDate}
                        onChange={(e) => setNewTariff({ ...newTariff, effectiveDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="create-expiry">Expiry Date *</Label>
                      <Input
                        id="create-expiry"
                        type="date"
                        value={newTariff.expiryDate}
                        onChange={(e) => setNewTariff({ ...newTariff, expiryDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="create-description">Description</Label>
                    <Textarea
                      id="create-description"
                      placeholder="Describe the tariff purpose, applicability, and key features..."
                      value={newTariff.description}
                      onChange={(e) => setNewTariff({ ...newTariff, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="create-status">Initial Status</Label>
                    <Select
                      value={newTariff.status}
                      onValueChange={(value) => setNewTariff({ ...newTariff, status: value })}
                    >
                      <SelectTrigger id="create-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft - Not yet active</SelectItem>
                        <SelectItem value="active">Active - Immediately effective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="rates" className="space-y-4">
                  {newTariff.structure === "tiered" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Consumption Tiers</h3>
                          <p className="text-sm text-gray-500">Define rate tiers based on consumption levels</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const lastTier = newTariff.tiers[newTariff.tiers.length - 1]
                            const newMin = lastTier.max ? lastTier.max + 1 : 0
                            setNewTariff({
                              ...newTariff,
                              tiers: [
                                ...newTariff.tiers,
                                {
                                  min: newMin,
                                  max: null,
                                  rate: 0,
                                  unit: newTariff.type === "electricity" ? "kWh" : "gallons",
                                },
                              ],
                            })
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Tier
                        </Button>
                      </div>

                      {newTariff.tiers.map((tier, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Tier {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setNewTariff({
                                    ...newTariff,
                                    tiers: newTariff.tiers.filter((_, i) => i !== index),
                                  })
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Minimum {tier.unit}</Label>
                              <Input
                                type="number"
                                value={tier.min}
                                onChange={(e) => {
                                  const updatedTiers = [...newTariff.tiers]
                                  updatedTiers[index] = {
                                    ...tier,
                                    min: Number(e.target.value),
                                  }
                                  setNewTariff({ ...newTariff, tiers: updatedTiers })
                                }}
                                disabled={index === 0}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Maximum {tier.unit}</Label>
                              <Input
                                type="number"
                                value={tier.max === null ? "" : tier.max}
                                placeholder="No limit"
                                onChange={(e) => {
                                  const updatedTiers = [...newTariff.tiers]
                                  updatedTiers[index] = {
                                    ...tier,
                                    max: e.target.value === "" ? null : Number(e.target.value),
                                  }
                                  setNewTariff({ ...newTariff, tiers: updatedTiers })
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Rate per {tier.unit}</Label>
                              <Input
                                type="number"
                                step="0.0001"
                                value={tier.rate}
                                onChange={(e) => {
                                  const updatedTiers = [...newTariff.tiers]
                                  updatedTiers[index] = {
                                    ...tier,
                                    rate: Number(e.target.value),
                                  }
                                  setNewTariff({ ...newTariff, tiers: updatedTiers })
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {newTariff.structure === "flat" && (
                    <div className="p-4 border rounded-lg space-y-4 bg-gray-50">
                      <h3 className="text-lg font-medium">Flat Rate Configuration</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Rate per {newTariff.type === "electricity" ? "kWh" : "gallon"}</Label>
                          <Input
                            type="number"
                            step="0.0001"
                            placeholder="0.0000"
                            onChange={(e) =>
                              setNewTariff({
                                ...newTariff,
                                flatRate: {
                                  rate: Number(e.target.value),
                                  unit: newTariff.type === "electricity" ? "kWh" : "gallons",
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add similar configurations for other structures */}
                </TabsContent>

                <TabsContent value="charges" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Fixed Charges</h3>
                        <p className="text-sm text-gray-500">Monthly recurring charges independent of consumption</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setNewTariff({
                            ...newTariff,
                            fixedCharges: [
                              ...newTariff.fixedCharges,
                              {
                                name: "Service Fee",
                                amount: 0,
                              },
                            ],
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Fixed Charge
                      </Button>
                    </div>

                    {newTariff.fixedCharges.map((charge, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="grid grid-cols-2 gap-4 flex-1">
                            <div className="space-y-2">
                              <Label>Charge Name</Label>
                              <Input
                                value={charge.name}
                                placeholder="e.g., Service Fee, Connection Charge"
                                onChange={(e) => {
                                  const updatedCharges = [...newTariff.fixedCharges]
                                  updatedCharges[index] = {
                                    ...charge,
                                    name: e.target.value,
                                  }
                                  setNewTariff({ ...newTariff, fixedCharges: updatedCharges })
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Amount ($)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={charge.amount}
                                onChange={(e) => {
                                  const updatedCharges = [...newTariff.fixedCharges]
                                  updatedCharges[index] = {
                                    ...charge,
                                    amount: Number(e.target.value),
                                  }
                                  setNewTariff({ ...newTariff, fixedCharges: updatedCharges })
                                }}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setNewTariff({
                                ...newTariff,
                                fixedCharges: newTariff.fixedCharges.filter((_, i) => i !== index),
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Taxes & Fees</h3>
                        <p className="text-sm text-gray-500">Additional taxes and regulatory fees</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setNewTariff({
                            ...newTariff,
                            taxes: [
                              ...newTariff.taxes,
                              {
                                name: "VAT",
                                rate: 0,
                                type: "percentage",
                              },
                            ],
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tax/Fee
                      </Button>
                    </div>

                    {newTariff.taxes.map((tax, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="grid grid-cols-3 gap-4 flex-1">
                            <div className="space-y-2">
                              <Label>Tax/Fee Name</Label>
                              <Input
                                value={tax.name}
                                placeholder="e.g., VAT, Environmental Levy"
                                onChange={(e) => {
                                  const updatedTaxes = [...newTariff.taxes]
                                  updatedTaxes[index] = {
                                    ...tax,
                                    name: e.target.value,
                                  }
                                  setNewTariff({ ...newTariff, taxes: updatedTaxes })
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Type</Label>
                              <Select
                                value={tax.type}
                                onValueChange={(value) => {
                                  const updatedTaxes = [...newTariff.taxes]
                                  updatedTaxes[index] = {
                                    ...tax,
                                    type: value,
                                  }
                                  setNewTariff({ ...newTariff, taxes: updatedTaxes })
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                                  <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Rate/Amount</Label>
                              <Input
                                type="number"
                                step={tax.type === "percentage" ? "0.01" : "0.01"}
                                value={tax.rate}
                                placeholder={tax.type === "percentage" ? "5.00" : "2.50"}
                                onChange={(e) => {
                                  const updatedTaxes = [...newTariff.taxes]
                                  updatedTaxes[index] = {
                                    ...tax,
                                    rate: Number(e.target.value),
                                  }
                                  setNewTariff({ ...newTariff, taxes: updatedTaxes })
                                }}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setNewTariff({
                                ...newTariff,
                                taxes: newTariff.taxes.filter((_, i) => i !== index),
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Tariff Preview</h3>
                      <div className="p-6 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Basic Information</h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-gray-500">Name:</span> {newTariff.name || "Not specified"}
                              </p>
                              <p>
                                <span className="text-gray-500">Type:</span>{" "}
                                <span className="capitalize">{newTariff.type}</span>
                              </p>
                              <p>
                                <span className="text-gray-500">Structure:</span>{" "}
                                <span className="capitalize">{newTariff.structure.replace("-", " ")}</span>
                              </p>
                              <p>
                                <span className="text-gray-500">Category:</span>{" "}
                                <span className="capitalize">{newTariff.customerCategory}</span>
                              </p>
                              <p>
                                <span className="text-gray-500">Status:</span>{" "}
                                <span className="capitalize">{newTariff.status}</span>
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Validity Period</h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-gray-500">Effective:</span> {newTariff.effectiveDate || "Not set"}
                              </p>
                              <p>
                                <span className="text-gray-500">Expires:</span> {newTariff.expiryDate || "Not set"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {newTariff.description && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-gray-600">{newTariff.description}</p>
                          </div>
                        )}

                        {newTariff.structure === "tiered" && newTariff.tiers.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Rate Tiers</h4>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Tier</TableHead>
                                    <TableHead>Range</TableHead>
                                    <TableHead>Rate</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {newTariff.tiers.map((tier, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                        {tier.min} - {tier.max !== null ? tier.max : "∞"} {tier.unit}
                                      </TableCell>
                                      <TableCell>
                                        ${tier.rate.toFixed(4)} per {tier.unit}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}

                        {newTariff.fixedCharges.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Fixed Charges</h4>
                            <div className="space-y-1">
                              {newTariff.fixedCharges.map((charge, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{charge.name}</span>
                                  <span>${charge.amount.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {newTariff.taxes.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Taxes & Fees</h4>
                            <div className="space-y-1">
                              {newTariff.taxes.map((tax, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{tax.name}</span>
                                  <span>{tax.type === "percentage" ? `${tax.rate}%` : `$${tax.rate.toFixed(2)}`}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateTariffDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateTariff}
                        disabled={!newTariff.name || !newTariff.effectiveDate || !newTariff.expiryDate}
                      >
                        Create Tariff
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
