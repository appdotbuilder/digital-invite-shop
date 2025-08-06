import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { Plus, Eye, Calendar, DollarSign, Users, FileText } from 'lucide-react';

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
    invitation_template: {
        id: number;
        name: string;
        category: string;
    };
    customization_data: {
        bride_name?: string;
        groom_name?: string;
        event_date?: string;
        [key: string]: unknown;
    };
}

interface Props {
    recentOrders: Order[];
    [key: string]: unknown;
}

export default function Dashboard({ recentOrders }: Props) {
    const handleCreateOrder = () => {
        router.get(route('orders.create'));
    };

    const handleViewAllOrders = () => {
        router.get(route('orders.index'));
    };

    const handleViewOrder = (orderId: number) => {
        router.get(route('orders.show', orderId));
    };

    const handleBrowseTemplates = () => {
        router.get(route('templates.index'));
    };

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            payment_pending: 'bg-blue-100 text-blue-800',
            paid: 'bg-green-100 text-green-800',
            completed: 'bg-purple-100 text-purple-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const categoryEmojis: Record<string, string> = {
        wedding: '💒',
        birthday: '🎂',
        anniversary: '💕',
        baby_shower: '👶',
        graduation: '🎓',
    };

    const quickStats = [
        {
            title: 'Total Orders',
            value: recentOrders.length,
            icon: FileText,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
        },
        {
            title: 'Active Orders',
            value: recentOrders.filter(order => ['pending', 'payment_pending', 'paid'].includes(order.status)).length,
            icon: Calendar,
            color: 'text-green-600',
            bg: 'bg-green-100',
        },
        {
            title: 'Total Spent',
            value: `$${recentOrders.reduce((sum, order) => sum + parseFloat(order.total_amount.toString()), 0).toFixed(2)}`,
            icon: DollarSign,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
        },
        {
            title: 'Templates Used',
            value: new Set(recentOrders.map(order => order.invitation_template.id)).size,
            icon: Users,
            color: 'text-pink-600',
            bg: 'bg-pink-100',
        },
    ];

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Dashboard</h1>
                        <p className="text-gray-600">Manage your invitations and orders</p>
                    </div>
                    <Button 
                        onClick={handleCreateOrder}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Invitation
                    </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {quickStats.map((stat, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Recent Orders</CardTitle>
                                    <CardDescription>
                                        Your latest invitation orders
                                    </CardDescription>
                                </div>
                                {recentOrders.length > 0 && (
                                    <Button 
                                        variant="outline" 
                                        onClick={handleViewAllOrders}
                                    >
                                        View All
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                {recentOrders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📋</div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            No orders yet
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Create your first invitation to get started
                                        </p>
                                        <Button onClick={handleCreateOrder}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create First Invitation
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                                onClick={() => handleViewOrder(order.id)}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-2xl">
                                                        {categoryEmojis[order.invitation_template.category] || '🎉'}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {order.invitation_template.name}
                                                        </p>
                                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                            <span>{order.order_number}</span>
                                                            <span>•</span>
                                                            <span>
                                                                {order.customization_data.bride_name && order.customization_data.groom_name
                                                                    ? `${order.customization_data.bride_name} & ${order.customization_data.groom_name}`
                                                                    : 'Event Details Pending'
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Badge className={getStatusColor(order.status)}>
                                                        {order.status.replace('_', ' ').toUpperCase()}
                                                    </Badge>
                                                    <span className="font-medium text-gray-900">
                                                        ${order.total_amount}
                                                    </span>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewOrder(order.id);
                                                        }}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>
                                    Common tasks and shortcuts
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button 
                                    onClick={handleCreateOrder}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create New Invitation
                                </Button>
                                <Button 
                                    onClick={handleBrowseTemplates}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Browse Templates
                                </Button>
                                <Button 
                                    onClick={handleViewAllOrders}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    View All Orders
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Help Card */}
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Need Help?</CardTitle>
                                <CardDescription className="text-blue-700">
                                    Get started with your first invitation
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-blue-800">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                        Choose a template
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                        Customize event details
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                        Add your guest list
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                        Complete payment
                                    </li>
                                </ul>
                                <Button 
                                    onClick={handleCreateOrder}
                                    size="sm" 
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                                >
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}