<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\InvitationTemplate
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $price
 * @property string $category
 * @property string $preview_image
 * @property array $template_data
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate wherePreviewImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereTemplateData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate active()
 * @method static \Database\Factories\InvitationTemplateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class InvitationTemplate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'preview_image',
        'template_data',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'template_data' => 'array',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the orders for this template.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Scope a query to only include active templates.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}