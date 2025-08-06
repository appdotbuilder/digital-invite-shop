import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { ArrowLeft, Star, Heart, Share2, Download, Eye, Palette, Users, MapPin, Music, CreditCard } from 'lucide-react';

interface InvitationTemplate {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    preview_image: string;
    template_data: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
        };
        fonts: {
            heading: string;
            body: string;
        };
        layout: string;
        elements: {
            floral: boolean;
            geometric: boolean;
            vintage: boolean;
        };
    };
    [key: string]: unknown;
}

interface Props {
    template: InvitationTemplate;
    [key: string]: unknown;
}

export default function TemplateShow({ template }: Props) {
    const categoryEmojis: Record<string, string> = {
        wedding: '💒',
        birthday: '🎂',
        anniversary: '💕',
        baby_shower: '👶',
        graduation: '🎓',
    };

    const handleBack = () => {
        router.get(route('templates.index'));
    };

    const handleCustomize = () => {
        try {
            router.get(route('orders.create', { template: template.id }));
        } catch {
            // If orders.create route doesn't exist, redirect to login
            router.get(route('login'));
        }
    };

    const features = [
        { icon: Palette, label: 'Custom Colors', description: 'Personalize with your favorite colors' },
        { icon: Users, label: 'Guest Management', description: 'Add and manage your guest list' },
        { icon: MapPin, label: 'Location Details', description: 'Include venue and map integration' },
        { icon: Music, label: 'Background Music', description: 'Add ambiance with music selection' },
        { icon: CreditCard, label: 'Gift Registry', description: 'Include bank details for gifts' },
        { icon: Eye, label: 'RSVP Tracking', description: 'Track guest responses easily' },
    ];

    const elements = [];
    if (template.template_data.elements.floral) elements.push('🌸 Floral');
    if (template.template_data.elements.geometric) elements.push('📐 Geometric');
    if (template.template_data.elements.vintage) elements.push('✨ Vintage');

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
                </Button>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Template Preview */}
                    <div className="space-y-6">
                        <Card className="overflow-hidden">
                            <div className="aspect-[4/5] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative">
                                <div className="text-8xl">
                                    {categoryEmojis[template.category] || '🎉'}
                                </div>
                                <Badge 
                                    className="absolute top-4 left-4 capitalize"
                                    variant="secondary"
                                >
                                    {template.category.replace('_', ' ')}
                                </Badge>
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Color Palette */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                    <Palette className="w-5 h-5 mr-2" />
                                    Color Palette
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex space-x-4">
                                    <div className="text-center">
                                        <div 
                                            className="w-12 h-12 rounded-full border-2 border-gray-200 mb-2"
                                            style={{ backgroundColor: template.template_data.colors.primary }}
                                        ></div>
                                        <p className="text-xs text-gray-600">Primary</p>
                                    </div>
                                    <div className="text-center">
                                        <div 
                                            className="w-12 h-12 rounded-full border-2 border-gray-200 mb-2"
                                            style={{ backgroundColor: template.template_data.colors.secondary }}
                                        ></div>
                                        <p className="text-xs text-gray-600">Secondary</p>
                                    </div>
                                    <div className="text-center">
                                        <div 
                                            className="w-12 h-12 rounded-full border-2 border-gray-200 mb-2"
                                            style={{ backgroundColor: template.template_data.colors.accent }}
                                        ></div>
                                        <p className="text-xs text-gray-600">Accent</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Template Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{template.name}</h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <span className="text-gray-600">(4.9/5 - 127 reviews)</span>
                            </div>
                            <p className="text-gray-600 text-lg mb-6">{template.description}</p>
                            
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-4xl font-bold text-purple-600">${template.price}</span>
                                <div className="space-x-3">
                                    <Button 
                                        variant="outline"
                                        size="lg"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Preview
                                    </Button>
                                    <Button 
                                        onClick={handleCustomize}
                                        size="lg"
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8"
                                    >
                                        Customize Now
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Template Specs */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Template Specifications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-900">Category</p>
                                        <p className="text-gray-600 capitalize">{template.category.replace('_', ' ')}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Layout Style</p>
                                        <p className="text-gray-600 capitalize">{template.template_data.layout}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Heading Font</p>
                                        <p className="text-gray-600">{template.template_data.fonts.heading}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Body Font</p>
                                        <p className="text-gray-600">{template.template_data.fonts.body}</p>
                                    </div>
                                </div>
                                
                                {elements.length > 0 && (
                                    <div>
                                        <p className="font-medium text-gray-900 mb-2">Design Elements</p>
                                        <div className="flex flex-wrap gap-2">
                                            {elements.map((element, index) => (
                                                <Badge key={index} variant="outline">
                                                    {element}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card>
                            <CardHeader>
                                <CardTitle>What's Included</CardTitle>
                                <CardDescription>
                                    Everything you need to create the perfect invitation
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="bg-purple-100 p-2 rounded-lg">
                                                <feature.icon className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{feature.label}</p>
                                                <p className="text-xs text-gray-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Call to Action */}
                        <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                            <CardContent className="p-6 text-center">
                                <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
                                <p className="mb-4 opacity-90">
                                    Create your personalized invitation in minutes
                                </p>
                                <Button 
                                    onClick={handleCustomize}
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-purple-600 hover:bg-gray-100"
                                >
                                    Start Customizing - ${template.price}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}