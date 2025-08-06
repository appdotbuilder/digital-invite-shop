<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\InvitationTemplate;
use App\Models\Order;
use App\Models\GuestList;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = auth()->user()->orders()
            ->with(['invitationTemplate'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $templateId = request('template');
        $template = null;
        
        if ($templateId) {
            $template = InvitationTemplate::active()->findOrFail($templateId);
        }
        
        return Inertia::render('orders/create', [
            'template' => $template,
            'templates' => InvitationTemplate::active()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $template = InvitationTemplate::findOrFail($request->invitation_template_id);
        
        // Decode JSON data if it comes as strings
        $customizationData = is_string($request->customization_data) 
            ? json_decode($request->customization_data, true)
            : $request->customization_data;
            
        $guestListData = is_string($request->guest_list)
            ? json_decode($request->guest_list, true)
            : $request->guest_list;
        
        $order = Order::create([
            'user_id' => auth()->id(),
            'invitation_template_id' => $template->id,
            'order_number' => Order::generateOrderNumber(),
            'total_amount' => $template->price,
            'status' => 'pending',
            'customization_data' => $customizationData,
        ]);

        // Add guest list if provided
        if ($guestListData && is_array($guestListData)) {
            foreach ($guestListData as $guest) {
                if (!empty($guest['name'])) {
                    GuestList::create([
                        'order_id' => $order->id,
                        'name' => $guest['name'],
                        'email' => $guest['email'] ?? null,
                        'phone' => $guest['phone'] ?? null,
                    ]);
                }
            }
        }

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order created successfully! Please proceed with payment.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        if (auth()->id() !== $order->user_id) {
            abort(403);
        }
        
        $order->load(['invitationTemplate', 'guestList']);
        
        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        if (auth()->id() !== $order->user_id || !in_array($order->status, ['pending', 'payment_pending'])) {
            abort(403);
        }
        
        $order->load(['invitationTemplate', 'guestList']);
        
        return Inertia::render('orders/edit', [
            'order' => $order
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        if (auth()->id() !== $order->user_id || !in_array($order->status, ['pending', 'payment_pending'])) {
            abort(403);
        }
        
        $updateData = [];
        
        if ($request->has('customization_data')) {
            $updateData['customization_data'] = array_merge(
                $order->customization_data,
                $request->customization_data
            );
        }
        
        if ($request->hasFile('payment_proof')) {
            // Delete old payment proof if exists
            if ($order->payment_proof) {
                Storage::disk('public')->delete($order->payment_proof);
            }
            
            $path = $request->file('payment_proof')->store('payment-proofs', 'public');
            $updateData['payment_proof'] = $path;
            $updateData['status'] = 'payment_pending';
        }
        
        $order->update($updateData);
        
        // Update guest list if provided
        if ($request->has('guest_list')) {
            $order->guestList()->delete();
            
            foreach ($request->guest_list as $guest) {
                GuestList::create([
                    'order_id' => $order->id,
                    'name' => $guest['name'],
                    'email' => $guest['email'] ?? null,
                    'phone' => $guest['phone'] ?? null,
                ]);
            }
        }

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        if (auth()->id() !== $order->user_id || !in_array($order->status, ['pending', 'payment_pending'])) {
            abort(403);
        }
        
        if ($order->payment_proof) {
            Storage::disk('public')->delete($order->payment_proof);
        }
        
        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Order cancelled successfully.');
    }
}