import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Package, TrendingUp, Leaf, Calendar, DollarSign, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data
const orderHistory = [
  { id: "1", date: "2024-01-15", items: 3, total: 299.99, status: "Delivered" },
  { id: "2", date: "2024-01-08", items: 1, total: 49.99, status: "Delivered" },
  { id: "3", date: "2023-12-20", items: 5, total: 899.99, status: "Delivered" },
  { id: "4", date: "2023-12-10", items: 2, total: 199.99, status: "Delivered" },
];

const spendingData = [
  { month: "Jan", amount: 450 },
  { month: "Feb", amount: 320 },
  { month: "Mar", amount: 680 },
  { month: "Apr", amount: 290 },
  { month: "May", amount: 590 },
  { month: "Jun", amount: 410 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#3b82f6" },
  { name: "Fashion", value: 25, color: "#ef4444" },
  { name: "Home", value: 20, color: "#10b981" },
  { name: "Health", value: 12, color: "#f59e0b" },
  { name: "Books", value: 8, color: "#8b5cf6" },
];

const carbonData = [
  { month: "Jan", emissions: 12.5 },
  { month: "Feb", emissions: 8.2 },
  { month: "Mar", emissions: 15.8 },
  { month: "Apr", emissions: 6.1 },
  { month: "May", emissions: 11.3 },
  { month: "Jun", emissions: 9.7 },
];

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orderHistory.length;
  const avgOrderValue = totalSpent / totalOrders;
  const totalItems = orderHistory.reduce((sum, order) => sum + order.items, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
        <p className="text-muted-foreground">
          Insights, analytics, and personalized reports for your shopping experience
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">+340 this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
                <CardDescription>Your purchase patterns over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Purchase Categories</CardTitle>
                <CardDescription>Distribution of your purchases by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your order history and tracking information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.date}</div>
                      <div className="text-sm">{order.items} items</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-semibold">${order.total.toFixed(2)}</div>
                      <Badge variant="secondary">{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shopping Frequency</CardTitle>
                <CardDescription>How often you make purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Weekly Average</span>
                    <span className="font-semibold">1.2 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Average</span>
                    <span className="font-semibold">5.1 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Peak Shopping Day</span>
                    <span className="font-semibold">Sunday</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Preferred Time</span>
                    <span className="font-semibold">Evening</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings & Rewards</CardTitle>
                <CardDescription>Money saved and rewards earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Total Saved</span>
                      <span className="font-semibold text-green-600">$234.50</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">75% more than average customer</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Cashback Earned</span>
                      <span className="font-semibold">$87.30</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Next tier at $150</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Embodied Carbon Emissions
                </CardTitle>
                <CardDescription>Intensity measured by kgCO₂e/m² - Environmental impact tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-gray-400 border-dashed border-t-2"></div>
                      <span className="text-xs">500 kgCO₂e/m² - Target 2030</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-gray-600"></div>
                      <span className="text-xs">600 kgCO₂e/m² - Target 2025</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { month: "Jan", emissions: 549, target2030: 500, target2025: 600 },
                    { month: "Feb", emissions: 278, target2030: 500, target2025: 600 },
                    { month: "Mar", emissions: 875, target2030: 500, target2025: 600 },
                    { month: "Apr", emissions: 617, target2030: 500, target2025: 600 },
                    { month: "May", emissions: 506, target2030: 500, target2025: 600 },
                    { month: "Jun", emissions: 36, target2030: 500, target2025: 600 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} kgCO₂e/m²`, 'Emissions']} />
                    <Bar dataKey="emissions" fill="#a16f5e" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Carbon Impact:</strong> You're 18% below the 2025 target this quarter.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carbon Reduction Goals</CardTitle>
                <CardDescription>Track progress towards emission targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>2025 Target Progress</span>
                      <span className="font-semibold text-green-600">82%</span>
                    </div>
                    <Progress value={82} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">600 kgCO₂e/m² target</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>2030 Target Progress</span>
                      <span className="font-semibold text-orange-600">64%</span>
                    </div>
                    <Progress value={64} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">500 kgCO₂e/m² target</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">-18%</div>
                      <div className="text-xs text-green-800">Below 2025 Target</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">127</div>
                      <div className="text-xs text-blue-800">Days Ahead</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Online Charging System</CardTitle>
                <CardDescription>AI-powered insights that predict customer needs and drive personalized experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <Badge variant="outline" className="justify-center bg-red-50 text-red-700">BILLING</Badge>
                    <Badge variant="outline" className="justify-center bg-yellow-50 text-yellow-700">CHARGING</Badge>
                    <Badge variant="outline" className="justify-center bg-green-50 text-green-700">CATALOG</Badge>
                    <Badge variant="outline" className="justify-center bg-cyan-50 text-cyan-700">EVENTS</Badge>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold">€8.00</div>
                      <div className="text-sm text-muted-foreground">Current session charge</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Session Duration</span>
                        <span>2h 15m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Data Usage</span>
                        <span>1.2 GB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Premium Features</span>
                        <span>Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Analytics</CardTitle>
                <CardDescription>Real-time charging insights and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={[
                    { hour: "0", usage: 2.1, cost: 3.2 },
                    { hour: "4", usage: 1.8, cost: 2.9 },
                    { hour: "8", usage: 4.2, cost: 6.1 },
                    { hour: "12", usage: 5.8, cost: 8.0 },
                    { hour: "16", usage: 3.9, cost: 5.2 },
                    { hour: "20", usage: 2.3, cost: 3.8 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="usage" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">€24.50</div>
                    <div className="text-xs text-blue-800">Today's Total</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">-8%</div>
                    <div className="text-xs text-green-800">vs Yesterday</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>Advanced predictions that drive personalized experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">High Priority Prediction</span>
                    </div>
                    <div className="font-semibold">Coffee Pods Reorder</div>
                    <div className="text-sm text-muted-foreground">AI detected 94% probability of need in 3 days</div>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">3 days</Badge>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Behavioral Insight</span>
                    </div>
                    <div className="font-semibold">Phone Charger Replacement</div>
                    <div className="text-sm text-muted-foreground">Usage pattern analysis suggests imminent failure</div>
                    <Badge variant="secondary" className="mt-2">1 week</Badge>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Seasonal Forecast</span>
                    </div>
                    <div className="font-semibold">Winter Apparel</div>
                    <div className="text-sm text-muted-foreground">Weather data indicates early preparation needed</div>
                    <Badge variant="outline" className="mt-2">2 weeks</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Budget Forecasting</CardTitle>
                <CardDescription>AI-driven spending predictions with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold mb-2">$425</div>
                  <p className="text-sm text-muted-foreground">Predicted next month (87% confidence)</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span>Electronics</span>
                    <div className="flex items-center gap-2">
                      <span>$180</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fashion</span>
                    <div className="flex items-center gap-2">
                      <span>$120</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/2 h-2 bg-pink-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Home & Garden</span>
                    <div className="flex items-center gap-2">
                      <span>$85</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/3 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">+12%</div>
                    <div className="text-xs text-blue-800">vs Last Month</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">$67</div>
                    <div className="text-xs text-orange-800">Potential Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;