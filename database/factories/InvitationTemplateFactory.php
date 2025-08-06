<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvitationTemplate>
 */
class InvitationTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['wedding', 'birthday', 'anniversary', 'baby_shower', 'graduation'];
        $templateNames = [
            'wedding' => ['Elegant Gold', 'Royal Blue', 'Rustic Floral', 'Modern Minimalist', 'Classic Romance'],
            'birthday' => ['Balloon Celebration', 'Party Time', 'Sweet Sixteen', 'Golden Years', 'Kids Fun'],
            'anniversary' => ['Golden Years', 'Silver Memories', 'Love Story', 'Together Forever', 'Milestone'],
            'baby_shower' => ['Little Prince', 'Baby Girl', 'Stork Delivery', 'Baby Elephant', 'Sweet Dreams'],
            'graduation' => ['Academic Achievement', 'Class of 2024', 'Success Story', 'Future Bright', 'Diploma Day'],
        ];

        $category = fake()->randomElement($categories);
        $name = fake()->randomElement($templateNames[$category]);

        return [
            'name' => $name,
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 19.99, 149.99),
            'category' => $category,
            'preview_image' => 'templates/preview-' . fake()->numberBetween(1, 10) . '.jpg',
            'template_data' => [
                'colors' => [
                    'primary' => fake()->hexColor(),
                    'secondary' => fake()->hexColor(),
                    'accent' => fake()->hexColor(),
                ],
                'fonts' => [
                    'heading' => fake()->randomElement(['Playfair Display', 'Great Vibes', 'Montserrat', 'Dancing Script']),
                    'body' => fake()->randomElement(['Open Sans', 'Lato', 'Source Sans Pro', 'Roboto']),
                ],
                'layout' => fake()->randomElement(['classic', 'modern', 'elegant', 'rustic']),
                'elements' => [
                    'floral' => fake()->boolean(),
                    'geometric' => fake()->boolean(),
                    'vintage' => fake()->boolean(),
                ],
            ],
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the template is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}