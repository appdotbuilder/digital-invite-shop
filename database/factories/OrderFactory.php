<?php

namespace Database\Factories;

use App\Models\InvitationTemplate;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $template = InvitationTemplate::inRandomOrder()->first();
        
        return [
            'user_id' => User::factory(),
            'invitation_template_id' => $template->id ?? InvitationTemplate::factory(),
            'order_number' => Order::generateOrderNumber(),
            'total_amount' => $template->price ?? fake()->randomFloat(2, 19.99, 149.99),
            'status' => fake()->randomElement(['pending', 'payment_pending', 'paid', 'completed']),
            'customization_data' => [
                'bride_name' => fake()->firstName('female'),
                'groom_name' => fake()->firstName('male'),
                'event_date' => fake()->dateTimeBetween('+1 month', '+1 year')->format('Y-m-d'),
                'event_time' => fake()->time('H:i'),
                'venue_name' => fake()->company() . ' Hall',
                'venue_address' => fake()->address(),
                'google_maps_link' => 'https://maps.google.com/?q=' . urlencode(fake()->address()),
                'bride_parents' => fake()->name() . ' & ' . fake()->name(),
                'groom_parents' => fake()->name() . ' & ' . fake()->name(),
                'background_music' => fake()->randomElement(['Canon in D', 'Ave Maria', 'Wedding March', 'A Thousand Years']),
                'bank_account_name' => fake()->name(),
                'bank_account_number' => fake()->numerify('##########'),
                'bank_name' => fake()->randomElement(['BCA', 'Mandiri', 'BNI', 'BRI']),
            ],
            'payment_proof' => null,
            'payment_confirmed_at' => null,
            'completed_at' => null,
        ];
    }

    /**
     * Indicate that the order has payment proof.
     */
    public function withPaymentProof(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_proof' => 'payment-proofs/proof-' . fake()->uuid() . '.jpg',
            'status' => 'payment_pending',
        ]);
    }

    /**
     * Indicate that the order is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'payment_confirmed_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'payment_confirmed_at' => fake()->dateTimeBetween('-1 month', '-1 week'),
            'completed_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}