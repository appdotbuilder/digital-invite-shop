<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $order = $this->route('order');
        return auth()->check() && auth()->id() === $order->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customization_data' => 'sometimes|array',
            'customization_data.bride_name' => 'sometimes|string|max:255',
            'customization_data.groom_name' => 'sometimes|string|max:255',
            'customization_data.event_date' => 'sometimes|date|after:today',
            'customization_data.event_time' => 'sometimes|string',
            'customization_data.venue_name' => 'sometimes|string|max:255',
            'customization_data.venue_address' => 'sometimes|string',
            'customization_data.google_maps_link' => 'nullable|url',
            'customization_data.bride_parents' => 'nullable|string|max:500',
            'customization_data.groom_parents' => 'nullable|string|max:500',
            'customization_data.background_music' => 'nullable|string|max:255',
            'customization_data.bank_account_name' => 'nullable|string|max:255',
            'customization_data.bank_account_number' => 'nullable|string|max:50',
            'customization_data.bank_name' => 'nullable|string|max:255',
            'payment_proof' => 'sometimes|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'guest_list' => 'sometimes|array',
            'guest_list.*.name' => 'required_with:guest_list|string|max:255',
            'guest_list.*.email' => 'nullable|email',
            'guest_list.*.phone' => 'nullable|string|max:20',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'payment_proof.file' => 'Payment proof must be a file.',
            'payment_proof.mimes' => 'Payment proof must be a JPG, JPEG, PNG, or PDF file.',
            'payment_proof.max' => 'Payment proof file size must not exceed 2MB.',
        ];
    }
}