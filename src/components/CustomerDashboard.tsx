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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
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
                  Carbon Footprint
                </CardTitle>
                <CardDescription>Embodied carbon emissions from your purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={carbonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Great job!</strong> You've reduced your carbon footprint by 18% this quarter.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sustainability Score</CardTitle>
                <CardDescription>Your eco-friendly shopping rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">84/100</div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Eco-Champion
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sustainable Products</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Local Brands</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Minimal Packaging</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
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
                <CardTitle>AI Predictions</CardTitle>
                <CardDescription>What you might need next based on your patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Coffee Pods</div>
                      <div className="text-sm text-muted-foreground">Usually ordered monthly</div>
                    </div>
                    <Badge>3 days</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Phone Charger</div>
                      <div className="text-sm text-muted-foreground">Based on usage patterns</div>
                    </div>
                    <Badge variant="secondary">1 week</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Winter Jacket</div>
                      <div className="text-sm text-muted-foreground">Seasonal recommendation</div>
                    </div>
                    <Badge variant="outline">2 weeks</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Forecast</CardTitle>
                <CardDescription>Predicted spending for next month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold mb-2">$425</div>
                  <p className="text-sm text-muted-foreground">Estimated spending</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Electronics</span>
                    <span>$180</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fashion</span>
                    <span>$120</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home & Garden</span>
                    <span>$85</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Health & Beauty</span>
                    <span>$40</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Based on your purchase history and seasonal trends
                  </p>
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