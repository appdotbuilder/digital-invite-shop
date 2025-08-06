<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Order
 *
 * @property int $id
 * @property int $user_id
 * @property int $invitation_template_id
 * @property string $order_number
 * @property string $total_amount
 * @property string $status
 * @property array $customization_data
 * @property string|null $payment_proof
 * @property \Illuminate\Support\Carbon|null $payment_confirmed_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\InvitationTemplate $invitationTemplate
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\GuestList[] $guestList
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCustomizationData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereInvitationTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereOrderNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePaymentConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePaymentProof($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUserId($value)
 * @method static \Database\Factories\OrderFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'invitation_template_id',
        'order_number',
        'total_amount',
        'status',
        'customization_data',
        'payment_proof',
        'payment_confirmed_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'customization_data' => 'array',
        'total_amount' => 'decimal:2',
        'payment_confirmed_at' => 'datetime',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the order.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the invitation template for this order.
     */
    public function invitationTemplate(): BelongsTo
    {
        return $this->belongsTo(InvitationTemplate::class);
    }

    /**
     * Get the guest list for this order.
     */
    public function guestList(): HasMany
    {
        return $this->hasMany(GuestList::class);
    }

    /**
     * Generate a unique order number.
     */
    public static function generateOrderNumber(): string
    {
        do {
            $orderNumber = 'INV-' . date('Y') . '-' . strtoupper(substr(hash('sha256', uniqid((string)mt_rand(), true)), 0, 8));
        } while (static::where('order_number', $orderNumber)->exists());

        return $orderNumber;
    }
}