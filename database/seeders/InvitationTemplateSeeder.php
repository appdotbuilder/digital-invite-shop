<?php

namespace Database\Seeders;

use App\Models\InvitationTemplate;
use Illuminate\Database\Seeder;

class InvitationTemplateSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Wedding Templates
        InvitationTemplate::create([
            'name' => 'Elegant Gold Wedding',
            'description' => 'A luxurious gold-themed wedding invitation perfect for elegant ceremonies.',
            'price' => 89.99,
            'category' => 'wedding',
            'preview_image' => 'templates/wedding-elegant-gold.jpg',
            'template_data' => [
                'colors' => [
                    'primary' => '#D4AF37',
                    'secondary' => '#FFFFFF',
                    'accent' => '#8B4513',
                ],
                'fonts' => [
                    'heading' => 'Playfair Display',
                    'body' => 'Open Sans',
                ],
                'layout' => 'elegant',
                'elements' => [
                    'floral' => true,
                    'geometric' => false,
                    'vintage' => true,
                ],
            ],
            'is_active' => true,
        ]);

        InvitationTemplate::create([
            'name' => 'Rustic Floral Wedding',
            'description' => 'Beautiful rustic design with floral elements, perfect for outdoor weddings.',
            'price' => 69.99,
            'category' => 'wedding',
            'preview_image' => 'templates/wedding-rustic-floral.jpg',
            'template_data' => [
                'colors' => [
                    'primary' => '#8FBC8F',
                    'secondary' => '#F5F5DC',
                    'accent' => '#CD853F',
                ],
                'fonts' => [
                    'heading' => 'Dancing Script',
                    'body' => 'Lato',
                ],
                'layout' => 'rustic',
                'elements' => [
                    'floral' => true,
                    'geometric' => false,
                    'vintage' => false,
                ],
            ],
            'is_active' => true,
        ]);

        InvitationTemplate::create([
            'name' => 'Modern Minimalist Wedding',
            'description' => 'Clean and modern design for contemporary couples.',
            'price' => 79.99,
            'category' => 'wedding',
            'preview_image' => 'templates/wedding-modern-minimal.jpg',
            'template_data' => [
                'colors' => [
                    'primary' => '#000000',
                    'secondary' => '#FFFFFF',
                    'accent' => '#808080',
                ],
                'fonts' => [
                    'heading' => 'Montserrat',
                    'body' => 'Source Sans Pro',
                ],
                'layout' => 'modern',
                'elements' => [
                    'floral' => false,
                    'geometric' => true,
                    'vintage' => false,
                ],
            ],
            'is_active' => true,
        ]);

        // Birthday Templates
        InvitationTemplate::create([
            'name' => 'Balloon Celebration Birthday',
            'description' => 'Fun and colorful birthday invitation with balloon theme.',
            'price' => 39.99,
            'category' => 'birthday',
            'preview_image' => 'templates/birthday-balloon.jpg',
            'template_data' => [
                'colors' => [
                    'primary' => '#FF6B6B',
                    'secondary' => '#4ECDC4',
                    'accent' => '#FFE66D',
                ],
                'fonts' => [
                    'heading' => 'Great Vibes',
                    'body' => 'Roboto',
                ],
                'layout' => 'fun',
                'elements' => [
                    'floral' => false,
                    'geometric' => true,
                    'vintage' => false,
                ],
            ],
            'is_active' => true,
        ]);

        InvitationTemplate::create([
            'name' => 'Sweet Sixteen Birthday',
            'description' => 'Elegant sweet sixteen birthday invitation in pink and gold.',
            'price' => 49.99,
            'category' => 'birthday',
            'preview_image' => 'templates/birthday-sweet-sixteen.jpg',
            'template_data' => [
                'colors' => [
                    'primary' => '#FFB6C1',
                    'secondary' => '#FFD700',
                    'accent' => '#FFFFFF',
                ],
                'fonts' => [
                    'heading' => 'Dancing Script',
                    'body' => 'Open Sans',
                ],
                'layout' => 'elegant',
                'elements' => [
                    'floral' => true,
                    'geometric' => false,
                    'vintage' => false,
                ],
            ],
            'is_active' => true,
        ]);

        // Anniversary Templates
        InvitationTemplate::create([
            'name' => 'Golden Anniversary',
            'description' => 'Celebrate 50 years of love with this golden anniversary invitation.',
            'price' => 59.99,
            'category' => 'anniversary',
            'preview_image' => 'templates/anniversary-golden.jpg',
            'template_data' => [
                'colors' => [
                    'primary' => '#FFD700',
                    'secondary' => '#FFFFFF',
                    'accent' => '#B8860B',
                ],
                'fonts' => [
                    'heading' => 'Playfair Display',
                    'body' => 'Lato',
                ],
                'layout' => 'classic',
                'elements' => [
                    'floral' => true,
                    'geometric' => false,
                    'vintage' => true,
                ],
            ],
            'is_active' => true,
        ]);

        // Create additional templates using factory
        InvitationTemplate::factory(15)->create();
    }
}