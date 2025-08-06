import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { router, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2, Calendar, MapPin, Users, Music, CreditCard, Heart } from 'lucide-react';

interface InvitationTemplate {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    preview_image: string;
}

interface Guest {
    name: string;
    email: string;
    phone: string;
}

interface Props {
    template?: InvitationTemplate;
    templates: InvitationTemplate[];
    [key: string]: unknown;
}

export default function OrderCreate({ template, templates }: Props) {
    const [guests, setGuests] = useState<Guest[]>([{ name: '', email: '', phone: '' }]);
    
    const { data, setData, processing } = useForm({
        invitation_template_id: template?.id || '',
        'customization_data.bride_name': '',
        'customization_data.groom_name': '',
        'customization_data.event_date': '',
        'customization_data.event_time': '',
        'customization_data.venue_name': '',
        'customization_data.venue_address': '',
        'customization_data.google_maps_link': '',
        'customization_data.bride_parents': '',
        'customization_data.groom_parents': '',
        'customization_data.background_music': '',
        'customization_data.bank_account_name': '',
        'customization_data.bank_account_number': '',
        'customization_data.bank_name': '',
    });

    const selectedTemplate = templates.find(t => t.id.toString() === String(data.invitation_template_id));

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

    const handleTemplateChange = (templateId: string) => {
        setData('invitation_template_id', templateId);
    };

    const handleAddGuest = () => {
        const newGuests = [...guests, { name: '', email: '', phone: '' }];
        setGuests(newGuests);
    };

    const handleRemoveGuest = (index: number) => {
        const newGuests = guests.filter((_, i) => i !== index);
        setGuests(newGuests);
    };

    const handleGuestChange = (index: number, field: keyof Guest, value: string) => {
        const newGuests = [...guests];
        newGuests[index] = { ...newGuests[index], [field]: value };
        setGuests(newGuests);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare the data with guest list
        const formData = {
            invitation_template_id: data.invitation_template_id,
            customization_data: JSON.stringify({
                bride_name: data['customization_data.bride_name'],
                groom_name: data['customization_data.groom_name'],
                event_date: data['customization_data.event_date'],
                event_time: data['customization_data.event_time'],
                venue_name: data['customization_data.venue_name'],
                venue_address: data['customization_data.venue_address'],
                google_maps_link: data['customization_data.google_maps_link'],
                bride_parents: data['customization_data.bride_parents'],
                groom_parents: data['customization_data.groom_parents'],
                background_music: data['customization_data.background_music'],
                bank_account_name: data['customization_data.bank_account_name'],
                bank_account_number: data['customization_data.bank_account_number'],
                bank_name: data['customization_data.bank_name'],
            }),
            guest_list: JSON.stringify(guests.filter(guest => guest.name.trim())),
        };
        
        router.post(route('orders.store'), formData);
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
                </Button>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">🎨 Customize Your Invitation</h1>
                    <p className="text-gray-600">Personalize your chosen template with event details</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Template Selection */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Heart className="w-5 h-5 mr-2 text-pink-500" />
                                        Selected Template
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {selectedTemplate ? (
                                        <div className="space-y-4">
                                            <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                                                <div className="text-4xl">
                                                    {categoryEmojis[selectedTemplate.category] || '🎉'}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{selectedTemplate.name}</h3>
                                                <p className="text-gray-600 text-sm mb-2">{selectedTemplate.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <Badge variant="secondary" className="capitalize">
                                                        {selectedTemplate.category.replace('_', ' ')}
                                                    </Badge>
                                                    <span className="text-2xl font-bold text-purple-600">
                                                        ${selectedTemplate.price}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Label htmlFor="template-select">Choose Template *</Label>
                                            <Select 
                                                value={String(data.invitation_template_id)}
                                                onValueChange={handleTemplateChange}
                                            >
                                                <SelectTrigger className="mt-2">
                                                    <SelectValue placeholder="Select a template" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {templates.map((template) => (
                                                        <SelectItem key={template.id} value={template.id.toString()}>
                                                            {categoryEmojis[template.category]} {template.name} - ${template.price}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Customization Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Event Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                                        Event Details
                                    </CardTitle>
                                    <CardDescription>
                                        Basic information about your event
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="bride-name">Bride Name *</Label>
                                        <Input
                                            id="bride-name"
                                            value={data['customization_data.bride_name']}
                                            onChange={(e) => setData('customization_data.bride_name', e.target.value)}
                                            placeholder="Enter bride's name"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="groom-name">Groom Name *</Label>
                                        <Input
                                            id="groom-name"
                                            value={data['customization_data.groom_name']}
                                            onChange={(e) => setData('customization_data.groom_name', e.target.value)}
                                            placeholder="Enter groom's name"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="event-date">Event Date *</Label>
                                        <Input
                                            id="event-date"
                                            type="date"
                                            value={data['customization_data.event_date']}
                                            onChange={(e) => setData('customization_data.event_date', e.target.value)}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="event-time">Event Time *</Label>
                                        <Input
                                            id="event-time"
                                            type="time"
                                            value={data['customization_data.event_time']}
                                            onChange={(e) => setData('customization_data.event_time', e.target.value)}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="bride-parents">Bride's Parents</Label>
                                        <Input
                                            id="bride-parents"
                                            value={data['customization_data.bride_parents']}
                                            onChange={(e) => setData('customization_data.bride_parents', e.target.value)}
                                            placeholder="Mr. & Mrs. Smith"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="groom-parents">Groom's Parents</Label>
                                        <Input
                                            id="groom-parents"
                                            value={data['customization_data.groom_parents']}
                                            onChange={(e) => setData('customization_data.groom_parents', e.target.value)}
                                            placeholder="Mr. & Mrs. Johnson"
                                            className="mt-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Venue Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-green-500" />
                                        Venue Information
                                    </CardTitle>
                                    <CardDescription>
                                        Location details for your event
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="venue-name">Venue Name *</Label>
                                        <Input
                                            id="venue-name"
                                            value={data['customization_data.venue_name']}
                                            onChange={(e) => setData('customization_data.venue_name', e.target.value)}
                                            placeholder="Grand Ballroom"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="venue-address">Venue Address *</Label>
                                        <Textarea
                                            id="venue-address"
                                            value={data['customization_data.venue_address']}
                                            onChange={(e) => setData('customization_data.venue_address', e.target.value)}
                                            placeholder="123 Main Street, City, State 12345"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="google-maps">Google Maps Link</Label>
                                        <Input
                                            id="google-maps"
                                            type="url"
                                            value={data['customization_data.google_maps_link']}
                                            onChange={(e) => setData('customization_data.google_maps_link', e.target.value)}
                                            placeholder="https://maps.google.com/..."
                                            className="mt-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Additional Options */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Music className="w-5 h-5 mr-2 text-purple-500" />
                                        Additional Options
                                    </CardTitle>
                                    <CardDescription>
                                        Extra features for your invitation
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="background-music">Background Music</Label>
                                        <Input
                                            id="background-music"
                                            value={data['customization_data.background_music']}
                                            onChange={(e) => setData('customization_data.background_music', e.target.value)}
                                            placeholder="Canon in D, Ave Maria, etc."
                                            className="mt-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Gift Registry */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2 text-yellow-500" />
                                        Gift Registry
                                    </CardTitle>
                                    <CardDescription>
                                        Bank account details for gifts (optional)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="bank-account-name">Account Holder Name</Label>
                                        <Input
                                            id="bank-account-name"
                                            value={data['customization_data.bank_account_name']}
                                            onChange={(e) => setData('customization_data.bank_account_name', e.target.value)}
                                            placeholder="John & Jane Smith"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="bank-name">Bank Name</Label>
                                        <Input
                                            id="bank-name"
                                            value={data['customization_data.bank_name']}
                                            onChange={(e) => setData('customization_data.bank_name', e.target.value)}
                                            placeholder="Bank of America"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="bank-account-number">Account Number</Label>
                                        <Input
                                            id="bank-account-number"
                                            value={data['customization_data.bank_account_number']}
                                            onChange={(e) => setData('customization_data.bank_account_number', e.target.value)}
                                            placeholder="1234567890"
                                            className="mt-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Guest List */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 mr-2 text-indigo-500" />
                                            Guest List
                                        </div>
                                        <Button 
                                            type="button"
                                            onClick={handleAddGuest}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Guest
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>
                                        Add your guests for RSVP tracking (optional)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {guests.map((guest, index) => (
                                            <div key={index} className="grid md:grid-cols-4 gap-3 p-4 border rounded-lg">
                                                <div>
                                                    <Label htmlFor={`guest-name-${index}`}>Name</Label>
                                                    <Input
                                                        id={`guest-name-${index}`}
                                                        value={guest.name}
                                                        onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                                                        placeholder="Guest name"
                                                        className="mt-1"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor={`guest-email-${index}`}>Email</Label>
                                                    <Input
                                                        id={`guest-email-${index}`}
                                                        type="email"
                                                        value={guest.email}
                                                        onChange={(e) => handleGuestChange(index, 'email', e.target.value)}
                                                        placeholder="guest@email.com"
                                                        className="mt-1"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor={`guest-phone-${index}`}>Phone</Label>
                                                    <Input
                                                        id={`guest-phone-${index}`}
                                                        value={guest.phone}
                                                        onChange={(e) => handleGuestChange(index, 'phone', e.target.value)}
                                                        placeholder="(555) 123-4567"
                                                        className="mt-1"
                                                    />
                                                </div>

                                                <div className="flex items-end">
                                                    {guests.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            onClick={() => handleRemoveGuest(index)}
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Summary & Submit */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Template: {selectedTemplate?.name || 'Not selected'}</span>
                                            <span>${selectedTemplate?.price || '0.00'}</span>
                                        </div>
                                        <div className="border-t pt-2">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span>${selectedTemplate?.price || '0.00'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        type="submit"
                                        disabled={processing || !selectedTemplate}
                                        className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                        size="lg"
                                    >
                                        {processing ? 'Creating Order...' : `Create Order - $${selectedTemplate?.price || '0.00'}`}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}