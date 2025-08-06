<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GuestList>
 */
class GuestListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'name' => fake()->name(),
            'email' => fake()->optional()->safeEmail(),
            'phone' => fake()->optional()->phoneNumber(),
            'rsvp_status' => fake()->optional()->boolean(),
            'rsvp_at' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the guest has RSVP'd yes.
     */
    public function rsvpYes(): static
    {
        return $this->state(fn (array $attributes) => [
            'rsvp_status' => true,
            'rsvp_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the guest has RSVP'd no.
     */
    public function rsvpNo(): static
    {
        return $this->state(fn (array $attributes) => [
            'rsvp_status' => false,
            'rsvp_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }
}