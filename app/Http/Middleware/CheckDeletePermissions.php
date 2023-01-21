<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckDeletePermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth('api')->user();

        if($user && $user->role->allow_delete) return $next($request);

        return response()->json(['error' => 'Unauthorized to delete'], 401);
    }
}
