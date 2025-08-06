import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { Heart, Sparkles, Users, Gift } from 'lucide-react';

interface InvitationTemplate {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    preview_image: string;
    [key: string]: unknown;
}

interface Props {
    templates?: InvitationTemplate[];
    [key: string]: unknown;
}

export default function Welcome({ templates = [] }: Props) {
    const handleBrowseTemplates = () => {
        router.get(route('templates.index'));
    };

    const handleLogin = () => {
        router.get(route('login'));
    };

    const handleRegister = () => {
        router.get(route('register'));
    };

    const handleTemplateClick = (templateId: number) => {
        router.get(route('templates.show', templateId));
    };

    const categoryEmojis: Record<string, string> = {
        wedding: '💒',
        birthday: '🎂',
        anniversary: '💕',
        baby_shower: '👶',
        graduation: '🎓',
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold text-gray-900 mb-6">
                            💌 Digital Invitations
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Create stunning, personalized digital invitations for your special moments. 
                            From weddings to birthdays, make every celebration memorable with our beautiful templates.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Button 
                                onClick={handleBrowseTemplates}
                                size="lg"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Browse Templates
                            </Button>
                            <Button 
                                onClick={handleLogin}
                                variant="outline"
                                size="lg"
                                className="px-8 py-3 rounded-full border-2 border-purple-300 hover:bg-purple-50"
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={handleRegister}
                                variant="outline"
                                size="lg"
                                className="px-8 py-3 rounded-full border-2 border-pink-300 hover:bg-pink-50"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
                            <p className="text-gray-600">Choose from our collection of professionally designed templates for every occasion</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
                            <p className="text-gray-600">Personalize every detail - names, dates, venues, photos, and guest lists</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Complete Package</h3>
                            <p className="text-gray-600">Include RSVP tracking, gift registry details, and interactive maps</p>
                        </div>
                    </div>

                    {/* Featured Templates */}
                    {templates.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-4xl font-bold text-center mb-12">✨ Featured Templates</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {templates.map((template) => (
                                    <Card 
                                        key={template.id} 
                                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => handleTemplateClick(template.id)}
                                    >
                                        <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                            <div className="text-4xl">
                                                {categoryEmojis[template.category] || '🎉'}
                                            </div>
                                        </div>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-lg">{template.name}</CardTitle>
                                                <Badge variant="secondary" className="capitalize">
                                                    {template.category.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-sm">
                                                {template.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="pt-0">
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-2xl font-bold text-purple-600">
                                                    ${template.price}
                                                </span>
                                                <Button 
                                                    size="sm"
                                                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTemplateClick(template.id);
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                            
                            <div className="text-center mt-8">
                                <Button 
                                    onClick={handleBrowseTemplates}
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-3 rounded-full"
                                >
                                    View All Templates
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* How It Works */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
                        <h2 className="text-4xl font-bold text-center mb-12">🚀 How It Works</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    1
                                </div>
                                <h3 className="font-semibold mb-2">Choose Template</h3>
                                <p className="text-sm text-gray-600">Browse and select your perfect invitation template</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    2
                                </div>
                                <h3 className="font-semibold mb-2">Customize</h3>
                                <p className="text-sm text-gray-600">Add your event details, photos, and guest list</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    3
                                </div>
                                <h3 className="font-semibold mb-2">Pay & Confirm</h3>
                                <p className="text-sm text-gray-600">Complete payment via bank transfer</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    4
                                </div>
                                <h3 className="font-semibold mb-2">Share & Enjoy</h3>
                                <p className="text-sm text-gray-600">Receive your digital invitation and share with guests</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-12">
                        <h2 className="text-3xl font-bold mb-4">Ready to Create Your Perfect Invitation? 💫</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Join thousands of satisfied customers who made their events unforgettable
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                onClick={handleRegister}
                                size="lg"
                                variant="secondary"
                                className="px-8 py-3 rounded-full bg-white text-purple-600 hover:bg-gray-100"
                            >
                                Get Started Free
                            </Button>
                            <Button 
                                onClick={handleBrowseTemplates}
                                size="lg"
                                variant="outline"
                                className="px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-purple-600"
                            >
                                Explore Templates
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}