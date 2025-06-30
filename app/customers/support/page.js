"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Search,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  FileText,
  Video,
  Download,
  Send,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

export default function HelpAndSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFeedbackSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => setFeedbackSubmitted(false), 3000)
    }, 500)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to your questions and get the support you need</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for help topics, FAQs, or articles..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faq">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="troubleshoot">Troubleshooting</TabsTrigger>
          <TabsTrigger value="status">Service Status</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        {/* FAQ Section */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about our services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Billing & Payments</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>How do I pay my bill online?</AccordionTrigger>
                      <AccordionContent>
                        To pay your bill online, log in to your account, navigate to the Bills section, select the bill
                        you want to pay, choose your payment method, and follow the instructions to complete the
                        payment. We accept credit/debit cards and bank transfers.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-2">
                      <AccordionTrigger>Why is my bill higher than usual?</AccordionTrigger>
                      <AccordionContent>
                        Your bill may be higher due to increased usage, seasonal changes, rate adjustments, or estimated
                        readings. You can view your usage history in your account to compare with previous periods. If
                        you believe there&apos;s an error, please contact customer support.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-3">
                      <AccordionTrigger>How can I set up automatic payments?</AccordionTrigger>
                      <AccordionContent>
                        To set up automatic payments, go to your Profile page, select the Billing Preferences tab, and
                        choose &lsquo;Set up automatic payments.&rsquo; You&apos;ll need to provide your payment method details and
                        select when you want payments to be processed.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-4">
                      <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                      <AccordionContent>
                        We accept various payment methods including credit/debit cards (Visa, Mastercard, American
                        Express), bank transfers, and electronic checks. You can manage your payment methods in your
                        account settings.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Account Management</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-5">
                      <AccordionTrigger>How do I update my contact information?</AccordionTrigger>
                      <AccordionContent>
                        You can update your contact information by going to your Profile page and selecting the Personal
                        Information tab. From there, you can edit your name, email address, phone number, and mailing
                        address.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-6">
                      <AccordionTrigger>What should I do if I&apos;m moving?</AccordionTrigger>
                      <AccordionContent>
                        If you&apos;re moving, please contact customer support at least 5 business days before your move
                        date. You&apos;ll need to provide your new address, move date, and whether you want to transfer or
                        close your account.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-7">
                      <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                      <AccordionContent>
                        To reset your password, click on the &lsquo;Forgot Password&rsquo; link on the login page. Enter the email
                        address associated with your account, and we&apos;ll send you instructions to reset your password.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-8">
                      <AccordionTrigger>Can I have multiple service addresses on one account?</AccordionTrigger>
                      <AccordionContent>
                        Yes, you can have multiple service addresses linked to your account. Contact customer support to
                        add additional service addresses to your existing account.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Services & Usage</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-9">
                      <AccordionTrigger>How is my usage calculated?</AccordionTrigger>
                      <AccordionContent>
                        Your usage is calculated based on meter readings. For electricity, it&apos;s measured in
                        kilowatt-hours (kWh), and for water, it&apos;s measured in gallons or cubic feet. Your bill is
                        calculated by applying the appropriate tariff rates to your usage.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-10">
                      <AccordionTrigger>What should I do during a service outage?</AccordionTrigger>
                      <AccordionContent>
                        During a service outage, check our Service Status page for updates. Report the outage through
                        your account or by calling our emergency line. Keep refrigerators closed, unplug sensitive
                        electronics, and follow safety guidelines until service is restored.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-11">
                      <AccordionTrigger>How can I reduce my utility bills?</AccordionTrigger>
                      <AccordionContent>
                        To reduce your utility bills, consider energy-efficient appliances, LED lighting, proper
                        insulation, smart thermostats, water-saving fixtures, and being mindful of your usage habits.
                        Check our Knowledge Base for more energy and water-saving tips.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-12">
                      <AccordionTrigger>How do I submit a meter reading?</AccordionTrigger>
                      <AccordionContent>
                        You can submit a meter reading through your account by going to the Profile page, selecting the
                        Service Requests tab, and choosing &lsquo;Submit Meter Reading.&rsquo; Follow the instructions to enter your
                        current meter reading.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Website & Technical</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-13">
                      <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                      <AccordionContent>
                        Our website supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best
                        experience, we recommend keeping your browser updated to the latest version.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-14">
                      <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                      <AccordionContent>
                        Yes, we use industry-standard encryption and security protocols to protect your payment
                        information. We are PCI DSS compliant and do not store your full credit card details on our
                        servers.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-15">
                      <AccordionTrigger>Can I use the website on my mobile device?</AccordionTrigger>
                      <AccordionContent>
                        Yes, our website is fully responsive and works on smartphones and tablets. For an enhanced
                        mobile experience, you can also download our mobile app from the App Store or Google Play Store.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-16">
                      <AccordionTrigger>How do I enable notifications?</AccordionTrigger>
                      <AccordionContent>
                        To enable notifications, go to the Notifications page in your account settings. There, you can
                        choose which types of notifications you want to receive and your preferred delivery methods
                        (email, SMS, or push notifications).
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Contact our customer support team for assistance.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Contact Us Section */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Customer Support</CardTitle>
              <CardDescription>Get in touch with our support team through your preferred channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Phone Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>General Inquiries:</strong> (555) 123-4567
                      </p>
                      <p>
                        <strong>Billing Support:</strong> (555) 123-4568
                      </p>
                      <p>
                        <strong>Technical Support:</strong> (555) 123-4569
                      </p>
                      <p>
                        <strong>Emergency Line:</strong> (555) 123-4570
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Monday - Friday: 8:00 AM - 8:00 PM</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Saturday: 9:00 AM - 5:00 PM</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Sunday: Closed (Emergency line available 24/7)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Email Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>General Inquiries:</strong> info@utilitydistrict.com
                      </p>
                      <p>
                        <strong>Billing Support:</strong> billing@utilitydistrict.com
                      </p>
                      <p>
                        <strong>Technical Support:</strong> tech@utilitydistrict.com
                      </p>
                      <p>
                        <strong>Customer Feedback:</strong> feedback@utilitydistrict.com
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Response time: Within 24-48 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Live Chat</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        Chat with our support team in real-time for immediate assistance with your questions or issues.
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Available Monday - Friday: 8:00 AM - 8:00 PM</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Saturday: 9:00 AM - 5:00 PM</p>
                      </div>
                      <Badge
                        variant={chatOpen ? "destructive" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setChatOpen(!chatOpen)}
                      >
                        {chatOpen ? "End Chat" : "Start Chat"}
                      </Badge>
                      {chatOpen && (
                        <div className="border rounded-md p-4 mt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                              <AvatarFallback>SA</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Sarah from Customer Support</p>
                              <p className="text-xs text-muted-foreground">Online</p>
                            </div>
                          </div>
                          <div className="bg-muted p-2 rounded-md text-sm mb-2">Hello! How can I help you today?</div>
                          <div className="flex gap-2">
                            <Input placeholder="Type your message..." className="text-sm" />
                            <Button size="sm">Send</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">In-Person Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Main Office:</strong>
                      </p>
                      <p>123 Utility Drive</p>
                      <p>Cityville, State 12345</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      </div>
                      <p>
                        <strong>Branch Office:</strong>
                      </p>
                      <p>456 Service Road</p>
                      <p>Townsburg, State 67890</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                For emergencies outside of business hours, please call our 24/7 emergency line at (555) 123-4570.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Knowledge Base Section */}
        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Explore our guides, tutorials, and resources to help you get the most out of our services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="services">Services & Usage</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search knowledge base..." className="pl-10" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Featured Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Understanding Your Bill</CardTitle>
                        <CardDescription>Learn how to read and understand your utility bill</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>Article • 5 min read</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Setting Up Automatic Payments</CardTitle>
                        <CardDescription>Step-by-step guide to setting up automatic bill payments</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Video className="h-4 w-4" />
                          <span>Video Tutorial • 3 min</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Watch Tutorial
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Energy Saving Tips</CardTitle>
                        <CardDescription>Practical tips to reduce your energy consumption</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Download className="h-4 w-4" />
                          <span>PDF Guide • 12 pages</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Download Guide
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">All Articles</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        title: "How to Update Your Contact Information",
                        category: "Account Management",
                        type: "Article",
                        time: "3 min read",
                      },
                      {
                        title: "Understanding Different Payment Methods",
                        category: "Billing & Payments",
                        type: "Article",
                        time: "4 min read",
                      },
                      {
                        title: "Reporting a Service Outage",
                        category: "Services & Usage",
                        type: "Video Tutorial",
                        time: "2 min",
                      },
                      {
                        title: "How to Read Your Water Meter",
                        category: "Services & Usage",
                        type: "Article",
                        time: "5 min read",
                      },
                      {
                        title: "Troubleshooting Login Issues",
                        category: "Technical Support",
                        type: "Article",
                        time: "3 min read",
                      },
                      {
                        title: "Understanding Tariff Structures",
                        category: "Billing & Payments",
                        type: "Article",
                        time: "6 min read",
                      },
                      {
                        title: "Water Conservation Tips",
                        category: "Services & Usage",
                        type: "PDF Guide",
                        time: "10 pages",
                      },
                      {
                        title: "Setting Up Paperless Billing",
                        category: "Account Management",
                        type: "Video Tutorial",
                        time: "3 min",
                      },
                    ].map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{article.title}</span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <span>•</span>
                            <span>
                              {article.type} • {article.time}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  3
                </Button>
              </div>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Troubleshooting Section */}
        <TabsContent value="troubleshoot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Guides</CardTitle>
              <CardDescription>
                Find solutions to common issues with our step-by-step troubleshooting guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Payment Issues</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="payment-1">
                          <AccordionTrigger>Payment Failed or Declined</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Check that your payment method details are correct and up-to-date.</li>
                              <li>Verify that your card has sufficient funds or credit available.</li>
                              <li>Ensure your card hasn&apos;t expired or been blocked by your bank.</li>
                              <li>Try using a different payment method if available.</li>
                              <li>Contact your bank to see if they&apos;re blocking the transaction.</li>
                              <li>If the issue persists, contact our customer support for assistance.</li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="payment-2">
                          <AccordionTrigger>Payment Made But Not Reflected</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Wait 24-48 hours as payments may take time to process.</li>
                              <li>Check your email for a payment confirmation.</li>
                              <li>Verify the payment in your bank or credit card statement.</li>
                              <li>Check your payment history in your account.</li>
                              <li>
                                If you have a confirmation but the payment isn&apos;t reflected, contact customer support
                                with your payment confirmation details.
                              </li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="payment-3">
                          <AccordionTrigger>Automatic Payment Not Working</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Check that your automatic payment is properly set up in your account settings.</li>
                              <li>Verify that your payment method is valid and up-to-date.</li>
                              <li>Ensure there are sufficient funds in your account on the payment date.</li>
                              <li>Check your notification settings to make sure you&apos;re receiving payment alerts.</li>
                              <li>Try disabling and re-enabling automatic payments.</li>
                              <li>If the issue persists, contact customer support for assistance.</li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Login Problems</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="login-1">
                          <AccordionTrigger>Forgot Password</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Click on the &lsquo;Forgot Password&rsquo; link on the login page.</li>
                              <li>Enter the email address associated with your account.</li>
                              <li>Check your email (including spam/junk folders) for password reset instructions.</li>
                              <li>Follow the link in the email to create a new password.</li>
                              <li>Ensure your new password meets our security requirements.</li>
                              <li>If you don&apos;t receive the email within 15 minutes, try requesting another reset.</li>
                              <li>If you still have issues, contact customer support for assistance.</li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="login-2">
                          <AccordionTrigger>Account Locked</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>
                                Accounts are automatically locked after multiple failed login attempts for security
                                reasons.
                              </li>
                              <li>Wait 30 minutes for the account to automatically unlock.</li>
                              <li>Use the &lsquo;Forgot Password&rsquo; option to reset your password.</li>
                              <li>Check your email for any security notifications about your account.</li>
                              <li>
                                If you believe your account was locked in error or you can&apos;t wait, contact customer
                                support for immediate assistance.
                              </li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="login-3">
                          <AccordionTrigger>Two-Factor Authentication Issues</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Ensure your device&apos;s date and time are set correctly.</li>
                              <li>If using an authenticator app, verify it&apos;s properly synced.</li>
                              <li>
                                For SMS verification, check that your phone number is correct in your account settings.
                              </li>
                              <li>Try requesting a new verification code.</li>
                              <li>
                                If you&apos;ve lost access to your authentication device, use your backup codes if available.
                              </li>
                              <li>
                                If you can&apos;t access your account, contact customer support with proof of identity for
                                assistance.
                              </li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Bill Discrepancies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="bill-1">
                          <AccordionTrigger>Unusually High Bill</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Check your usage history to compare with previous periods.</li>
                              <li>Verify if the bill is based on an actual meter reading or an estimate.</li>
                              <li>
                                Look for any changes in your household that might have increased usage (new appliances,
                                more people, seasonal changes).
                              </li>
                              <li>
                                Check for water leaks or electrical issues that might cause increased consumption.
                              </li>
                              <li>Verify if there have been any rate changes or additional fees applied.</li>
                              <li>
                                If you believe there&apos;s an error, contact customer support with your meter readings and
                                details of your concern.
                              </li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="bill-2">
                          <AccordionTrigger>Incorrect Meter Reading</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Check your meter and compare it with the reading on your bill.</li>
                              <li>Take a photo of your meter for documentation.</li>
                              <li>Submit your current meter reading through your account.</li>
                              <li>Contact customer support with your meter reading and photos.</li>
                              <li>Request a meter re-read or inspection if necessary.</li>
                              <li>If confirmed incorrect, your bill will be adjusted accordingly.</li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="bill-3">
                          <AccordionTrigger>Missing or Duplicate Charges</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Review your bill details carefully to identify specific charges in question.</li>
                              <li>Compare with previous bills to identify patterns or discrepancies.</li>
                              <li>Check your payment history to ensure all payments have been properly applied.</li>
                              <li>For duplicate charges, gather documentation of both charges.</li>
                              <li>
                                Contact customer support with specific details about the missing or duplicate charges.
                              </li>
                              <li>If confirmed, adjustments will be made to your account.</li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Service Interruptions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="service-1">
                          <AccordionTrigger>Power Outage</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Check if the outage affects just your home or the entire neighborhood.</li>
                              <li>Check your circuit breakers or fuses to rule out an internal electrical issue.</li>
                              <li>Check the Service Status page for any reported outages in your area.</li>
                              <li>Report the outage through your account or by calling our emergency line.</li>
                              <li>If available, check the estimated restoration time.</li>
                              <li>
                                Follow safety guidelines during the outage (use flashlights instead of candles, keep
                                refrigerators closed, etc.).
                              </li>
                              <li>
                                If your neighbors have power but you don&apos;t, contact our emergency line immediately.
                              </li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="service-2">
                          <AccordionTrigger>Water Service Interruption</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>
                                Check if the water interruption affects just your home or the entire neighborhood.
                              </li>
                              <li>Check your main water valve to ensure it&apos;s fully open.</li>
                              <li>
                                Check the Service Status page for any reported water service interruptions in your area.
                              </li>
                              <li>
                                Report the interruption through your account or by calling our customer service line.
                              </li>
                              <li>If available, check the estimated restoration time.</li>
                              <li>
                                Prepare by storing some water for essential needs if the interruption is expected to
                                last more than a few hours.
                              </li>
                              <li>
                                If your neighbors have water but you don&apos;t, check for frozen pipes (in winter) or
                                contact a plumber to check for internal issues.
                              </li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="service-3">
                          <AccordionTrigger>Planned Service Maintenance</AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Planned maintenance is usually announced in advance through notifications.</li>
                              <li>Check your email, SMS, or account notifications for maintenance announcements.</li>
                              <li>Check the Service Status page for details about the maintenance schedule.</li>
                              <li>
                                Prepare accordingly by storing water or charging devices before electrical maintenance.
                              </li>
                              <li>
                                If the maintenance is causing unexpected issues or lasting longer than announced,
                                contact customer support.
                              </li>
                              <li>
                                After maintenance is complete, check your services to ensure everything is working
                                properly.
                              </li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Need More Help?</h3>
                  <p className="mb-4">
                    If you couldn&apos;t find a solution to your issue, our customer support team is ready to assist you.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Support
                    </Button>
                    <Button variant="secondary">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Support
                    </Button>
                    <Button variant="secondary">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Live Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Status Section */}
        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>
                Check the current status of our services and view any ongoing or scheduled maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Website & Customer Portal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-500">Operational</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Last updated: Today, 1:30 PM</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Payment Processing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-500">Operational</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Last updated: Today, 1:30 PM</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Notification System</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        <span className="font-medium text-amber-500">Partial Outage</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Last updated: Today, 12:45 PM</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Notification System Partial Outage</AlertTitle>
                  <AlertDescription>
                    SMS notifications are currently delayed due to an issue with our service provider. Email
                    notifications are working normally. Our team is working to resolve this issue as quickly as
                    possible.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="text-lg font-medium mb-4">Scheduled Maintenance</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <h4 className="font-medium">System Upgrade</h4>
                        </div>
                        <Badge>Upcoming</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Scheduled for June 15, 2025, 2:00 AM - 5:00 AM
                      </p>
                      <p className="mt-2">
                        We will be performing a system upgrade to improve performance and security. During this time,
                        the website and customer portal will be unavailable. We apologize for any inconvenience.
                      </p>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <h4 className="font-medium">Database Maintenance</h4>
                        </div>
                        <Badge>Upcoming</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Scheduled for June 20, 2025, 1:00 AM - 3:00 AM
                      </p>
                      <p className="mt-2">
                        We will be performing routine database maintenance to optimize performance. During this time,
                        some features may be temporarily unavailable or slower than usual. We apologize for any
                        inconvenience.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Incidents</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium">Payment Processing Delay</h4>
                        </div>
                        <Badge variant="outline">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">June 10, 2025, 9:30 AM - 11:45 AM</p>
                      <div className="mt-2 space-y-2">
                        <div>
                          <p className="text-sm font-medium">11:45 AM - Resolved</p>
                          <p className="text-sm">
                            The issue has been resolved and payment processing is now working normally. All pending
                            payments have been processed.
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">10:15 AM - Investigating</p>
                          <p className="text-sm">
                            We are investigating a delay in payment processing. Some payments may take longer than usual
                            to be confirmed.
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">9:30 AM - Identified</p>
                          <p className="text-sm">
                            We have identified an issue with our payment processor that is causing delays in payment
                            confirmation.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium">Website Accessibility Issues</h4>
                        </div>
                        <Badge variant="outline">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">June 5, 2025, 3:15 PM - 4:30 PM</p>
                      <div className="mt-2 space-y-2">
                        <div>
                          <p className="text-sm font-medium">4:30 PM - Resolved</p>
                          <p className="text-sm">
                            The website is now fully accessible to all users. The issue was resolved by fixing a
                            configuration problem with our content delivery network.
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">3:15 PM - Identified</p>
                          <p className="text-sm">
                            Some users are experiencing difficulty accessing the website. We are investigating the
                            issue.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Stay Updated</h3>
                  <p className="mb-4">
                    Subscribe to receive notifications about service status updates and scheduled maintenance.
                  </p>
                  <div className="flex gap-2">
                    <Input placeholder="Enter your email address" />
                    <Button>Subscribe</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Section */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback and Suggestions</CardTitle>
              <CardDescription>Help us improve our services by sharing your feedback and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackSubmitted ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-700">Thank you for your feedback!</AlertTitle>
                  <AlertDescription className="text-green-600">
                    We appreciate your input and will use it to improve our services.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="feedback-type" className="block text-sm font-medium mb-1">
                        Feedback Type
                      </label>
                      <Select defaultValue="general">
                        <SelectTrigger id="feedback-type">
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Feedback</SelectItem>
                          <SelectItem value="suggestion">Feature Suggestion</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="compliment">Compliment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Brief description of your feedback" />
                    </div>

                    <div>
                      <label htmlFor="feedback" className="block text-sm font-medium mb-1">
                        Your Feedback
                      </label>
                      <Textarea
                        id="feedback"
                        placeholder="Please provide details about your feedback or suggestion..."
                        className="min-h-[150px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="area" className="block text-sm font-medium mb-1">
                        Area of Website
                      </label>
                      <Select defaultValue="all">
                        <SelectTrigger id="area">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Entire Website</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="account">Account Management</SelectItem>
                          <SelectItem value="dashboard">Dashboard</SelectItem>
                          <SelectItem value="notifications">Notifications</SelectItem>
                          <SelectItem value="support">Help & Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="satisfaction" className="block text-sm font-medium mb-1">
                        Overall Satisfaction
                      </label>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex flex-col items-center">
                            <input
                              type="radio"
                              id={`rating-${rating}`}
                              name="satisfaction"
                              value={rating}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="cursor-pointer w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted"
                            >
                              {rating}
                            </label>
                            <span className="text-xs text-muted-foreground mt-1">
                              {rating === 1 ? "Poor" : rating === 5 ? "Excellent" : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium mb-1">
                        Contact Information (Optional)
                      </label>
                      <Input id="contact" placeholder="Email or phone number if you'd like us to follow up" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Other Ways to Provide Feedback</h3>
                    <p className="text-sm text-muted-foreground">
                      You can also share your feedback through these channels:
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Survey
                    </Button>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Need Immediate Assistance?</h3>
        </div>
        <p className="mb-4">
          Our customer support team is available to help you with any questions or issues you may have.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button>
            <Phone className="mr-2 h-4 w-4" />
            Call Us: (555) 123-4567
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Live Chat
          </Button>
        </div>
      </div>
    </div>
  )
}
