<?php

namespace App\Http\Controllers;
use App\Category;
use Auth;
use \Validator;
use Illuminate\Http\Request;
use \DB;
class CategoryController extends Controller
{
    public function get(Request $request){
        $categories =  Category::select('category','id')->where('user_id', Auth::id())->get();
        return response()->json($categories);
        
    }

    public function getExpensesGroupedByCategory(Request $request){
        $categories = DB::table('expenses')
            ->where('expenses.user_id', Auth::id())
            ->leftJoin('categories', 'expenses.category_id', '=', 'categories.id')
            ->select('category',DB::raw('count(*) as NumberOfExpensesPerCategory') )
            ->groupBy('category')
            ->get();
        return response()->json($categories);
         
    }

    public function getExpensesGroupedByCategoryOnSpecificDate(Request $request){
        // $from = date('2018-01-01');
        // $to = date('2018-05-02');
        // dd($request->input('dateFrom'));
        // $from = 
        // expenses::whereBetween('reservation_from', [$from, $to])->get();
        $categories = DB::table('expenses')
            ->whereBetween('Buying Date', [$request->input('dateFrom'), $request->input('dateTo')])
            ->where('expenses.user_id', Auth::id())
            ->leftJoin('categories', 'expenses.category_id', '=', 'categories.id')
            ->select('category',DB::raw('count(*) as NumberOfExpensesPerCategory'))
            ->groupBy('category')
            ->get();
        return response()->json($categories);
         
    }
    public function create(Request $request){
        $data = $request->json()->all();
        
        $validator = Validator::make($data, [
            'categoryInput'=>['string','required'],
        ]);
            
        if ($validator->fails()) {
            
            return response()->json($validator->messages(),419);
        }
            $category = Category::create([
                'user_id' => Auth::id(),
                'category' => $data['categoryInput'],
            ]);
            
            if($category){
                return response()->json(['success'=>'success']);
            }
            else{
                return response()->json(['Something went wrong']);
            }
    }
    public function delete(Request $request){
        $data = $request->json()->all();
        
        $validator = Validator::make($data, [
            'category_id'=>['required','integer'],
            'category'=>['string','required'],
        ]);
            
        if ($validator->fails()) {
            
            return response()->json($validator->messages(),419);
            
        }

        $category = Category::where('id',$data['category_id'])->where('user_id', Auth::id())
        ->delete();
        if($category){
            return response()->json(['success'=>'success']);
        }
        else{
            return response()->json(['Something went wrong']);
        }
    }
    public function edit(Request $request){
        $data = $request->json()->all();
        
        $validator = Validator::make($data, [
            'category_id'=>['required','integer'],
            'category'=>['string','required'],
            'categoryInput' => ['required','string'],
        ]);
            
        if ($validator->fails()) {
            
            return response()->json($validator->messages(),419);
            
        }
        
            $category = Category::where('id',$data['category_id'])->where('user_id', Auth::id())
            ->update(['category'=> $data['categoryInput']]);
            
            if($category){
                return response()->json(['success'=>'success']);
            }
             else{
                return response()->json('Something Went Wrong');
             }
        }
    
}
