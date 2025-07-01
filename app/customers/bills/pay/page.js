"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Droplets, CreditCard, Shield, CheckCircle } from "lucide-react"

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
]

function PayBillsPageInner() {
  const searchParams = useSearchParams()
  const billId = searchParams.get("billId")

  const [selectedBills, setSelectedBills] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    if (billId) {
      setSelectedBills([billId])
    }
  }, [billId])

  const pendingBills = mockBills.filter((bill) => bill.status === "pending")
  const selectedBillsData = pendingBills.filter((bill) => selectedBills.includes(bill.id))
  const totalAmount = selectedBillsData.reduce((sum, bill) => sum + bill.amount, 0)

  const handleBillSelection = (billId, checked) => {
    if (checked) {
      setSelectedBills([...selectedBills, billId])
    } else {
      setSelectedBills(selectedBills.filter((id) => id !== billId))
    }
  }

  const handlePayment = async () => {
    if (selectedBills.length === 0 || !paymentMethod) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
    }, 3000)
  }

  const getTypeIcon = (type) => {
    return type === "electricity" ? (
      <Zap className="h-4 w-4 text-yellow-500" />
    ) : (
      <Droplets className="h-4 w-4 text-blue-500" />
    )
  }

  if (paymentSuccess) {
    return (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
                <p className="text-gray-600">
                  Your payment of ${totalAmount.toFixed(2)} has been processed successfully.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Transaction ID: TXN-{Date.now()}</p>
                  <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline">Download Receipt</Button>
                  <Button asChild>
                    <a href="/dashboard">Back to Dashboard</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    )
  }

  return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pay Bills</h1>
          <p className="text-gray-600">Select bills to pay and choose your payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bill Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Bills to Pay</CardTitle>
              <CardDescription>Choose which bills you want to pay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingBills.map((bill) => (
                <div key={bill.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={bill.id}
                    checked={selectedBills.includes(bill.id)}
                    onCheckedChange={(checked) => handleBillSelection(bill.id, checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(bill.type)}
                        <div>
                          <p className="font-medium">{bill.period}</p>
                          <p className="text-sm text-gray-600">{bill.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${bill.amount.toFixed(2)}</p>
                        <Badge variant="secondary">Due {bill.dueDate}</Badge>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Usage: {bill.usage.toLocaleString()} {bill.unit}
                    </div>
                  </div>
                </div>
              ))}

              {selectedBills.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you want to pay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Select Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="debit-card">Debit Card</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="e-wallet">E-Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your payment information is encrypted and secure. We never store your card details.
                </AlertDescription>
              </Alert>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                disabled={selectedBills.length === 0 || !paymentMethod || isProcessing}
              >
                {isProcessing ? (
                  "Processing Payment..."
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default function PayBillsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayBillsPageInner />
    </Suspense>
  )
}
