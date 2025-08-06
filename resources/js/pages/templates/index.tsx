import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Search, Filter, Heart, Star } from 'lucide-react';


interface InvitationTemplate {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    preview_image: string;
    [key: string]: unknown;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedTemplates {
    data: InvitationTemplate[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    templates: PaginatedTemplates;
    [key: string]: unknown;
}

export default function TemplatesIndex({ templates }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categoryEmojis: Record<string, string> = {
        wedding: '💒',
        birthday: '🎂',
        anniversary: '💕',
        baby_shower: '👶',
        graduation: '🎓',
    };

    const categories = [
        { value: 'all', label: '🎨 All Templates' },
        { value: 'wedding', label: '💒 Wedding' },
        { value: 'birthday', label: '🎂 Birthday' },
        { value: 'anniversary', label: '💕 Anniversary' },
        { value: 'baby_shower', label: '👶 Baby Shower' },
        { value: 'graduation', label: '🎓 Graduation' },
    ];

    const handleTemplateClick = (templateId: number) => {
        router.get(route('templates.show', templateId));
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        
        const queryString = params.toString();
        router.get(route('templates.index') + (queryString ? '?' + queryString : ''));
    };

    const handleCreateOrder = (templateId: number) => {
        try {
            router.get(route('orders.create', { template: templateId }));
        } catch {
            // If orders.create route doesn't exist, redirect to login
            router.get(route('login'));
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">🎨 Invitation Templates</h1>
                    <p className="text-gray-600">Choose from our beautiful collection of invitation templates</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button onClick={handleSearch} className="w-full">
                            <Filter className="w-4 h-4 mr-2" />
                            Apply Filters
                        </Button>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        Showing {templates.data.length} of {templates.total} templates
                    </p>
                    <div className="text-sm text-gray-500">
                        Page {templates.current_page} of {templates.last_page}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {templates.data.map((template) => (
                        <Card 
                            key={template.id} 
                            className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
                            onClick={() => handleTemplateClick(template.id)}
                        >
                            <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                                <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                                    {categoryEmojis[template.category] || '🎉'}
                                </div>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg line-clamp-1">{template.name}</CardTitle>
                                    <Badge variant="secondary" className="capitalize text-xs">
                                        {template.category.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <CardDescription className="text-sm line-clamp-2">
                                    {template.description}
                                </CardDescription>
                            </CardHeader>
                            
                            <CardFooter className="pt-0">
                                <div className="w-full space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-purple-600">
                                            ${template.price}
                                        </span>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Button 
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTemplateClick(template.id);
                                            }}
                                        >
                                            Preview
                                        </Button>
                                        <Button 
                                            size="sm"
                                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCreateOrder(template.id);
                                            }}
                                        >
                                            Customize
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {templates.data.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">No templates found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                        <Button 
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                router.get(route('templates.index'));
                            }}
                            variant="outline"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {templates.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-2">
                            {templates.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={link.active ? "bg-purple-600" : ""}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}