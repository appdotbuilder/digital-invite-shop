<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GuestList
 *
 * @property int $id
 * @property int $order_id
 * @property string $name
 * @property string|null $email
 * @property string|null $phone
 * @property bool|null $rsvp_status
 * @property \Illuminate\Support\Carbon|null $rsvp_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order $order
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList query()
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereRsvpAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereRsvpStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestList whereUpdatedAt($value)
 * @method static \Database\Factories\GuestListFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GuestList extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'name',
        'email',
        'phone',
        'rsvp_status',
        'rsvp_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rsvp_status' => 'boolean',
        'rsvp_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the order that owns this guest.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}