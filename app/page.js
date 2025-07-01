import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Droplets, CreditCard, Shield, Clock, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">UtilityPay</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {/* <Link href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link> */}
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Trusted by 10,000+ Customers
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Pay Your Utility Bills
            <span className="text-blue-600 block">Online with Ease</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your electricity and water bills in one convenient platform. View usage, pay bills, and track your
            consumption history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Customer Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive utility bill management for both customers and administrators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Electricity Bills</CardTitle>
                <CardDescription>View and pay your electricity bills with detailed usage breakdown</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Droplets className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Water Bills</CardTitle>
                <CardDescription>Manage your water utility bills and monitor consumption patterns</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>Multiple payment options with bank-level security and encryption</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>24/7 Access</CardTitle>
                <CardDescription>Pay your bills anytime, anywhere with our responsive platform</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Data Security</CardTitle>
                <CardDescription>
                  Your personal and payment information is protected with advanced security
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Comprehensive management tools for utility administrators</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who have simplified their utility bill management.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">UtilityPay</span>
              </div>
              <p className="text-gray-400">Simplifying utility bill management for everyone.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Electricity Bills</li>
                <li>Water Bills</li>
                <li>Payment Processing</li>
                <li>Usage Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>System Status</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@utilitypay.com</li>
                <li>1-800-UTILITY</li>
                <li>Mon-Fri 8AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UtilityPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
