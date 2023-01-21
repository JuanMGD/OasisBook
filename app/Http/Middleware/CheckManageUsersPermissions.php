<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckManageUsersPermissions
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

        if($user && $user->role->allow_manage_users) return $next($request);

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
