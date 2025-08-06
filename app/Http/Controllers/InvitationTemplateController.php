<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InvitationTemplate;
use Inertia\Inertia;

class InvitationTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = InvitationTemplate::active()
            ->orderBy('created_at', 'desc')
            ->paginate(12);
        
        return Inertia::render('templates/index', [
            'templates' => $templates
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(InvitationTemplate $invitationTemplate)
    {
        return Inertia::render('templates/show', [
            'template' => $invitationTemplate
        ]);
    }
}