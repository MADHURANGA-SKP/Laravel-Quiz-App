<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function register(Request $request){

        $data = $request->validate([
            "name"=>"required|string",
            "email"=>"required|email|string|unique:users,email",
            "password"=>[
                "required",
                "confirmed",
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
            ]);

        $user = User::create([
            "name"=>$data["name"],
            "email"=>$data["email"],
            "password"=> bcrypt($data["password"])
        ]);

        $token = $user->createToken("main")->plainTextToken;

        return response([
            "user"=>$user,
            "token"=>$token,
        ]);

    }

    public function login(Request $request){
        $credentials = $request->validate([
            "email" => "required|email|string|exists:users,email",
            "password" =>[
                "required",
            ],
            "remember" => "boolean"
            ]);
        $remember = $credentials["remember"]?? false;
        unset($credentials["remember"]);

        if(!Auth::attempt($credentials,$remember)){
            return response([
                "error" => "The Provided credentials are not correct"
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken("main")->plainTextToken;;

        return response([
            "user" => $user,
            "token" => $token,
        ]);
    }
}
