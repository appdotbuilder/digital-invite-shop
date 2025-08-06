<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'invitation_template_id' => 'required|exists:invitation_templates,id',
            'customization_data' => 'required|array',
            'customization_data.bride_name' => 'required|string|max:255',
            'customization_data.groom_name' => 'required|string|max:255',
            'customization_data.event_date' => 'required|date|after:today',
            'customization_data.event_time' => 'required|string',
            'customization_data.venue_name' => 'required|string|max:255',
            'customization_data.venue_address' => 'required|string',
            'customization_data.google_maps_link' => 'nullable|url',
            'customization_data.bride_parents' => 'nullable|string|max:500',
            'customization_data.groom_parents' => 'nullable|string|max:500',
            'customization_data.background_music' => 'nullable|string|max:255',
            'customization_data.bank_account_name' => 'nullable|string|max:255',
            'customization_data.bank_account_number' => 'nullable|string|max:50',
            'customization_data.bank_name' => 'nullable|string|max:255',
            'guest_list' => 'nullable|array',
            'guest_list.*.name' => 'required|string|max:255',
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
            'bride_name.required' => 'Bride name is required.',
            'groom_name.required' => 'Groom name is required.',
            'event_date.required' => 'Event date is required.',
            'event_date.after' => 'Event date must be in the future.',
            'venue_name.required' => 'Venue name is required.',
            'venue_address.required' => 'Venue address is required.',
            'google_maps_link.url' => 'Please provide a valid Google Maps URL.',
        ];
    }
}