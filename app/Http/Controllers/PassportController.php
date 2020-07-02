<?php

 
namespace App\Http\Controllers;
 
use App\User;
use Illuminate\Http\Request;
 
class PassportController extends Controller
{
    /**
     * Handles Registration Request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|min:3',
            'last_name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
 
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
 
        $token = $user->createToken('TutsForWeb')->accessToken;
 
        return response()->json(['token' => $token], 200);
    }
 
    /**
     * Handles Login Request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required|min:6',
        ]);
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];
        
        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('TutsForWeb')->accessToken;
            return response()->json(['token' => $token, 'url'=>'api/home'], 200);
        } else {
            return response()->json(['error' => 'UnAuthorised'], 401);
        }
    }
 
    /**
     * Returns Authenticated User Details
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function details()
    {
        return response()->json(['user' => auth()->user()], 200);
    }
}






















// namespace App\Http\Controllers\API;
// use Illuminate\Http\Request; 
// use App\Http\Controllers\Controller; 
// use App\User; 
// use Illuminate\Support\Facades\Auth; 
// use Validator;

// class UserController extends Controller 
// {
//     public $successStatus = 200;/** 
//      * login api 
//      * 
//      * @return \Illuminate\Http\Response 
//      */ 
//     public function login(){  
//         if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
//             $user = Auth::user(); 
//             $success['token'] =  $user->createToken('MyApp')-> accessToken; 
//             return response()->json(['success' => $success], $this-> successStatus); 
//         } 
//         else{ 
//             return response()->json(['error'=>'Unauthorised'], 401); 
//         } 
// }
// /** 
//      * Register api 
//      * 
//      * @return \Illuminate\Http\Response 
//      */ 
//     public function register(Request $request) 
//     { 
//         $validator = Validator::make($request->all(), [ 
//             'name' => 'required', 
//             'email' => 'required|email', 
//             'password' => 'required', 
//             'c_password' => 'required|same:password', 
//         ]);
// if ($validator->fails()) { 
//             return response()->json(['error'=>$validator->errors()], 401);            
//         }
// $input = $request->all(); 
//         $input['password'] = bcrypt($input['password']); 
//         $user = User::create($input); 
//         $success['token'] =  $user->createToken('MyApp')-> accessToken; 
//         $success['name'] =  $user->name;
// return response()->json(['success'=>$success], $this-> successStatus); 
//     }
// /** 
//      * details api 
//      * 
//      * @return \Illuminate\Http\Response 
//      */ 
//     public function details() 
//     { 
//         $user = Auth::user(); 
//         return response()->json(['success' => $user], $this-> successStatus); 
//     } 
//     public function logout() 
//     { 
//         $user = Auth::logout(); 
//         return response()->json(['success' => $user], $this-> successStatus); 
//     } 
// }