import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, FileText, TrendingUp } from "lucide-react"

export default function HomePage() {
  const states = [
    { name: "Madhya Pradesh", code: "MP", claims: 12450, color: "bg-green-100 text-green-800" },
    { name: "Tripura", code: "TR", claims: 3200, color: "bg-blue-100 text-blue-800" },
    { name: "Odisha", code: "OD", claims: 8900, color: "bg-purple-100 text-purple-800" },
    { name: "Telangana", code: "TG", claims: 6750, color: "bg-orange-100 text-orange-800" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FRA Atlas</h1>
                <p className="text-sm text-muted-foreground">Forest Rights Act Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/atlas">
                <Button>Open Atlas</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">
            Digitize rights. Map realities. Target benefits.
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            AI-powered WebGIS system for monitoring Forest Rights Act implementation across India's tribal regions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/atlas">
              <Button size="lg" className="w-full sm:w-auto">
                <MapPin className="mr-2 h-5 w-5" />
                Open Atlas
              </Button>
            </Link>
            <Link href="/progress">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Progress
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* States Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Focus States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {states.map((state) => (
              <Card key={state.code} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{state.name}</CardTitle>
                    <Badge className={state.color}>{state.code}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Claims</span>
                      <span className="font-medium">{state.claims.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Approved</span>
                      <span className="font-medium text-green-600">
                        {Math.floor(state.claims * 0.65).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-orange-600">
                        {Math.floor(state.claims * 0.35).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">1. Digitize</h4>
              <p className="text-muted-foreground">
                Upload and process FRA documents using AI-powered OCR and field extraction
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">2. Map</h4>
              <p className="text-muted-foreground">
                Geotag parcels and assets using satellite imagery and ground truth data
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">3. Recommend</h4>
              <p className="text-muted-foreground">
                Generate targeted scheme recommendations using decision support algorithms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">FRA Atlas</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/help" className="hover:text-foreground">
                Help
              </Link>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
